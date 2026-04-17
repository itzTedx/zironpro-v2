import fs from "fs";
import matter from "gray-matter";
import path from "path";

export const INDUSTRY_SLUGS = [
	"real-estate-construction",
	"healthcare-clinics",
	"retail-ecommerce",
	"logistics-transport",
	"finance-accounting",
	"food-restaurants",
	"education-training",
	"startups-saas",
	"beauty-wellness",
	"legal-consulting",
	"manufacturing-industrial",
	"events-entertainment",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

export interface IndustryTailoredService {
	categorySlug: string;
	serviceListSlug?: string;
	whyForIndustry: string;
}

export interface IndustrySocialProof {
	quote?: string;
	clientName?: string;
	stat?: string;
}

export interface IndustryMdxFrontmatter {
	title: string;
	description: string;
	keywords?: string[];
	ogImage?: string;
	heroBadge?: string;
	heroHeading: string;
	heroSubheading: string;
	heroCtaLabel: string;
	heroCtaSecondaryLabel?: string;
	heroCtaSecondaryHref?: string;
	leadModalTitle: string;
	leadModalDescription: string;
	icon: string;
	tailoredServices: IndustryTailoredService[];
	capabilities: Array<{ text: string; icon?: string }>;
	faq: Array<{ question: string; answer: string }>;
	socialProof?: IndustrySocialProof;
	relatedLocations?: string[];
}

export const INDUSTRY_SITEMAP = {
	hubPage: { changeFrequency: "monthly" as const, priority: 0.8 },
	detailPage: { changeFrequency: "monthly" as const, priority: 0.7 },
} as const;

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

export function isIndustrySlug(value: string): value is IndustrySlug {
	return INDUSTRY_SLUGS.includes(value as IndustrySlug);
}

export function formatIndustryTitle(slug: string): string {
	return slug
		.split("-")
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}

export function getIndustryContent(
	slug: IndustrySlug
): ParsedMdx<IndustryMdxFrontmatter> | null {
	const mdxPath = path.join(marketingContentRoot, "industries", `${slug}.mdx`);
	const file = readMdxFile<IndustryMdxFrontmatter>(mdxPath);
	if (!file) return null;

	ensureBasicFrontmatter(file.frontmatter);
	return file;
}

export function getIndustrySitemapLastModified(slug: IndustrySlug): Date {
	const mdxPath = path.join(marketingContentRoot, "industries", `${slug}.mdx`);
	return fileMtime(mdxPath) ?? new Date();
}
