"use client";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { motion } from "motion/react";

import { Noise } from "@/components/shared/noise";
import { Card, CardContent } from "@/components/ui/card";
import {
	DotButton,
	TRANSITION,
	useEmblaControls,
} from "@/components/ui/carousel";

import { FEEDBACK_ITEMS } from "./data/feedbacks";

export const Feedback = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({
			delay: 3000,
		}),

		WheelGesturesPlugin(),
	]);
	const { selectedIndex, scrollSnaps, onDotClick } = useEmblaControls(emblaApi);

	return (
		<section className="dashed dashed-t relative pb-8">
			<div className="relative z-50 w-full space-y-4 [--slide-height:100%] [--slide-size:80%] [--slide-spacing:0.5rem] md:[--slide-size:30%] md:[--slide-spacing:1rem] 2xl:[--slide-size:25%]">
				<div className="overflow-hidden pt-8 pb-4" ref={emblaRef}>
					<div className="flex touch-pan-y touch-pinch-zoom">
						{FEEDBACK_ITEMS.map((item, index) => {
							const isActive = index === selectedIndex;

							return (
								<motion.div
									className="mr-(--slide-spacing) flex h-(--slide-height) min-w-0 flex-none basis-(--slide-size)"
									key={`Slide ${index + 1}`}
								>
									<motion.div
										animate={{
											scale: isActive ? 1 : 0.95,
										}}
										className="size-full select-none transition-transform duration-150 ease-out hover:-translate-y-4"
										initial={false}
										transition={TRANSITION}
									>
										<Card
											className="relative z-50 rounded-[calc(var(--radius-2xl)+calc(var(--spacing)*1))]"
											key={`card-${index + 1}`}
										>
											<CardContent>
												<div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-surface md:aspect-7/4">
													<Noise className="opacity-20" />
													<Image
														alt="Client testimonial card from Maxline Global praising Ziron Media’s social media work"
														className="absolute top-14 left-1/2 z-20 -translate-x-[15%] rotate-9 rounded-xl transition-[rotate,scale,translate] duration-500 group-hover/card:-translate-x-[12%] group-hover/card:rotate-3 group-hover/card:scale-115"
														height={200}
														src={item.image1}
														width={170}
													/>
													<Image
														alt="Client testimonial card from Maxline Global highlighting increased reach and engagement"
														className="absolute top-12 left-1/2 z-10 -translate-x-[85%] -rotate-9 rounded-xl transition-[rotate,scale,translate] duration-500 group-hover/card:-translate-x-[88%] group-hover/card:-translate-y-2 group-hover/card:-rotate-3 group-hover/card:scale-115"
														height={200}
														src={item.image2}
														width={170}
													/>
													<Image
														alt="Background sky blue gradient"
														className="object-cover opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
														fill
														src={item.gradientImage}
													/>
												</div>
												<div className="space-y-2 p-2 md:p-2.5">
													<div className="max-w-sm space-y-1 rounded-2xl rounded-bl-none bg-surface p-2.5 md:space-y-2 md:p-3">
														<p className="text-xs leading-snug md:text-sm">
															{item.quote1}
														</p>
														<span className="text-muted text-xs">
															{item.author1}
														</span>
													</div>
													<div className="flex items-end justify-end">
														<div className="max-w-sm space-y-1 rounded-2xl rounded-br-none bg-surface p-2.5 text-right transition-colors duration-500 group-hover/card:bg-primary group-hover/card:text-white md:space-y-2 md:p-3">
															<p className="text-xs leading-snug md:text-sm">
																{item.quote2}
															</p>
															<span className="text-muted text-xs">
																{item.author2}
															</span>
														</div>
													</div>
												</div>
												<div className="-m-1 mt-0 flex items-center gap-2 bg-background p-2 md:p-3">
													<div>
														<div className="size-10 rounded-full bg-muted md:size-12" />
													</div>
													<div>
														<p className="font-medium text-muted-foreground text-xs tracking-tight md:text-sm">
															{item.authorName}
														</p>
														<span className="text-[10px] text-muted tracking-tight md:text-xs">
															{item.authorRole}
														</span>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								</motion.div>
							);
						})}
					</div>
				</div>

				<div className="flex items-center justify-center gap-3">
					<div className="flex flex-wrap items-center justify-end gap-2 rounded-full bg-surface/80 p-1">
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={`Slide ${index + 1}`}
								onClick={() => onDotClick(index)}
								selected={index === selectedIndex}
							/>
						))}
					</div>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-0 bg-linear-0 from-white" />
		</section>
	);
};
