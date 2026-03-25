import type { MetadataRoute } from "next";

import { getBlogs } from "@/features/articles/actions/query";
import { SERVICES } from "@/features/services/constant";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = process.env.BASE_URL || "https://zironpro.ae";

	const services = SERVICES;
	const blogs = getBlogs();

	const servicesCategoriesEntries: MetadataRoute.Sitemap = services.map(
		({ slug }) => ({
			url: `${baseURL}/services/${slug}`,
			priority: 0.9,
		})
	);

	const servicesEntries: MetadataRoute.Sitemap = services.flatMap((s) =>
		s.lists.map((service) => ({
			url: `${baseURL}/services/${s.slug}/${service.slug}`,
			priority: 0.9,
		}))
	);

	const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
		url: `${baseURL}/blogs/${b.slug}`,
		priority: 0.7,
		changeFrequency: "monthly",
	}));

	return [
		{
			url: baseURL,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseURL}/about`,
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${baseURL}/services`,
			changeFrequency: "weekly",
			priority: 0.8,
		},

		{
			url: `${baseURL}/our-works`,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseURL}/contact`,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseURL}/faqs`,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseURL}/blogs`,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseURL}/terms-of-service`,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseURL}/privacy-policy`,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		...servicesCategoriesEntries,
		...servicesEntries,
		...blogEntries,
	];
}
