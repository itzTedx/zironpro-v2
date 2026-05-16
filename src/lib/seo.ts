import type { Metadata } from "next";

import { ADDRESS } from "@/data/constant";
import { siteConfig } from "@/data/site-config";

type PageType = "website" | "article";

type CreateMetadataParams = {
	title: string;
	description: string;
	path: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	keywords?: string[];
	type?: PageType;
	/** ISO 8601 — used for Open Graph when `type` is `article`. */
	publishedTime?: string;
	modifiedTime?: string;
	authors?: string[];
	section?: string;
};

const DEFAULT_OG_IMAGE_WIDTH = 1200;
const DEFAULT_OG_IMAGE_HEIGHT = 630;

function resolveAbsoluteImage(image: string): string {
	return image.startsWith("http") ? image : absoluteUrl(image);
}

function getImageMimeType(url: string): string | undefined {
	const path = url.split("?")[0]?.toLowerCase() ?? "";
	if (path.endsWith(".webp")) return "image/webp";
	if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
	if (path.endsWith(".png")) return "image/png";
	if (path.endsWith(".gif")) return "image/gif";
	return undefined;
}

function buildSocialImages({
	image,
	imageAlt,
	imageWidth = DEFAULT_OG_IMAGE_WIDTH,
	imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
	title,
}: {
	image: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	title: string;
}) {
	const url = resolveAbsoluteImage(image);
	const alt = imageAlt ?? title;
	const type = getImageMimeType(url);

	return [
		{
			url,
			width: imageWidth,
			height: imageHeight,
			alt,
			...(type ? { type } : {}),
		},
	];
}

type BreadcrumbItem = {
	name: string;
	path: string;
};

type ArticleSchemaParams = {
	title: string;
	description: string;
	path: string;
	image?: string;
	datePublished: string;
	authorName: string;
};

type ServiceSchemaParams = {
	name: string;
	description: string;
	path: string;
	image?: string;
	serviceType?: string;
	areaServed?: string;
	review?: Record<string, unknown>;
	aggregateRating?: Record<string, unknown>;
};

type ReviewSchemaParams = {
	authorName: string;
	reviewBody: string;
	reviewRatingValue: number;
	itemName: string;
	itemPath: string;
};

const DEFAULT_BASE_URL = "https://zironpro.ae";

function safeTrim(input: string): string {
	return input.replace(/\s+/g, " ").trim();
}

export function getBaseUrl(): string {
	const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.BASE_URL;
	const source = envUrl || siteConfig.url || DEFAULT_BASE_URL;

	try {
		const normalized = new URL(source);
		if (normalized.hostname === "localhost") return DEFAULT_BASE_URL;
		return normalized.origin;
	} catch {
		return DEFAULT_BASE_URL;
	}
}

export function absoluteUrl(path: string): string {
	const baseUrl = getBaseUrl();
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return new URL(normalizedPath, baseUrl).toString();
}

function clampText(input: string, limit: number): string {
	const value = safeTrim(input);
	if (value.length <= limit) return value;
	return `${value.slice(0, Math.max(0, limit - 1)).trimEnd()}...`;
}

export function createPageMetadata({
	title,
	description,
	path,
	image = siteConfig.ogImage,
	imageAlt,
	imageWidth,
	imageHeight,
	keywords = [],
	type = "website",
	publishedTime,
	modifiedTime,
	authors = [],
	section,
}: CreateMetadataParams): Metadata {
	const finalTitle = clampText(title, 90);
	const finalDescription = clampText(description, 200);
	const canonical = path.startsWith("/") ? path : `/${path}`;
	const socialImages = buildSocialImages({
		image,
		imageAlt,
		imageWidth,
		imageHeight,
		title: finalTitle,
	});

	const articleOg =
		type === "article"
			? {
					...(publishedTime
						? {
								publishedTime,
								modifiedTime: modifiedTime ?? publishedTime,
							}
						: {}),
					...(authors.length > 0 ? { authors } : {}),
					...(section ? { section } : {}),
					...(keywords.length > 0 ? { tags: keywords } : {}),
				}
			: {};

	const metadataAuthors =
		authors.length > 0
			? authors.map((name) => ({
					name,
					url: getBaseUrl(),
				}))
			: undefined;

	return {
		title: finalTitle,
		description: finalDescription,
		keywords,
		...(metadataAuthors ? { authors: metadataAuthors } : {}),
		alternates: {
			canonical,
		},
		openGraph: {
			type,
			locale: "en_AE",
			url: absoluteUrl(canonical),
			title: finalTitle,
			description: finalDescription,
			siteName: siteConfig.title,
			images: socialImages,
			...articleOg,
		},
		twitter: {
			card: "summary_large_image",
			title: finalTitle,
			description: finalDescription,
			images: socialImages.map(({ url, alt, type }) => ({
				url,
				alt,
				...(type ? { type } : {}),
			})),
			creator: "@zironpro",
		},
	};
}

