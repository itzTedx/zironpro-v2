"use client";

import Image from "next/image";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import { FEATURED_ITEMS } from "./data/constants";

export const Featured = () => {
	return (
		<section className="dashed dashed-t relative pb-8">
			<Carousel
				className="relative z-10 w-full"
				opts={{
					align: "center",
				}}
			>
				<CarouselContent>
					{FEATURED_ITEMS.map((item) => (
						<CarouselItem className="basis-1/2 py-9 lg:basis-1/6" key={item.id}>
							<div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-surface transition-[translate_box-shadow] ease-out hover:-translate-y-4 hover:shadow-lg">
								<div className="relative z-20 flex items-center gap-2 p-4 text-card">
									<item.icon className="" />
									<h2 className="font-medium tracking-wide">{item.title}</h2>
								</div>
								<Image
									alt={`${item.title} featured work by Ziron pro`}
									className="object-cover"
									fill
									sizes="(max-width: 1024px) 50vw, 17vw"
									src={item.image}
								/>
								{/* <div className="absolute inset-x-0 top-0 z-10 h-1/2 bg-linear-to-b from-white" /> */}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-0 from-white" />
		</section>
	);
};
