"use server";

import { z } from "zod";

import { type ContactType, contactFormSchema } from "./schema";

export async function submitContactForm(payload: ContactType) {
	try {
		const validatedData = contactFormSchema.parse(payload);

		// TODO: Implement actual email sending logic here
		// For now, we'll just simulate success
		console.log("Contact form submission:", validatedData);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 500));

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
