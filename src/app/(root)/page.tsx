import type { Metadata } from "next";
import Script from "next/script";

import { siteConfig } from "@/data/site-config";
import { Blogs } from "@/features/articles/views/blogs";
import { Achievements } from "@/features/views/home/achievements";
import { Hero } from "@/features/views/home/hero";
import { Products } from "@/features/views/home/products";
import { Services } from "@/features/views/home/services";
import { VideoReel } from "@/features/views/home/video-reel";
import { WhyUs } from "@/features/views/home/why-us";
import { buildWebPageSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: siteConfig.title,
	description: siteConfig.description,
	path: "/",
	keywords: [...siteConfig.keywords],
});

export default function Home() {
	const webPageSchema = buildWebPageSchema(
		siteConfig.title,
		siteConfig.description,
		"/"
	);

	return (
		<main>
			<Script id="schema-home-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Hero />
			{/* <Feedback /> */}

			<Achievements />

			<Services />

			<VideoReel />
			<WhyUs />
			<Products />
			<Blogs />
		</main>
	);
}
