"use server";

import { z } from "zod";

import {
	createSmtpTransporter,
	getContactEmailConfig,
} from "@/features/email/nodemailer";
import { op } from "@/lib/op";
import { OP_EVENTS } from "@/lib/op-events";

import { type IndustryLeadType, industryLeadSchema } from "./schema";

function buildIndustryLeadText(data: IndustryLeadType): string {
	return [
		`[Industry Lead] ${data.industryTitle} — ${data.placement}`,
		"",
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone || "Not provided"}`,
		`Service: ${data.service || "Not selected"}`,
		`Industry: ${data.industryTitle} (${data.industrySlug})`,
		`Placement: ${data.placement}`,
		"",
		"Message:",
		data.message,
	].join("\n");
}

export async function submitIndustryLeadForm(payload: IndustryLeadType) {
	try {
		const data = industryLeadSchema.parse(payload);

		const contactEmailConfig = getContactEmailConfig();
		const transporter = createSmtpTransporter();

		if (!contactEmailConfig || !transporter) {
			console.error("Missing SMTP configuration for industry lead form.");
			await op.track(OP_EVENTS.contactEmailSent, {
				ok: false,
				reason: "smtp_missing",
				source: `industry_${data.placement}`,
			});
			return {
				error:
					"Contact form is temporarily unavailable. Please try again later.",
			};
		}

		await transporter.sendMail({
			from: contactEmailConfig.from,
			to: contactEmailConfig.to,
			subject: `[Industry Lead] ${data.industryTitle} — ${data.placement === "hero_modal" ? "Hero Modal" : "Page Footer"}`,
			replyTo: data.email,
			text: buildIndustryLeadText(data),
		});

		await op.track(OP_EVENTS.contactEmailSent, {
			ok: true,
			source: `industry_${data.placement}`,
			industry: data.industrySlug,
		});

		return { success: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			await op.track(OP_EVENTS.contactEmailSent, {
				ok: false,
				reason: "validation_error",
			});
			return {
				error: "Please fix the errors below.",
				fieldErrors: z.treeifyError(error),
			};
		}

		await op.track(OP_EVENTS.contactEmailSent, {
			ok: false,
			reason: "unknown_error",
		});
		return { error: "Something went wrong. Please try again later." };
	}
}
