export const OP_EVENTS = {
	screenView: "screen_view",
	ctaClick: "cta_click",
	navClick: "nav_click",
	contactFormSubmitted: "contact_form_submitted",
	contactFormError: "contact_form_error",
	aiLeadCaptured: "ai_lead_captured",
	aiChatRequest: "ai_chat_request",
	contactEmailSent: "contact_email_sent",
} as const;

export type OpEventName = (typeof OP_EVENTS)[keyof typeof OP_EVENTS];

export type OpEventPayload = Record<string, string | number | boolean | null>;

export function buildCtaPayload(input: {
	label: string;
	location: string;
	path?: string;
	additional?: OpEventPayload;
}): OpEventPayload {
	const base: OpEventPayload = {
		label: input.label,
		location: input.location,
	};

	if (input.path) {
		base.path = input.path;
	}

	return {
		...base,
		...(input.additional ?? {}),
	};
}

