"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

import { CONTACT } from "@/components/layout/data/constants";

import { siteConfig } from "@/data/site-config";
import { SERVICES } from "@/features/services/constant";
import { op } from "@/lib/op";
import { OP_EVENTS } from "@/lib/op-events";

const google = createGoogleGenerativeAI();

const messageSchema = z.object({
	role: z.enum(["user", "assistant"]),
	content: z.string().min(1).max(2_000),
});

const chatPayloadSchema = z.object({
	messages: z.array(messageSchema).min(1).max(20),
});

const leadSchema = z.object({
	name: z.string().min(2).max(80),
	email: z.email().max(120),
	phone: z.string().min(6).max(30).optional().default(""),
	company: z.string().max(100).optional().default(""),
	message: z.string().max(1_000).optional().default(""),
	source: z.string().max(80).optional().default("ai-chat-widget"),
});

const suggestionSchema = z.object({
	label: z.string().min(2).max(40),
	href: z.string().min(1),
	reason: z.string().max(120).optional().default(""),
});

const responseSchema = z.object({
	reply: z.string().min(1),
	suggestions: z.array(suggestionSchema).max(4).default([]),
});

const SYSTEM_PROMPT = `You are Ziron Pro's sales assistant.
Your goals:
- Help visitors understand services quickly.
- Ask short qualifying questions (budget, timeline, business type, goals).
- Keep answers concise, practical, and conversion-oriented.
- Invite serious leads to share name, email, and phone for follow-up.
Rules:
- Never claim guaranteed rankings or unrealistic outcomes.
- If user asks for exact pricing, explain it depends on scope and suggest a discovery call.
- Keep responses under 120 words unless asked for detail.
- Base answers only on the provided business context.
- If context is missing, say so and ask one clarifying question.
- Prefer recommending 1-2 relevant services and explain why.
- Format replies with short paragraphs or bullet lists for readability.
- Use markdown only when it improves clarity.
- End with one clear next step question or CTA.`;

function getAllowedRoutes() {
	const serviceRoutes = SERVICES.flatMap((service) => [
		`/services/${service.slug}`,
		...service.lists.map((item) => `/services/${service.slug}/${item.slug}`),
	]);

	return ["/", "/services", "/contact", ...serviceRoutes];
}

function buildBusinessContext() {
	const serviceLines = SERVICES.map((service) => {
		const items = service.lists.map(
			(item) => `${item.title} (/services/${service.slug}/${item.slug})`
		);
		return `- ${service.title} (${service.description})\n  Subservices: ${items.join(", ")}`;
	}).join("\n");

	const contactInfo = CONTACT.map(
		(item) => `${item.label}: ${item.value}`
	).join(", ");

	return `
Brand:
- Name: ${siteConfig.shortName}
- Positioning: ${siteConfig.description}
- Website: ${siteConfig.url}

Contact:
- Primary phone: ${siteConfig.contact}
- Contact entries: ${contactInfo}
- Contact page: /contact

Service catalog:
${serviceLines}
`.trim();
}

function normalizeSuggestions(
	suggestions: Array<{ label: string; href: string; reason?: string }>,
	allowedRoutes: string[]
) {
	const allowedSet = new Set(allowedRoutes);
	const filtered = suggestions.filter((suggestion) =>
		allowedSet.has(suggestion.href)
	);
	const deduped = filtered.filter(
		(suggestion, index, array) =>
			array.findIndex((item) => item.href === suggestion.href) === index
	);

	return deduped.slice(0, 4);
}

export async function generateChatReplyAction(input: {
	messages: Array<{ role: "user" | "assistant"; content: string }>;
}): Promise<
	| {
			ok: true;
			reply: string;
			suggestions: Array<{ label: string; href: string; reason?: string }>;
	  }
	| { ok: false; error: string }
> {
	if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
		await op.track(OP_EVENTS.aiChatRequest, {
			ok: false,
			reason: "missing_api_key",
		});
		return { ok: false, error: "GOOGLE_GENERATIVE_AI_API_KEY is not set" };
	}

	const parsed = chatPayloadSchema.safeParse(input);
	if (!parsed.success) {
		return { ok: false, error: "Invalid chat payload." };
	}

	try {
		const businessContext = buildBusinessContext();
		const allowedRoutes = getAllowedRoutes();
		const transcript = parsed.data.messages
			.map(
				(message) =>
					`${message.role === "assistant" ? "Assistant" : "User"}: ${message.content}`
			)
			.join("\n");

		const { object } = await generateObject({
			model: google("gemini-2.5-flash"),
			schema: responseSchema,
			system: `${SYSTEM_PROMPT}
Route rules:
- For suggestions, use only routes from this allowlist.
- Never invent URLs.
- Provide 2-4 suggestions when confident, otherwise provide 1-2 broad links.
- Keep labels short and action-oriented.`,
			prompt: `Business context:
${businessContext}

Conversation so far:
${transcript}

Allowed routes:
${allowedRoutes.join(", ")}

Reply as the assistant to the latest user message and return structured output.`,
		});

		const reply = object.reply.trim();
		if (!reply) {
			return { ok: false, error: "AI returned an empty response." };
		}

		const suggestions = normalizeSuggestions(object.suggestions, allowedRoutes);

		await op.track(OP_EVENTS.aiChatRequest, {
			ok: true,
			messageCount: parsed.data.messages.length,
		});

		return { ok: true, reply, suggestions };
	} catch (error) {
		console.error("AI generateChatReplyAction error:", error);
		const message =
			error instanceof Error ? error.message : "Failed to generate chat reply";
		await op.track(OP_EVENTS.aiChatRequest, {
			ok: false,
			reason: "exception",
		});
		return { ok: false, error: message };
	}
}

export async function captureLeadAction(input: {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	message?: string;
	source?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
	const parsed = leadSchema.safeParse(input);
	if (!parsed.success) {
		await op.track(OP_EVENTS.aiLeadCaptured, {
			ok: false,
			reason: "invalid_payload",
		});
		return { ok: false, error: "Invalid lead payload." };
	}

	try {
		// MVP capture sink: replace with CRM/email integration later.
		await op.track(OP_EVENTS.aiLeadCaptured, {
			ok: true,
		});

		return { ok: true };
	} catch (error) {
		console.error("captureLeadAction error:", error);
		const message =
			error instanceof Error ? error.message : "Failed to capture lead";
		await op.track(OP_EVENTS.aiLeadCaptured, {
			ok: false,
			reason: "exception",
		});
		return { ok: false, error: message };
	}
}
