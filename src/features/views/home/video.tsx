"use client";

import { useEffect, useRef, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { IconCaretRight } from "@/assets/icons/caret";

import { useIsMobile } from "@/hooks/use-media-query";

export const Video = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPreviewReady, setIsPreviewReady] = useState(false);
	const previewWrapperRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();

	useEffect(() => {
		const element = previewWrapperRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setIsPreviewReady(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" }
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	if (isMobile) return null;

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger className="group fixed bottom-9 left-6 z-990 aspect-video h-32 cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-out hover:scale-105">
				<div ref={previewWrapperRef}>
					<div className="-translate-1/2 absolute top-1/2 left-1/2">
						<div className="flex size-9 items-center justify-center gap-1.5 overflow-hidden rounded-md bg-card/20 px-3 backdrop-blur-lg transition-[width] group-hover:w-auto">
							<span className="hidden font-medium text-sm group-hover:flex">
								Play
							</span>
							<span>
								<IconCaretRight className="size-4 text-primary" />
							</span>
						</div>
					</div>
					<video
						autoPlay
						crossOrigin="anonymous"
						loop
						muted
						playsInline
						preload="none"
						slot="media"
						src={isPreviewReady ? "/videos/landing-intro-low.webm" : undefined}
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
			</DialogTrigger>
			<DialogContent className="sm:max-w-7xl">
				<video
					autoPlay
					crossOrigin="anonymous"
					loop
					playsInline
					preload="none"
					slot="media"
					src={isOpen ? "/videos/landing-intro.webm" : undefined}
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
			</DialogContent>
		</Dialog>
	);
};
