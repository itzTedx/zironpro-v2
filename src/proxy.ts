import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { buildContentSecurityPolicy, cspHeaderName } from "@/lib/csp";

function generateNonce(): string {
	const bytes = new Uint8Array(16);
	crypto.getRandomValues(bytes);
	let binary = "";
	for (const b of bytes) {
		binary += String.fromCharCode(b);
	}
	return btoa(binary);
}

export function proxy(request: NextRequest) {
	const nonce = generateNonce();
	const isDev = process.env.NODE_ENV === "development";
	const policy = buildContentSecurityPolicy(nonce, isDev);
	const header = cspHeaderName();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
	response.headers.set(header, policy);
	return response;
}

export const config = {
	matcher: [
		{
			source:
				"/((?!api|_next/static|_next/image|favicon.ico|icon0.svg|apple-icon.png|manifest.json|robots.txt|sitemap.xml).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
