"use client";

import { FormEvent, useMemo, useState } from "react";

import type { Route } from "next";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
	captureLeadAction,
	generateChatReplyAction,
} from "@/features/ai/actions";
import { cn } from "@/lib/utils";

type ChatRole = "user" | "assistant";

type ChatMessage = {
	id: string;
	role: ChatRole;
	content: string;
};

const leadFormSchema = z.object({
	name: z.string().min(2, "Please enter your name."),
	email: z.email("Please enter a valid email address."),
	phone: z.string().max(30),
	company: z.string().max(100),
	message: z.string().max(1_000),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

type QuickLink = {
	id: string;
	label: string;
	href: string;
};

const STARTER_MESSAGES: ChatMessage[] = [
	{
		id: "welcome",
		role: "assistant",
		content:
			"Hi! I'm Ziron's AI assistant. Tell me your goal and I can suggest the best service mix for your business.",
	},
];

const LEAD_INTENT_KEYWORDS = [
	"price",
	"pricing",
	"quote",
	"proposal",
	"hire",
	"agency",
	"seo",
	"google ads",
	"meta ads",
	"website",
	"timeline",
	"budget",
];

function hasLeadIntent(text: string) {
	const lowered = text.toLowerCase();
	return LEAD_INTENT_KEYWORDS.some((keyword) => lowered.includes(keyword));
}

const DEFAULT_QUICK_LINKS: QuickLink[] = [
	{ id: "services", label: "Services", href: "/services" },
	// { id: "products", label: "Products", href: "/" },
	{ id: "contact", label: "Book a call", href: "/contact" },
];

const CONTEXT_QUICK_LINKS: Array<QuickLink & { keywords: string[] }> = [
	{
		id: "seo",
		label: "SEO Services",
		href: "/services/websites/seo",
		keywords: ["seo", "ranking", "search", "google"],
	},
	{
		id: "ads",
		label: "Paid Ads",
		href: "/services/marketing/paid-ads",
		keywords: ["ads", "ppc", "meta ads", "google ads", "campaign"],
	},
	{
		id: "web",
		label: "Web Design & Dev",
		href: "/services/websites/design-and-dev",
		keywords: ["website", "web", "landing page", "revamp"],
	},
	{
		id: "social",
		label: "Social Media",
		href: "/services/marketing/social-media",
		keywords: ["social", "instagram", "tiktok", "facebook", "content"],
	},
	{
		id: "branding",
		label: "Brand Strategy",
		href: "/services/branding",
		keywords: ["brand", "logo", "identity", "guidelines"],
	},
	{
		id: "fullstack",
		label: "Full-stack Marketing",
		href: "/services/full-stack",
		keywords: ["strategy", "growth", "funnel", "full-stack"],
	},
];

export function AiChatWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [isThinking, setIsThinking] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>(STARTER_MESSAGES);
	const [showLeadForm, setShowLeadForm] = useState(false);
	const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
	const [leadSubmitted, setLeadSubmitted] = useState(false);
	const [aiSuggestedLinks, setAiSuggestedLinks] = useState<QuickLink[]>([]);
	const leadForm = useForm<LeadFormValues>({
		resolver: zodResolver(leadFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			company: "",
			message: "",
		},
	});

	const canPromptLeadForm = useMemo(() => {
		const userMessages = messages.filter((message) => message.role === "user");
		if (userMessages.length < 2) {
			return false;
		}
		return userMessages.some((message) => hasLeadIntent(message.content));
	}, [messages]);

	const quickLinks = useMemo(() => {
		if (aiSuggestedLinks.length > 0) {
			return [...aiSuggestedLinks, ...DEFAULT_QUICK_LINKS].filter(
				(link, index, array) =>
					array.findIndex((item) => item.id === link.id) === index
			);
		}

		const contextText = messages
			.map((message) => message.content.toLowerCase())
			.join(" ");

		const relevant = CONTEXT_QUICK_LINKS.filter((link) =>
			link.keywords.some((keyword) => contextText.includes(keyword))
		).map(({ id, label, href }) => ({ id, label, href }));

		return [...relevant.slice(0, 3), ...DEFAULT_QUICK_LINKS].filter(
			(link, index, array) =>
				array.findIndex((item) => item.id === link.id) === index
		);
	}, [messages]);

	async function sendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextText = input.trim();
		if (!nextText || isThinking) {
			return;
		}

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: nextText,
		};

		const nextMessages = [...messages, userMessage];
		setMessages(nextMessages);
		setInput("");
		setIsThinking(true);

		try {
			const result = await generateChatReplyAction({
				messages: nextMessages.map((message) => ({
					role: message.role,
					content: message.content,
				})),
			});
			const reply = result.ok
				? result.reply
				: "I can help, but I'm having trouble right now. You can still share your details and our team will contact you shortly.";

			if (result.ok) {
				setAiSuggestedLinks(
					result.suggestions.map((suggestion) => ({
						id: suggestion.href,
						label: suggestion.label,
						href: suggestion.href,
					}))
				);
			}

			setMessages((current) => [
				...current,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: reply,
				},
			]);
		} catch {
			setMessages((current) => [
				...current,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content:
						"Connection issue detected. Please share your details below and our team will get back to you quickly.",
				},
			]);
		} finally {
			setIsThinking(false);
			if (!leadSubmitted && canPromptLeadForm) {
				setShowLeadForm(true);
			}
		}
	}

	async function submitLead(values: LeadFormValues) {
		if (isLeadSubmitting) {
			return;
		}

		setIsLeadSubmitting(true);
		try {
			const result = await captureLeadAction({
				...values,
				source: "ai-chat-widget",
			});
			if (!result.ok) throw new Error(result.error);

			setLeadSubmitted(true);
			setShowLeadForm(false);
			leadForm.reset();
			setMessages((current) => [
				...current,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content:
						"Thanks! Your request is captured. Our team will contact you soon with next steps.",
				},
			]);
		} catch {
			setMessages((current) => [
				...current,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content:
						"I couldn't save your details right now. Please try again or use the Contact page.",
				},
			]);
		} finally {
			setIsLeadSubmitting(false);
		}
	}

	return (
		<div className="fixed right-4 bottom-4 z-1000 hidden sm:right-6 sm:bottom-6 md:block">
			{isOpen ? (
				<div
					className="flex h-[520px] w-[min(92vw,380px)] flex-col rounded-2xl border border-border/70 bg-card shadow-2xl"
					data-scroll-locked
				>
					<div className="flex items-center justify-between border-border/70 border-b px-4 py-3">
						<div className="flex items-center gap-2">
							<div className="rounded-full bg-primary/20 p-1.5">
								<Bot className="size-4 text-primary" />
							</div>
							<div>
								<p className="font-medium text-sm">AI Marketing Assistant</p>
								<p className="text-muted-foreground text-xs">
									Usually replies instantly
								</p>
							</div>
						</div>
						<Button
							aria-label="Close chat"
							onClick={() => setIsOpen(false)}
							size="icon-sm"
							variant="ghost"
						>
							<X className="size-4" />
						</Button>
					</div>

					<div className="flex-1 space-y-3 overflow-y-auto p-4">
						{messages.map((message) => (
							<div
								className={cn(
									"max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
									message.role === "assistant"
										? "bg-secondary text-secondary-foreground"
										: "ml-auto bg-primary text-primary-foreground"
								)}
								key={message.id}
							>
								{message.role === "assistant" ? (
									<div className="prose prose-sm prose-headings:my-2 prose-li:my-0 prose-ol:my-2 prose-p:my-2 prose-ul:my-2 max-w-none prose-pre:bg-black/20 prose-a:text-inherit prose-code:text-inherit prose-headings:text-inherit prose-pre:text-inherit prose-strong:text-inherit text-inherit">
										<ReactMarkdown remarkPlugins={[remarkGfm]}>
											{message.content}
										</ReactMarkdown>
									</div>
								) : (
									<p className="whitespace-pre-wrap">{message.content}</p>
								)}
							</div>
						))}
						{isThinking && (
							<div className="max-w-[70%] rounded-2xl bg-secondary px-3 py-2 text-muted-foreground text-sm">
								Thinking...
							</div>
						)}
					</div>

					{showLeadForm && !leadSubmitted && (
						<form
							className="space-y-2 border-border/70 border-t p-3"
							onSubmit={leadForm.handleSubmit(submitLead)}
						>
							<p className="font-medium text-sm">Get a tailored proposal</p>
							<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
								<Controller
									control={leadForm.control}
									name="name"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel>Name *</FieldLabel>
											<Input
												{...field}
												aria-invalid={fieldState.invalid}
												disabled={isLeadSubmitting}
												placeholder="Your full name"
												required
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									control={leadForm.control}
									name="email"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel>Email *</FieldLabel>
											<Input
												{...field}
												aria-invalid={fieldState.invalid}
												disabled={isLeadSubmitting}
												placeholder="john@company.com"
												required
												type="email"
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									control={leadForm.control}
									name="phone"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel>Phone</FieldLabel>
											<Input
												{...field}
												aria-invalid={fieldState.invalid}
												disabled={isLeadSubmitting}
												placeholder="+971..."
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									control={leadForm.control}
									name="company"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel>Company</FieldLabel>
											<Input
												{...field}
												aria-invalid={fieldState.invalid}
												disabled={isLeadSubmitting}
												placeholder="Company name"
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>
							<Controller
								control={leadForm.control}
								name="message"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Message</FieldLabel>
										<Textarea
											{...field}
											aria-invalid={fieldState.invalid}
											className="min-h-[72px]"
											disabled={isLeadSubmitting}
											placeholder="What service are you interested in?"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Button
								className="w-full"
								loading={isLeadSubmitting}
								type="submit"
							>
								Submit lead
							</Button>
						</form>
					)}

					<form
						className="border-border/70 border-t p-3"
						onSubmit={sendMessage}
					>
						<div className="-mx-1 mb-2 flex gap-2 overflow-x-auto px-1 pb-1">
							{quickLinks.map((link) => (
								<Button
									className="h-7 shrink-0 rounded-full px-3 text-xs"
									key={link.id}
									render={<Link href={link.href as Route} />}
									size="xs"
									variant="outline"
								>
									{link.label}
								</Button>
							))}
						</div>
						<div className="flex items-center gap-2">
							<Input
								onChange={(event) => setInput(event.target.value)}
								placeholder="Ask about SEO, ads, websites..."
								value={input}
							/>
							<Button aria-label="Send message" size="icon" type="submit">
								<Send className="size-4" />
							</Button>
						</div>
					</form>
				</div>
			) : (
				<Button
					aria-label="Open AI chat"
					className="shadow-xl"
					onClick={() => setIsOpen(true)}
					size="lg"
				>
					<MessageCircle className="size-4" />
					AI Chat
				</Button>
			)}
		</div>
	);
}