export function makeUaeTitle(
	service: string,
	city: "Abu Dhabi" | "Dubai" | "Sharjah"
): string {
	return `${service} in ${city}, UAE | ${siteConfig.shortName}`;
}

/** National service listing title (no single emirate) — use for non-location service URLs. */
export function makeNationalServiceTitle(service: string): string {
	return `${service} in UAE | ${siteConfig.shortName}`;
}

export function buildOrganizationSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteConfig.shortName,
		url: getBaseUrl(),
		logo: absoluteUrl(siteConfig.logo),
		sameAs: [
			siteConfig.links.linkedin,
			siteConfig.links.instagram,
			siteConfig.links.facebook,
		],
		contactPoint: [
			{
				"@type": "ContactPoint",
				telephone: siteConfig.contact,
				contactType: "customer support",
				availableLanguage: ["English", "Arabic"],
				areaServed: "AE",
			},
		],
	};
}

export function buildWebsiteSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.title,
		url: getBaseUrl(),
		inLanguage: "en-AE",
		potentialAction: {
			"@type": "SearchAction",
			target: `${getBaseUrl()}/blogs?query={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};
}

export function buildLocalBusinessSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: siteConfig.shortName,
		url: getBaseUrl(),
		image: absoluteUrl(siteConfig.ogImage),
		telephone: siteConfig.contact,
		address: {
			"@type": "PostalAddress",
			streetAddress: ADDRESS,
			addressLocality: "Dubai",
			addressRegion: "Dubai",
			postalCode: "00000",
			addressCountry: "AE",
		},
		areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "United Arab Emirates"],
		sameAs: [
			siteConfig.links.linkedin,
			siteConfig.links.instagram,
			siteConfig.links.facebook,
		],
	};
}

export function buildWebPageSchema(
	title: string,
	description: string,
	path: string
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: title,
		description: safeTrim(description),
		url: absoluteUrl(path),
		inLanguage: "en-AE",
		isPartOf: {
			"@type": "WebSite",
			name: siteConfig.title,
			url: getBaseUrl(),
		},
	};
}

export function buildBreadcrumbSchema(
	items: BreadcrumbItem[]
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

export function buildServiceSchema({
	name,
	description,
	path,
	image,
	serviceType,
	areaServed = "United Arab Emirates",
	review,
	aggregateRating,
}: ServiceSchemaParams): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name,
		description: safeTrim(description),
		url: absoluteUrl(path),
		image: image
			? image.startsWith("http")
				? image
				: absoluteUrl(image)
			: undefined,
		provider: {
			"@type": "Organization",
			name: siteConfig.shortName,
			url: getBaseUrl(),
		},
		areaServed,
		serviceType,
		review,
		aggregateRating,
	};
}

export function buildArticleSchema({
	title,
	description,
	path,
	image,
	datePublished,
	authorName,
}: ArticleSchemaParams): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description: safeTrim(description),
		image: image
			? image.startsWith("http")
				? image
				: absoluteUrl(image)
			: undefined,
		datePublished,
		dateModified: datePublished,
		author: {
			"@type": "Person",
			name: authorName,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.shortName,
			logo: {
				"@type": "ImageObject",
				url: absoluteUrl(siteConfig.logo),
			},
		},
		mainEntityOfPage: absoluteUrl(path),
	};
}

export function buildFaqSchema(
	items: Array<{ question: string; answer: string }>
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

export function buildReviewSchema({
	authorName,
	reviewBody,
	reviewRatingValue,
	itemName,
	itemPath,
}: ReviewSchemaParams): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Review",
		author: {
			"@type": "Person",
			name: authorName,
		},
		reviewBody,
		reviewRating: {
			"@type": "Rating",
			ratingValue: reviewRatingValue,
			bestRating: 5,
		},
		itemReviewed: {
			"@type": "Thing",
			name: itemName,
			url: absoluteUrl(itemPath),
		},
	};
}

export function buildAggregateRatingSchema(
	itemName: string,
	itemPath: string,
	ratingValue: number,
	ratingCount: number
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "AggregateRating",
		itemReviewed: {
			"@type": "Thing",
			name: itemName,
			url: absoluteUrl(itemPath),
		},
		ratingValue,
		ratingCount,
	};
}
