"use client";

import Image from "next/image";
import Link from "next/link";

import { Noise } from "@/components/shared/noise";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { SERVICES } from "@/features/services/constant";
import { cn } from "@/lib/utils";

export const ServicesCarousel = () => {
	return (
		<Carousel
			autoplayOptions={{
				delay: 3000,
				stopOnMouseEnter: true,
			}}
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
						<Link className="group" href={`/services/${service.slug}`}>
							<div
								className={cn(
									"relative flex aspect-square items-center justify-center overflow-hidden rounded-xl"
								)}
							>
								<Image
									alt={`${service.title} service visual by Ziron Media`}
									className="object-cover transition-transform duration-500 ease-out group-hover:scale-125"
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
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="mt-4 flex items-center justify-center gap-4">
				<CarouselPrevious
					className="relative left-0 translate-y-0 bg-card"
					size="icon-lg"
				/>
				<CarouselNext
					className="relative right-0 translate-y-0 bg-card"
					size="icon-lg"
				/>
			</div>
		</Carousel>
	);
};
