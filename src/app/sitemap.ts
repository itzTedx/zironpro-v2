import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

import { getBlogs } from "@/features/articles/actions/query";
import { SERVICES } from "@/features/services/constant";
import { root } from "@/lib/root-mdx";
import {
	INDUSTRY_SITEMAP,
	INDUSTRY_SLUGS,
	getIndustrySitemapLastModified,
} from "@/lib/industry-seo";
import {
	getLocationSitemapLastModified,
	getServiceLocationSitemapLastModified,
	LOCATION_SLUGS,
	REGIONAL_SITEMAP,
	SERVICE_SLUGS,
	serviceLocationPath,
} from "@/lib/location-seo";
import { getBaseUrl } from "@/lib/seo";

function fileMtime(filePath: string): Date | null {
	try {
		return fs.statSync(filePath).mtime;
	} catch {
		return null;
	}
}

function blogLastModified(slug: string): Date {
	const filePath = path.join(root("blogs"), `${slug}.mdx`);
	return fileMtime(filePath) ?? new Date();
}

function serviceDetailLastModified(category: string, slug: string): Date {
	const filePath = path.join(
		process.cwd(),
		"src/content/services",
		category,
		`${slug}.mdx`
	);
	return fileMtime(filePath) ?? new Date();
}

function serviceCategoryDirMaxMtime(categorySlug: string): Date {
	const dir = path.join(process.cwd(), "src/content/services", categorySlug);
	try {
		const files = fs.readdirSync(dir);
		let latest: Date | null = null;
		for (const file of files) {
			if (!file.endsWith(".mdx")) continue;
			const m = fileMtime(path.join(dir, file));
			if (m && (!latest || m > latest)) latest = m;
		}
		return latest ?? new Date();
	} catch {
		return new Date();
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = getBaseUrl();
	const now = new Date();

	const services = SERVICES;
	const blogs = getBlogs();

	const locationEntries: MetadataRoute.Sitemap = LOCATION_SLUGS.map(
		(location) => ({
			url: `${baseURL}/${location}`,
			lastModified: getLocationSitemapLastModified(location),
			changeFrequency: REGIONAL_SITEMAP.locationPage.changeFrequency,
			priority: REGIONAL_SITEMAP.locationPage.priority,
		})
	);

	const serviceLocationEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.flatMap(
		(service) =>
			LOCATION_SLUGS.map((location) => ({
				url: `${baseURL}${serviceLocationPath(service, location)}`,
				lastModified: getServiceLocationSitemapLastModified(service, location),
				changeFrequency: REGIONAL_SITEMAP.serviceLocationPage.changeFrequency,
				priority: REGIONAL_SITEMAP.serviceLocationPage.priority,
			}))
	);

	const servicesCategoriesEntries: MetadataRoute.Sitemap = services.map(
		({ slug }) => ({
			url: `${baseURL}/services/${slug}`,
			lastModified: serviceCategoryDirMaxMtime(slug),
			changeFrequency: "weekly",
			priority: 0.9,
		})
	);

	const servicesEntries: MetadataRoute.Sitemap = services.flatMap((s) =>
		s.lists.map((service) => ({
			url: `${baseURL}/services/${s.slug}/${service.slug}`,
			lastModified: serviceDetailLastModified(s.slug, service.slug),
			changeFrequency: "weekly",
			priority: 0.9,
		}))
	);

	const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
		url: `${baseURL}/blogs/${b.slug}`,
		lastModified: blogLastModified(b.slug),
		priority: 0.7,
		changeFrequency: "monthly",
	}));

	const industryEntries: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
		url: `${baseURL}/industry/${slug}`,
		lastModified: getIndustrySitemapLastModified(slug),
		changeFrequency: INDUSTRY_SITEMAP.detailPage.changeFrequency,
		priority: INDUSTRY_SITEMAP.detailPage.priority,
	}));

	return [
		{
			url: baseURL,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseURL}/about`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseURL}/services`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},

		{
			url: `${baseURL}/our-works`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseURL}/contact`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.7,
		},
		{
			url: `${baseURL}/faqs`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseURL}/blogs`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseURL}/terms-of-service`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseURL}/privacy-policy`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseURL}/industry`,
			lastModified: now,
			changeFrequency: INDUSTRY_SITEMAP.hubPage.changeFrequency,
			priority: INDUSTRY_SITEMAP.hubPage.priority,
		},
		...industryEntries,
		...locationEntries,
		...serviceLocationEntries,
		...servicesCategoriesEntries,
		...servicesEntries,
		...blogEntries,
	];
}
