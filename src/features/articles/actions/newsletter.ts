"use server";

import { z } from "zod";

import {
	createSmtpTransporter,
	getContactEmailConfig,
} from "@/features/email/nodemailer";
import { op } from "@/lib/op";
import { OP_EVENTS } from "@/lib/op-events";

import {
	type NewsletterSubscriptionType,
	newsletterSubscriptionSchema,
} from "./newsletter-schema";

export async function subscribeToNewsletter(
	payload: NewsletterSubscriptionType
) {
	try {
		const validatedData = newsletterSubscriptionSchema.parse(payload);
		const contactEmailConfig = getContactEmailConfig();
		const transporter = createSmtpTransporter();

		if (!contactEmailConfig || !transporter) {
			await op.track(OP_EVENTS.contactEmailSent, {
				ok: false,
				reason: "newsletter_smtp_missing",
			});

			return {
				error:
					"Newsletter sign-up is temporarily unavailable. Please try again later.",
			};
		}

		await transporter.sendMail({
			from: contactEmailConfig.from,
			to: contactEmailConfig.to,
			subject: "New newsletter subscription",
			replyTo: validatedData.email,
			text: [
				"New newsletter subscription",
				`Email: ${validatedData.email}`,
				`Date: ${new Date().toISOString()}`,
			].join("\n"),
		});

		await op.track(OP_EVENTS.contactEmailSent, {
			ok: true,
			source: "newsletter",
		});

		return { success: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			await op.track(OP_EVENTS.contactEmailSent, {
				ok: false,
				reason: "newsletter_validation_error",
			});

			return {
				error: "Please enter a valid email address.",
				fieldErrors: z.treeifyError(error),
			};
		}

		await op.track(OP_EVENTS.contactEmailSent, {
			ok: false,
			reason: "newsletter_unknown_error",
		});

		return {
			error: "Something went wrong. Please try again later.",
		};
	}
}
