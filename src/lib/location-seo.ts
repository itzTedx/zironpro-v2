import fs from "fs";
import matter from "gray-matter";
import path from "path";

/**
 * Regional marketing routes (`/[location]`, `/service/[service]/[location]`) and
 * `src/app/sitemap.ts` both derive from these lists. When adding a slug, add the
 * matching MDX under `src/content/marketing/locations/` and/or
 * `src/content/marketing/services/<service>/`.
 */
export const LOCATION_SLUGS = ["abu-dhabi", "dubai", "sharjah"] as const;
export const SERVICE_SLUGS = [
	"web-design",
	"seo-services",
	"branding",
] as const;

/** Sitemap `changeFrequency` / `priority` for regional URLs (tune here only). */
export const REGIONAL_SITEMAP = {
	locationPage: {
		changeFrequency: "weekly" as const,
		priority: 0.85,
	},
	serviceLocationPage: {
		changeFrequency: "weekly" as const,
		priority: 0.72,
	},
} as const;

export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export interface MdxFaqItem {
	question: string;
	answer: string;
}

export interface LocationMdxFrontmatter {
	title: string;
	description: string;
	keywords?: string[];
	faq?: MdxFaqItem[];
	ogImage?: string;
}

export interface ServiceLocationMdxFrontmatter extends LocationMdxFrontmatter {
	serviceType?: string;
}

interface ParsedMdx<TFrontmatter> {
	content: string;
	frontmatter: TFrontmatter;
	isFallback: boolean;
}

const marketingContentRoot = path.join(process.cwd(), "src/content/marketing");

function fileMtime(filePath: string): Date | null {
	try {
		return fs.statSync(filePath).mtime;
	} catch {
		return null;
	}
}

/**
 * Last significant update for `/${location}`, from the location MDX mtime when present.
 */
export function getLocationSitemapLastModified(location: LocationSlug): Date {
	const mdxPath = path.join(
		marketingContentRoot,
		"locations",
		`${location}.mdx`
	);
	return fileMtime(mdxPath) ?? new Date();
}

/**
 * Last significant update for `/service/[service]/[location]`: per-location MDX if it
 * exists, otherwise the service `_default.mdx` mtime (same resolution as page content).
 */
export function getServiceLocationSitemapLastModified(
	service: ServiceSlug,
	location: LocationSlug
): Date {
	const specificPath = path.join(
		marketingContentRoot,
		"services",
		service,
		`${location}.mdx`
	);
	const specificMtime = fileMtime(specificPath);
	if (specificMtime) return specificMtime;

	const fallbackPath = path.join(
		marketingContentRoot,
		"services",
		service,
		"_default.mdx"
	);
	return fileMtime(fallbackPath) ?? new Date();
}

export function isLocationSlug(value: string): value is LocationSlug {
	return LOCATION_SLUGS.includes(value as LocationSlug);
}

export function isServiceSlug(value: string): value is ServiceSlug {
	return SERVICE_SLUGS.includes(value as ServiceSlug);
}

export function formatLocation(slug: string): string {
	return slug
		.split("-")
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}

export function formatService(slug: string): string {
	return slug
		.split("-")
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}

function readMdxFile<TFrontmatter>(
	filePath: string
): ParsedMdx<TFrontmatter> | null {
	if (!fs.existsSync(filePath)) return null;
	const rawFile = fs.readFileSync(filePath, "utf-8");
	const { content, data } = matter(rawFile);

	return {
		content,
		frontmatter: data as TFrontmatter,
		isFallback: false,
	};
}

function ensureBasicFrontmatter(frontmatter: {
	title?: string;
	description?: string;
}) {
	if (!frontmatter.title || !frontmatter.description) {
		throw new Error("MDX frontmatter must include title and description.");
	}
}

export function getLocationContent(
	location: LocationSlug
): ParsedMdx<LocationMdxFrontmatter> | null {
	const mdxPath = path.join(
		marketingContentRoot,
		"locations",
		`${location}.mdx`
	);
	const file = readMdxFile<LocationMdxFrontmatter>(mdxPath);
	if (!file) return null;

	ensureBasicFrontmatter(file.frontmatter);
	return file;
}

export function getServiceLocationContent(
	service: ServiceSlug,
	location: LocationSlug
): ParsedMdx<ServiceLocationMdxFrontmatter> | null {
	const specificPath = path.join(
		marketingContentRoot,
		"services",
		service,
		`${location}.mdx`
	);
	const specificFile = readMdxFile<ServiceLocationMdxFrontmatter>(specificPath);

	if (specificFile) {
		ensureBasicFrontmatter(specificFile.frontmatter);
		return specificFile;
	}

	const fallbackPath = path.join(
		marketingContentRoot,
		"services",
		service,
		"_default.mdx"
	);
	const fallbackFile = readMdxFile<ServiceLocationMdxFrontmatter>(fallbackPath);
	if (!fallbackFile) return null;

	ensureBasicFrontmatter(fallbackFile.frontmatter);
	return {
		...fallbackFile,
		isFallback: true,
	};
}
