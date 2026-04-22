import { z } from "zod";

export const newsletterSubscriptionSchema = z.object({
	email: z.email("Please enter a valid email address.").trim(),
});

export type NewsletterSubscriptionType = z.infer<
	typeof newsletterSubscriptionSchema
>;
