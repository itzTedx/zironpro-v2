"use client";

import { useEffect, useRef, useState } from "react";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Submenu } from "../data/types";

export const ServicesNavbar = ({ submenu }: { submenu: Submenu[] }) => {
	const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const hoveredIndex = hoveredIdx
		? submenu.findIndex((menu) => menu.id === hoveredIdx)
		: -1;

	// Scroll to the hovered image
	useEffect(() => {
		if (hoveredIndex >= 0 && scrollContainerRef.current) {
			const container = scrollContainerRef.current;

			// Use requestAnimationFrame to ensure layout is calculated
			requestAnimationFrame(() => {
				const items = Array.from(container.children) as HTMLElement[];

				if (items[hoveredIndex]) {
					const targetElement = items[hoveredIndex];

					// offsetTop is relative to the offset parent (the scroll container)
					// This accounts for all spacing and heights automatically
					const scrollPosition = targetElement.offsetTop;

					container.scrollTo({
						top: scrollPosition,
						behavior: "smooth",
					});
				}
			});
		}
	}, [hoveredIdx, hoveredIndex]);

	return (
		<div className="grid h-fit w-3xl grid-cols-2 gap-4">
			<ul className="space-y-1.5">
				{submenu.map((sub) => {
					const Icon = sub.icon!;
					return (
						<li
							className="relative"
							key={sub.id}
							onMouseEnter={() => setHoveredIdx(sub.id)}
							onMouseLeave={() => setHoveredIdx(null)}
						>
							<Link
								className="group relative z-10 flex items-center gap-2 rounded-xl p-1"
								href={sub.href as Route}
							>
								<div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-background">
									<Icon className="size-8 text-muted transition-colors duration-300 group-hover:text-primary" />
								</div>
								<div className="space-y-1">
									<p className="font-medium text-lg leading-none">
										{sub.title}
									</p>
								</div>
							</Link>
							<AnimatePresence>
								{hoveredIdx === sub.id && (
									<motion.span
										animate={{
											opacity: 1,
											transition: { duration: 0.05 },
										}}
										className={cn(
											"absolute inset-0 z-0 block h-full w-full rounded-xl bg-gray-100/60"
										)}
										exit={{
											opacity: 0,
											transition: { duration: 0.01, delay: 0.05 },
										}}
										initial={{ opacity: 0 }}
										layoutId="cardHoverEffect"
									/>
								)}
							</AnimatePresence>
						</li>
					);
				})}
			</ul>
			<div className="relative isolate">
				{/* Scrollable container with all images stacked */}
				<div
					className="h-[416px] space-y-3 overflow-hidden overflow-y-scroll rounded-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
					ref={scrollContainerRef}
					style={{ scrollSnapType: "y mandatory" }}
				>
					{submenu.map((sub) => (
						<div
							className="relative aspect-4/3 shrink-0 overflow-hidden rounded-xl shadow-sm"
							key={sub.id}
							style={{ scrollSnapAlign: "start" }}
						>
							<Image
								alt={sub.title}
								className={cn("object-cover")}
								fill
								src={sub.image || "/images/services/logo-design.jpg"}
							/>
							{/* Title and description overlay */}
							<div className="absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end p-6">
								<h2 className="font-medium text-2xl text-card tracking-tight">
									{sub.title}
								</h2>
								<p className="text-muted text-xs">{sub.description}</p>
							</div>
							<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-foreground to-transparent" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
