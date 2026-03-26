import "server-only";

import { render } from "@react-email/render";

import ContactFormSubmissionEmail from "@/features/email/templates/contact-form-submission";

import type { ContactFormEmailData } from "./types";

export function createContactMailText(data: ContactFormEmailData): string {
	return [
		"New contact form submission",
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone || "Not provided"}`,
		`Service: ${data.service || "Not selected"}`,
		"",
		"Message:",
		data.message,
	].join("\n");
}

export async function createContactMailHtml(
	data: ContactFormEmailData
): Promise<string> {
	return render(
		ContactFormSubmissionEmail({
			name: data.name,
			email: data.email,
			phone: data.phone,
			service: data.service,
			message: data.message,
		})
	);
}
