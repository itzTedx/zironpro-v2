"use client";

import * as React from "react";

import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
	children: React.ReactNode;
};

type EmblaControls = {
	selectedIndex: number;
	scrollSnaps: number[];
	prevDisabled: boolean;
	nextDisabled: boolean;
	onDotClick: (index: number) => void;
	onPrev: () => void;
	onNext: () => void;
};

type DotButtonProps = {
	selected?: boolean;
	label: string;
	onClick: () => void;
};

const TRANSITION: Transition = {
	type: "spring",
	stiffness: 240,
	damping: 24,
	mass: 1,
};

const useEmblaControls = (
	emblaApi: EmblaCarouselType | undefined
): EmblaControls => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
	const [prevDisabled, setPrevDisabled] = React.useState(true);
	const [nextDisabled, setNextDisabled] = React.useState(true);

	const onDotClick = React.useCallback(
		(index: number) => emblaApi?.scrollTo(index),
		[emblaApi]
	);

	const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	const updateSelectionState = (api: EmblaCarouselType) => {
		setSelectedIndex(api.selectedScrollSnap());
		setPrevDisabled(!api.canScrollPrev());
		setNextDisabled(!api.canScrollNext());
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: No need to re-render when api prop changes
	const onInit = React.useCallback((api: EmblaCarouselType) => {
		setScrollSnaps(api.scrollSnapList());
		updateSelectionState(api);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: No need to re-render when api prop changes
	const onSelect = React.useCallback((api: EmblaCarouselType) => {
		updateSelectionState(api);
	}, []);

	React.useEffect(() => {
		if (!emblaApi) return;

		onInit(emblaApi);
		emblaApi.on("reInit", onInit).on("select", onSelect);

		return () => {
			emblaApi.off("reInit", onInit).off("select", onSelect);
		};
	}, [emblaApi, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		prevDisabled,
		nextDisabled,
		onDotClick,
		onPrev,
		onNext,
	};
};

function MotionCarousel(props: PropType) {
	const { slides, options, children } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({
			delay: 3000,
		}),

		WheelGesturesPlugin(),
	]);
	const {
		selectedIndex,
		scrollSnaps,

		onDotClick,
	} = useEmblaControls(emblaApi);

	return (
		<div className="relative z-50 w-full space-y-4 [--slide-height:100%] [--slide-size:80%] [--slide-spacing:0rem] md:[--slide-size:30%] md:[--slide-spacing:0.2rem]">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex touch-pan-y touch-pinch-zoom">
					{slides.map((index) => {
						const isActive = index === selectedIndex;

						return (
							<motion.div
								className="mr-(--slide-spacing) flex h-(--slide-height) min-w-0 flex-none basis-(--slide-size)"
								key={`Slide ${index + 1}`}
							>
								<motion.div
									animate={{
										scale: isActive ? 1 : 0.9,
									}}
									className="size-full select-none"
									initial={false}
									transition={TRANSITION}
								>
									{children}
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
							label={`Slide ${index + 1}`}
							onClick={() => onDotClick(index)}
							selected={index === selectedIndex}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function DotButton({ selected = false, onClick }: DotButtonProps) {
	return (
		<motion.button
			// animate={{
			// 	width: selected ? 68 : 12,
			// 	height: selected ? 28 : 12,
			// }}
			className={cn(
				"flex cursor-pointer select-none items-center justify-center rounded-full border-none bg-primary shadow-sm transition-colors",
				selected ? "bg-white" : "bg-surface"
			)}
			initial={false}
			layout
			onClick={onClick}
			transition={TRANSITION}
			type="button"
		>
			<motion.span
				animate={{
					opacity: selected ? 1 : 0,
					scale: selected ? 1 : 0,
					filter: selected ? "blur(0)" : "blur(4px)",
				}}
				className="block size-3 whitespace-nowrap"
				initial={false}
				layout
				transition={TRANSITION}
			/>
		</motion.button>
	);
}

export { DotButton, MotionCarousel, TRANSITION, useEmblaControls };
