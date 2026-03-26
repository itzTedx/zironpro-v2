import "server-only";

import { getContactEmailConfig } from "./config";
import {
	createContactMailHtml,
	createContactMailText,
} from "./contact-form-submission-content";
import { createSmtpTransporter } from "./transporter";
import type { ContactFormEmailData } from "./types";

export async function sendContactFormSubmissionEmail(
	data: ContactFormEmailData
): Promise<boolean> {
	const contactEmailConfig = getContactEmailConfig();
	const transporter = createSmtpTransporter();
	if (!contactEmailConfig || !transporter) return false;
	const html = await createContactMailHtml(data);

	await transporter.sendMail({
		from: contactEmailConfig.from,
		to: contactEmailConfig.to,
		subject: `New contact request from ${data.name}`,
		replyTo: data.email,
		text: createContactMailText(data),
		html,
	});

	return true;
}
