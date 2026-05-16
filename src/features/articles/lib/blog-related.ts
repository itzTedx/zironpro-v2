import { getBlogs } from "@/features/articles/actions/query";
import type { RelatedBlog, RelatedService } from "@/features/articles/actions/types";
import { SERVICES } from "@/features/services/constant";

const BLOG_SLUG_PATTERN = /^\/blogs\/([^/]+)$/;
const SERVICE_PATTERN = /^\/services\/([^/]+)\/([^/]+)$/;

export function extractInternalLinks(content: string): string[] {
	const hrefMatches = content.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g);
	const uniqueLinks = new Set<string>();

	for (const match of hrefMatches) {
		const href = match[1]?.trim();

		if (!href || href.startsWith("#")) {
			continue;
		}

		if (
			href.startsWith("http://") ||
			href.startsWith("https://") ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:")
		) {
			continue;
		}

		const cleanHref = href.split("#")[0]?.split("?")[0];
		if (!cleanHref?.startsWith("/")) {
			continue;
		}

		uniqueLinks.add(cleanHref);
	}

	return [...uniqueLinks];
}

export function getRelatedBlogs(
	links: string[],
	currentSlug: string
): RelatedBlog[] {
	const allBlogs = getBlogs();
	const blogMap = new Map(allBlogs.map((entry) => [entry.slug, entry.title]));
	const results: RelatedBlog[] = [];
	const seen = new Set<string>();

	for (const href of links) {
		const match = href.match(BLOG_SLUG_PATTERN);
		const slug = match?.[1];

		if (!slug || slug === currentSlug || seen.has(slug)) {
			continue;
		}

		const title = blogMap.get(slug);
		if (!title) {
			continue;
		}

		seen.add(slug);
		results.push({ slug, title });
	}

	return results;
}

export function getRelatedServices(links: string[]): RelatedService[] {
	const results: RelatedService[] = [];
	const seen = new Set<string>();

	for (const href of links) {
		const match = href.match(SERVICE_PATTERN);
		const category = match?.[1];
		const slug = match?.[2];

		if (!category || !slug || seen.has(href)) {
			continue;
		}

		const categoryData = SERVICES.find((service) => service.slug === category);
		const serviceItem = categoryData?.lists.find((item) => item.slug === slug);

		if (!serviceItem) {
			continue;
		}

		seen.add(href);
		results.push({
			href,
			title: serviceItem.title,
			image: serviceItem.image,
			alt: serviceItem.description,
		});
	}

	return results;
}

export function getFallbackBlogs(currentSlug: string): RelatedBlog[] {
	return getBlogs()
		.filter((entry) => entry.slug !== currentSlug)
		.slice(0, 3)
		.map((entry) => ({
			slug: entry.slug,
			title: entry.title,
		}));
}

export function getFallbackServices(): RelatedService[] {
	const items = SERVICES.flatMap((category) =>
		category.lists.map((service) => ({
			href: `/services/${category.slug}/${service.slug}`,
			title: service.title,
			image: service.image,
			alt: service.description,
		}))
	);

	return items.slice(0, 2);
}

export function blogDateToIso(dateStr: string): string | undefined {
	const t = Date.parse(dateStr);
	if (Number.isNaN(t)) return undefined;
	return new Date(t).toISOString();
}
