import type { Metadata } from "next";

import { PRODUCTS } from "@/components/layout/data/constants";
import { Badge } from "@/components/ui/badge";

import { Blogs } from "@/features/articles/views/blogs";
import { Achievements } from "@/features/views/home/achievements";
import { Hero } from "@/features/views/home/hero";
import { Services } from "@/features/views/home/services";
import { VideoReel } from "@/features/views/home/video-reel";
import { WhyUs } from "@/features/views/home/why-us";

export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

export default function Home() {
	return (
		<main>
			<Hero />
			{/* <Feedback /> */}

			<Achievements />

			<Services />

			<VideoReel />
			<WhyUs />
			<section className="dashed dashed-t overflow-hidden">
				<div className="dashed dashed-x container max-w-7xl flex-col items-center justify-center pt-12 sm:pt-16 md:pt-20">
					<div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 text-center">
						<Badge variant="secondary">Products</Badge>
						<h2 className="font-bold text-6xl text-primary">
							Smart tools built to help your business grow faster.
						</h2>
						<p className="mt-3 text-balance text-xl">
							Get access to our products designed to connect, manage + scale
							your business from one ecosystem.
						</p>
					</div>

					<div className="mt-9 flex items-end justify-center gap-4">
						{PRODUCTS.map((product) => {
							const Icon = product.icon!;
							return (
								<div
									className="relative flex translate-y-12 flex-col items-center rounded-t-xl px-9 pt-6 pb-12 text-card transition-transform hover:translate-y-0 data-[product=crm]:bg-yellow-300/80 data-[product=tap]:bg-blue-500 data-[product=crm]:text-foreground"
									data-product={product.id}
									key={product.id}
								>
									<Icon />
									<h3 className="font-bold text-2xl">{product.title}</h3>

									<p>{product.description}</p>
								</div>
							);
						})}
						<div className="relative translate-y-12 rounded-t-xl bg-card p-6 px-9 pt-6 pb-12 transition-transform hover:translate-y-0">
							<span className="font-bold text-2xl">Coming Soon</span>
						</div>
					</div>
				</div>
			</section>
			<Blogs />
		</main>
	);
}
