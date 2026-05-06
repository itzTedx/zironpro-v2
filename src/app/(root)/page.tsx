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
			{/* <button className="group inset-shadow-2xs inset-shadow-white/25 inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-zinc-950/35 bg-linear-to-b from-blue-600/85 to-blue-600 px-4 font-medium text-base text-white tracking-tight shadow-sm shadow-zinc-950/20 ring-0 transition-transform duration-150 ease-out will-change-transform hover:brightness-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-[0.97] active:brightness-95 disabled:pointer-events-none disabled:opacity-50 dark:border-0 dark:border-zinc-950/50 dark:bg-linear-to-t dark:from-blue-600/75 [&_svg]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0">
				Test Button
			</button> */}
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
