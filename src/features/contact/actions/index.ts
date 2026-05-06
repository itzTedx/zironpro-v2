"use server";

import { z } from "zod";

import { sendContactFormSubmissionEmail } from "@/features/email/nodemailer";
import { op } from "@/lib/op";
import { OP_EVENTS } from "@/lib/op-events";

import { type ContactType, contactFormSchema } from "./schema";

export async function submitContactForm(payload: ContactType) {
	try {
		const validatedData = contactFormSchema.parse(payload);
		const isSent = await sendContactFormSubmissionEmail(validatedData);
		if (!isSent) {
			console.error("Missing SMTP configuration for contact form.");
			await op.track(OP_EVENTS.contactEmailSent, {
				ok: false,
				reason: "smtp_missing",
			});
			return {
				error:
					"Contact form is temporarily unavailable. Please try again later.",
			};
		}

		await op.track(OP_EVENTS.contactEmailSent, {
			ok: true,
		});

		return {
			success: true,
		};
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

		console.error(error);
		return {
			error: "Something went wrong. Please try again later.",
		};
	}
}
