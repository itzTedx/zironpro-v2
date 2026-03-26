"use client";

import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

export const TagsCarousel = ({ tags }: { tags: string[] }) => {
	return (
		<Carousel
			className="z-40 w-full cursor-pointer"
			opts={{
				align: "start",
				dragFree: true,
			}}
		>
			<CarouselContent className="-ml-1">
				{tags.map((tag) => (
					<CarouselItem className="basis-auto pl-1" key={tag}>
						<Badge key={tag} size="sm" variant="info">
							{tag}
						</Badge>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
