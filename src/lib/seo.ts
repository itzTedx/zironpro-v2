import type { Metadata } from "next";

import { ADDRESS } from "@/data/constant";
import { siteConfig } from "@/data/site-config";

type PageType = "website" | "article";

type CreateMetadataParams = {
	title: string;
	description: string;
	path: string;
	image?: string;
	keywords?: string[];
	type?: PageType;
};

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
	keywords = [],
	type = "website",
}: CreateMetadataParams): Metadata {
	const finalTitle = clampText(title, 60);
	const finalDescription = clampText(description, 160);
	const canonical = path.startsWith("/") ? path : `/${path}`;
	const absoluteImage = image.startsWith("http") ? image : absoluteUrl(image);

	return {
		title: finalTitle,
		description: finalDescription,
		keywords,
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
			images: [absoluteImage],
		},
		twitter: {
			card: "summary_large_image",
			title: finalTitle,
			description: finalDescription,
			images: [absoluteImage],
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
