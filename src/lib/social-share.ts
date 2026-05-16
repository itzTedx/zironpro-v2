export type SocialSharePlatform = "linkedin" | "facebook" | "whatsapp";

export type BuildShareUrlParams = {
	url: string;
	title: string;
	platform: SocialSharePlatform;
};

export function buildShareUrl({
	url,
	title,
	platform,
}: BuildShareUrlParams): string {
	const encodedUrl = encodeURIComponent(url);

	switch (platform) {
		case "linkedin":
			return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
		case "facebook":
			return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
		case "whatsapp": {
			const text = encodeURIComponent(`${title} ${url}`);
			return `https://wa.me/?text=${text}`;
		}
		default:
			return url;
	}
}

export function openShareWindow(shareUrl: string): boolean {
	const popup = window.open(
		shareUrl,
		"_blank",
		"noopener,noreferrer,width=600,height=640"
	);

	return popup !== null;
}

export async function copyShareLink(url: string): Promise<boolean> {
	if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(url);
			return true;
		} catch {
			// Fall through to legacy copy.
		}
	}

	return copyWithLegacyExecCommand(url);
}

function copyWithLegacyExecCommand(url: string): boolean {
	if (typeof document === "undefined") {
		return false;
	}

	const textarea = document.createElement("textarea");
	textarea.value = url;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();

	let didCopy = false;
	try {
		didCopy = document.execCommand("copy");
	} catch {
		didCopy = false;
	} finally {
		document.body.removeChild(textarea);
	}

	return didCopy;
}
