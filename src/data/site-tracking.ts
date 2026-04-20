/**
 * Public tracking endpoints and container IDs. Keep in sync with CSP (`lib/csp.ts`),
 * `OpenPanelProvider`, and root layout GTM. When you change these, update the privacy
 * policy (`app/(root)/(legal)/privacy-policy/page.tsx`) and confirm deploy env vars.
 */
export const GOOGLE_TAG_MANAGER_CONTAINER_ID = "GTM-KQZM3Z58" as const;

/** Hostname of the OpenPanel script / collector (HTTPS and WSS). */
export const OPENPANEL_COLLECTOR_HOST = "analytics.zironpro.ae" as const;

export const OPENPANEL_SCRIPT_ORIGIN =
	`https://${OPENPANEL_COLLECTOR_HOST}` as const;

export const OPENPANEL_WEBSOCKET_ORIGIN =
	`wss://${OPENPANEL_COLLECTOR_HOST}` as const;

export const OPENPANEL_SCRIPT_PATH = "/op1.js" as const;

export function getOpenPanelScriptSrc(): string {
	return `${OPENPANEL_SCRIPT_ORIGIN}${OPENPANEL_SCRIPT_PATH}`;
}

/** WhatsApp deep link shown in the site widget (Meta processes activity on their side). */
export const WHATSAPP_CHAT_MESSAGE =
	"Hi Ziron Pro, I would like to discuss my project." as const;
export const WHATSAPP_CHAT_URL =
	`https://wa.me/971542588446?text=${encodeURIComponent(
		WHATSAPP_CHAT_MESSAGE
	)}` as const;
