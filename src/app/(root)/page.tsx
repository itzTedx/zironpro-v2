import type { Metadata } from "next";
import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";

import { siteConfig } from "@/data/site-config";
import { Blogs } from "@/features/articles/views/blogs";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import { Achievements } from "@/features/views/home/achievements";
import { CLIENTS } from "@/features/views/home/data/constants";
import { Hero } from "@/features/views/home/hero";
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
			<JsonLdScript data={webPageSchema} id="schema-home-webpage" />
			<Hero />
			{/* <Feedback /> */}

			<Achievements />

			<Services />

			<VideoReel />
			<WhyUs />
			{/* <Products /> */}
			<Blogs />
			<section className="dashed dashed-y">
				<div className="dashed dashed-x container mx-auto max-w-7xl">
					<div className="group grid grid-cols-5 gap-4 py-12">
						<h2 className="shrink-0 text-balance text-muted-foreground">
							Trusted by fast-growing companies around the world
						</h2>
						<div className="mask-[linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)] col-span-4">
							<Marquee className="[--duration:25s] [--gap:3.5rem]">
								{CLIENTS.map((client) => (
									<Image
										alt={client.name}
										className="h-8 w-auto object-contain saturate-0 transition-[filter] group-hover:saturate-100"
										height={100}
										key={client.name}
										src={client.src}
										width={100}
									/>
								))}
							</Marquee>
						</div>
					</div>
				</div>
			</section>
			{/* <section className="dashed dashed-y">
				<div className="dashed dashed-x container mx-auto max-w-7xl">
					<div className="group grid grid-cols-5 gap-4 py-12">
						<h2 className="shrink-0 text-balance text-muted-foreground">
							Trusted by fast-growing companies around the world
						</h2>
						<div className="mask-[linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)] col-span-4">
							<Marquee className="[--duration:25s] [--gap:3.5rem]">
								{CLIENTS.map((client) => (
									<Image
										alt={client.name}
										className="h-8 w-auto object-contain saturate-0 transition-[filter] group-hover:saturate-100"
										height={100}
										key={client.name}
										src={client.src}
										width={100}
									/>
								))}
							</Marquee>
						</div>
					</div>
				</div>
			</section> */}
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
		</main>
	);
}
