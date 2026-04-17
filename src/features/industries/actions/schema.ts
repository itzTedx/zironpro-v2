import { z } from "zod";

import { SERVICES } from "@/features/services/constant";

const SERVICE_OPTIONS: string[] = [
	...SERVICES.map((service) => service.title),
	"Not sure yet, let's talk",
];

export const industryLeadSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Please enter your full name.")
		.min(2, "Your name should be at least 2 characters.")
		.max(50, "Your name can be up to 50 characters."),
	email: z.email("Please enter a valid email address.").trim(),
	phone: z
		.string()
		.trim()
		.regex(
			/^[\d\s\-\+\(\)]+$/,
			"Please enter a valid phone number using digits and symbols like +, -, (, )."
		)
		.optional()
		.or(z.literal("")),
	service: z
		.string()
		.trim()
		.refine(
			(value) =>
				value === "" ||
				SERVICE_OPTIONS.some((serviceOption) => serviceOption === value),
			"Please select a valid service."
		),
	message: z
		.string()
		.trim()
		.min(1, "Please write a message.")
		.min(10, "Message should be at least 10 characters.")
		.max(1000, "Message can be up to 1000 characters."),
	industrySlug: z.string().trim().min(1),
	industryTitle: z.string().trim().min(1),
	placement: z.enum(["hero_modal", "page_footer"]),
});

export type IndustryLeadType = z.infer<typeof industryLeadSchema>;
