import type { MetadataRoute } from "next";

import { SERVICES } from "@/features/services/constant";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = process.env.BASE_URL || "https://zironpro.ae";

	const services = SERVICES;

	const servicesCategoriesEntries: MetadataRoute.Sitemap = services.map(
		({ slug }) => ({
			url: `${baseURL}/services/${slug}`,
			priority: 0.9,
		})
	);

	// const servicesEntries: MetadataRoute.Sitemap = services.map((s) =>
	// 	s.lists.map((service) => ({
	// 		url: `${baseURL}/services/${s.slug}/${service.slug}`,
	// 		priority: 0.9,
	// 	}))
	// );

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
		...servicesCategoriesEntries,
		// ...servicesEntries,
	];
}
