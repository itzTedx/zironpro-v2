import type { Metadata } from "next";
import Script from "next/script";

import { Blogs } from "@/features/articles/views/blogs";
import { Achievements } from "@/features/views/home/achievements";
import { Hero } from "@/features/views/home/hero";
import { Products } from "@/features/views/home/products";
import { Services } from "@/features/views/home/services";
import { VideoReel } from "@/features/views/home/video-reel";
import { WhyUs } from "@/features/views/home/why-us";
import { buildWebPageSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "UAE's Digital Marketing Agency | ZironPro",
	description:
		"Scale faster with a UAE's best digital marketing agency delivering SEO, web design, branding, and performance growth across Abu Dhabi, Sharjah, and the UAE.",
	path: "/",
	keywords: [
		"digital marketing agency UAE",
		"SEO in Dubai",
		"web design Abu Dhabi",
	],
});

export default function Home() {
	const webPageSchema = buildWebPageSchema(
		"UAE's Digital Marketing Agency | ZironPro",
		"Scale faster with a UAE's best digital marketing agency delivering SEO, web design, branding, and performance growth across Abu Dhabi, Sharjah, and the UAE.",
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
