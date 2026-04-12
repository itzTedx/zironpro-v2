"use client";

import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

export const TagsCarousel = ({
	tags,
	className,
}: {
	tags: string[];
	className?: string;
}) => {
	return (
		<Carousel
			className="z-40 w-full min-w-0 cursor-pointer overflow-hidden"
			opts={{
				align: "start",
				dragFree: true,
			}}
		>
			<CarouselContent className="-ml-1">
				{tags.map((tag) => (
					<CarouselItem className="basis-auto pl-1" key={tag}>
						<Badge
							className={className}
							key={tag}
							size="sm"
							variant="secondary"
						>
							{tag}
						</Badge>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
