import type { Metadata } from "next";

import { siteConfig } from "@/data/site-config";
import { Blogs } from "@/features/articles/views/blogs";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import { Achievements } from "@/features/views/home/achievements";
import { Hero } from "@/features/views/home/hero";
import { Services } from "@/features/views/home/services";
import { Video } from "@/features/views/home/video";
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
			<JsonLdScript data={webPageSchema} id="schema-home-webpage" />
			<Hero />
			{/* <Feedback /> */}

			<Achievements />

			<Services />

			<VideoReel />
			<WhyUs />
			{/* <Products /> */}
			<Blogs />

			{/* TODO: Add CTA section */}
			{/* <section className="relative bg-linear-to-b from-50% to-card">
				<div className="mx-auto max-w-7xl">
					<div className="rounded-2xl bg-primary p-12">
						<Badge>Get Started</Badge>
						<h5>Everything You Need to Grow - In One Place</h5>
						<p>
							Build, launch, and scale with tools designed to make things simple
							- not complicated.
						</p>
					</div>
				</div>
			</section> */}
			<Video />
		</main>
	);
}
