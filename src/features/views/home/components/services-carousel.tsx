"use client";

import Image from "next/image";

import { Noise } from "@/components/shared/noise";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import { SERVICES } from "@/features/services/constant";
import { cn } from "@/lib/utils";

export const ServicesCarousel = () => {
	return (
		<Carousel
			className="w-full"
			opts={{
				align: "start",
			}}
		>
			<CarouselContent>
				{SERVICES.map((service) => (
					<CarouselItem
						className="basis-1/2 md:basis-1/3 lg:basis-1/5"
						key={service.id}
					>
						<div>
							<div
								className={cn(
									"relative flex aspect-square items-center justify-center overflow-hidden rounded-xl"
								)}
							>
								<Image
									alt={service.title}
									className="object-cover"
									fill
									src={service.bg}
								/>
								<Noise />
								<service.icon className="relative z-10 size-16 text-card/90" />
							</div>
							<h3 className="mt-4 mb-2 font-medium text-xl">{service.title}</h3>
							<p className="line-clamp-2 text-muted-foreground text-sm">
								{service.description}
							</p>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
