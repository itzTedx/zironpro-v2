"use client";

import * as React from "react";

import { EmblaCarouselType } from "embla-carousel";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { motion, type Transition } from "motion/react";

import { Button, ButtonProps } from "@/components/ui/button";

import { IconCaretLeft, IconCaretRight } from "@/assets/icons/caret";

import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
	autoplay?: boolean;
	autoplayOptions?: AutoplayOptionsType;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

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

function Carousel({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	autoplay = true,
	autoplayOptions = {
		delay: 2000,
	},
	children,
	...props
}: React.ComponentProps<"div"> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		[
			...(autoplay
				? [
						Autoplay({
					delay: autoplayOptions.delay,
					...autoplayOptions,
						}),
				  ]
				: []),

			WheelGesturesPlugin(),
			...(plugins || []),
		]
	);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext]
	);

	React.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);

		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				aria-roledescription="carousel"
				className={cn("relative", className)}
				data-slot="carousel"
				onKeyDownCapture={handleKeyDown}
				role="region"
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			className="overflow-hidden"
			data-slot="carousel-content"
			ref={carouselRef}
		>
			<div
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
	const { orientation } = useCarousel();

	return (
		<div
			aria-roledescription="slide"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				className
			)}
			data-slot="carousel-item"
			role="group"
			{...props}
		/>
	);
}

function CarouselPrevious({
	className,
	variant = "outline",
	size = "icon-sm",
	...props
}: ButtonProps) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			className={cn(
				"absolute touch-manipulation",
				orientation === "horizontal"
					? "top-1/2 -left-12 -translate-y-1/2"
					: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
				className
			)}
			data-slot="carousel-previous"
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			size={size}
			variant={variant}
			{...props}
		>
			<>
				<IconCaretLeft />
				<span className="sr-only">Previous slide</span>
			</>
		</Button>
	);
}

function CarouselNext({
	className,
	variant = "outline",
	size = "icon-sm",
	...props
}: ButtonProps) {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			className={cn(
				"absolute touch-manipulation",
				orientation === "horizontal"
					? "top-1/2 -right-12 -translate-y-1/2"
					: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
				className
			)}
			data-slot="carousel-next"
			disabled={!canScrollNext}
			onClick={scrollNext}
			size={size}
			variant={variant}
			{...props}
		>
			<>
				<IconCaretRight />
				<span className="sr-only">Next slide</span>
			</>
		</Button>
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

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	useCarousel,
	useEmblaControls,
	DotButton,
	TRANSITION,
};
