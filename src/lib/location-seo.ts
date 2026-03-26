import fs from "fs";
import matter from "gray-matter";
import path from "path";

export const LOCATION_SLUGS = ["abu-dhabi", "dubai", "sharjah"] as const;
export const SERVICE_SLUGS = [
	"web-design",
	"seo-services",
	"branding",
] as const;

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
