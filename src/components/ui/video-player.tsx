"use client";

import type { ComponentProps } from "react";
import React, { useState } from "react";

import { Play, Plus } from "lucide-react";
import {
	MediaControlBar,
	MediaController,
	MediaMuteButton,
	MediaPlayButton,
	MediaSeekBackwardButton,
	MediaSeekForwardButton,
	MediaTimeDisplay,
	MediaTimeRange,
	MediaVolumeRange,
} from "media-chrome/react";
import { AnimatePresence, motion, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
	<MediaController
		style={{
			...style,
		}}
		{...props}
	/>
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
	<MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = ({
	className,
	...props
}: VideoPlayerTimeRangeProps) => (
	<MediaTimeRange
		className={cn(
			"[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
			className
		)}
		{...props}
	/>
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
	typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = ({
	className,
	...props
}: VideoPlayerTimeDisplayProps) => (
	<MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
	typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = ({
	className,
	...props
}: VideoPlayerVolumeRangeProps) => (
	<MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = ({
	className,
	...props
}: VideoPlayerPlayButtonProps) => (
	<MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
	typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = ({
	className,
	...props
}: VideoPlayerSeekBackwardButtonProps) => (
	<MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
	typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = ({
	className,
	...props
}: VideoPlayerSeekForwardButtonProps) => (
	<MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = ({
	className,
	...props
}: VideoPlayerMuteButtonProps) => (
	<MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
	className,
	...props
}: VideoPlayerContentProps) => (
	<video className={cn("mt-0 mb-0", className)} {...props} />
);

export const Video = () => {
	const [showVideoPopOver, setShowVideoPopOver] = useState(false);

	const SPRING = {
		mass: 0.1,
	};

	const x = useSpring(0, SPRING);
	const y = useSpring(0, SPRING);
	const opacity = useSpring(0, SPRING);

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		opacity.set(1);
		const bounds = e.currentTarget.getBoundingClientRect();
		x.set(e.clientX - bounds.left);
		y.set(e.clientY - bounds.top);
	};

	return (
		<section className="fixed right-6 bottom-9 z-9999 flex aspect-video h-32 items-center justify-center overflow-hidden rounded-xl bg-card shadow-lg">
			<AnimatePresence>
				{showVideoPopOver && (
					<VideoPopOver setShowVideoPopOver={setShowVideoPopOver} />
				)}
			</AnimatePresence>
			<div
				onClick={() => {
					setShowVideoPopOver(true);
				}}
				onMouseLeave={() => {
					opacity.set(0);
				}}
				onMouseMove={handlePointerMove}
			>
				<motion.div
					className="relative z-20 flex w-fit select-none items-center justify-center gap-2 p-2 text-sm text-white mix-blend-exclusion"
					style={{ x, y, opacity }}
				>
					<Play className="size-4 fill-white" /> Play
				</motion.div>
				<video
					autoPlay
					className="absolute inset-0"
					crossOrigin="anonymous"
					loop
					muted
					playsInline
					slot="media"
					src="/videos/landing-intro-low.webm"
					title="Intro Video"
				>
					<track
						className="hidden"
						kind="captions"
						label="English"
						src="/videos/subtitle.vtt"
						srcLang="en"
					/>
				</video>
			</div>
		</section>
	);
};

const VideoPopOver = ({
	setShowVideoPopOver,
}: {
	setShowVideoPopOver: (showVideoPopOver: boolean) => void;
}) => {
	return (
		<div className="fixed top-0 left-0 z-999999 flex h-screen w-screen items-center justify-center">
			<motion.div
				animate={{ opacity: 1 }}
				className="fixed top-0 left-0 h-full w-full bg-foreground/90 backdrop-blur-lg"
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				onClick={() => setShowVideoPopOver(false)}
				transition={{ duration: 0.2 }}
			/>
			<motion.div
				animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
				className="relative aspect-video max-w-7xl overflow-hidden rounded-xl"
				exit={{
					clipPath: "inset(43.5% 43.5% 33.5% 43.5% )",
					opacity: 0,
					transition: {
						duration: 1,
						type: "spring",
						stiffness: 100,
						damping: 20,
						opacity: { duration: 0.2, delay: 0.8 },
					},
				}}
				initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5% )", opacity: 0 }}
				transition={{
					duration: 1,
					type: "spring",
					stiffness: 100,
					damping: 20,
				}}
			>
				<VideoPlayer style={{ width: "100%", height: "100%" }}>
					<VideoPlayerContent
						autoPlay
						className="w-full object-cover"
						loop
						slot="media"
						src="/videos/landing-intro-low.webm"
						style={{ width: "100%", height: "100%" }}
					/>

					<span
						className="absolute top-2 right-2 z-10 cursor-pointer rounded-full p-1 transition-colors"
						onClick={() => setShowVideoPopOver(false)}
					>
						<Plus className="size-5 rotate-45 text-white" />
					</span>
					<VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-center px-5 mix-blend-exclusion md:px-10 md:py-5">
						<VideoPlayerPlayButton className="h-4 bg-transparent" />
						<VideoPlayerTimeRange className="bg-transparent" />
						<VideoPlayerMuteButton className="size-4 bg-transparent" />
					</VideoPlayerControlBar>
				</VideoPlayer>
			</motion.div>
		</div>
	);
};
