"use server";

import { z } from "zod";

import { sendContactFormSubmissionEmail } from "@/features/email/nodemailer";

import { type ContactType, contactFormSchema } from "./schema";

export async function submitContactForm(payload: ContactType) {
	try {
		const validatedData = contactFormSchema.parse(payload);
		const isSent = await sendContactFormSubmissionEmail(validatedData);
		if (!isSent) {
			console.error("Missing SMTP configuration for contact form.");
			return {
				error:
					"Contact form is temporarily unavailable. Please try again later.",
			};
		}

		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				error: "Please fix the errors below.",
				fieldErrors: z.treeifyError(error),
			};
		}

		return {
			error: "Something went wrong. Please try again later.",
		};
	}
}
