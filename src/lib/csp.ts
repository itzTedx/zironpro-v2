/**
 * Content-Security-Policy allowlists derived from this codebase:
 * - GTM: `@next/third-parties/google` (layout)
 * - OpenPanel: `open-panel.tsx` (script + API from NEXT_PUBLIC_OPENPANEL_API_URL)
 * - MapLibre + Carto basemaps: `components/ui/map.tsx`
 * - OSRM routing: `features/contact/views/map.tsx`
 * - Microlink + demo CDN images: `preview-link-card.tsx`, `achievement-cards.tsx`
 * - `next/font/google` (Chivo Mono): fonts.googleapis.com / fonts.gstatic.com
 *
 * Toggle report-only: CSP_MODE=report-only
 * @see https://nextjs.org/docs/app/guides/content-security-policy
 */

function trimPolicy(value: string): string {
	return value.replace(/\s{2,}/g, " ").trim();
}

function tryOrigin(url: string | undefined): string | null {
	if (!url) {
		return null;
	}
	try {
		return new URL(url).origin;
	} catch {
		return null;
	}
}

export function cspHeaderName():
	| "Content-Security-Policy"
	| "Content-Security-Policy-Report-Only" {
	return process.env.CSP_MODE === "report-only"
		? "Content-Security-Policy-Report-Only"
		: "Content-Security-Policy";
}

export function buildContentSecurityPolicy(
	nonce: string,
	isDev: boolean
): string {
	const openPanelApiOrigin = tryOrigin(
		process.env.NEXT_PUBLIC_OPENPANEL_API_URL
	);
	const openPanelScriptOrigin = "https://analytics.zironpro.ae";

	const scriptSrc = [
		"'self'",
		`'nonce-${nonce}'`,
		"'strict-dynamic'",
		"https://www.googletagmanager.com",
		"https://www.google-analytics.com",
		"https://ssl.google-analytics.com",
		"https://www.googleadservices.com",
		"https://googleads.g.doubleclick.net",
		openPanelScriptOrigin,
		"https://openpanel.dev",
		...(isDev ? ["'unsafe-eval'"] : []),
	];

	const styleSrc = [
		"'self'",
		`'nonce-${nonce}'`,
		"https://fonts.googleapis.com",
		...(isDev ? ["'unsafe-inline'"] : []),
	];

	const imgSrc = [
		"'self'",
		"data:",
		"blob:",
		"https://cdn.badtz-ui.com",
		"https://api.microlink.io",
		"https://www.googletagmanager.com",
		"https://www.google-analytics.com",
		"https://stats.g.doubleclick.net",
		"https://googleads.g.doubleclick.net",
		"https://www.google.com",
		"https://www.google.ae",
		"https://*.cartocdn.com",
	];

	const fontSrc = ["'self'", "data:", "https://fonts.gstatic.com"];

	const connectSrc = [
		"'self'",
		"blob:",
		"https://*.googletagmanager.com",
		"https://www.googletagmanager.com",
		"https://*.google-analytics.com",
		"https://*.analytics.google.com",
		"https://analytics.google.com",
		"https://stats.g.doubleclick.net",
		"https://www.google.com",
		"https://www.google.ae",
		"https://www.googleadservices.com",
		"https://googleads.g.doubleclick.net",
		"https://api.microlink.io",
		"https://router.project-osrm.org",
		"https://basemaps.cartocdn.com",
		"https://*.basemaps.cartocdn.com",
		"https://*.cartocdn.com",
		openPanelScriptOrigin,
		"https://openpanel.dev",
		...(openPanelApiOrigin ? [openPanelApiOrigin] : []),
		"wss://analytics.zironpro.ae",
		...(isDev
			? [
					"http://localhost:*",
					"http://127.0.0.1:*",
					"ws://localhost:*",
					"ws://127.0.0.1:*",
					"wss://localhost:*",
					"wss://127.0.0.1:*",
				]
			: []),
	];

	const frameSrc = [
		"'self'",
		"https://www.googletagmanager.com",
		"https://www.google.com",
	];

	const workerSrc = ["'self'", "blob:"];

	const mediaSrc = ["'self'", "blob:"];

	const base = [
		`default-src 'self'`,
		`script-src ${scriptSrc.join(" ")}`,
		`style-src ${styleSrc.join(" ")}`,
		`img-src ${imgSrc.join(" ")}`,
		`font-src ${fontSrc.join(" ")}`,
		`connect-src ${connectSrc.join(" ")}`,
		`frame-src ${frameSrc.join(" ")}`,
		`worker-src ${workerSrc.join(" ")}`,
		`media-src ${mediaSrc.join(" ")}`,
		`object-src 'none'`,
		`base-uri 'self'`,
		`form-action 'self'`,
		`frame-ancestors 'none'`,
		...(isDev ? [] : ["upgrade-insecure-requests"]),
	];

	return trimPolicy(base.join("; "));
}
