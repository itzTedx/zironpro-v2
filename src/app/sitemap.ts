import type { MetadataRoute } from "next";

import { getBlogs } from "@/features/articles/actions/query";
import { SERVICES } from "@/features/services/constant";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = getBaseUrl();
	const now = new Date();

	const services = SERVICES;
	const blogs = getBlogs();

	const servicesCategoriesEntries: MetadataRoute.Sitemap = services.map(
		({ slug }) => ({
			url: `${baseURL}/services/${slug}`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		})
	);

	const servicesEntries: MetadataRoute.Sitemap = services.flatMap((s) =>
		s.lists.map((service) => ({
			url: `${baseURL}/services/${s.slug}/${service.slug}`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		}))
	);

	const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
		url: `${baseURL}/blogs/${b.slug}`,
		lastModified: now,
		priority: 0.7,
		changeFrequency: "monthly",
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
		...servicesCategoriesEntries,
		...servicesEntries,
		...blogEntries,
	];
}
