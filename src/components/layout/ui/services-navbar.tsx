"use client";

import { useEffect, useRef, useState } from "react";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";

import { IconArrowRight } from "@/assets/icons/arrow";

import { cn } from "@/lib/utils";

import { Submenu } from "../data/types";

export const ServicesNavbar = ({ submenu }: { submenu: Submenu[] }) => {
	const firstSubmenuId = submenu[0]?.id ?? null;
	const [hoveredIdx, setHoveredIdx] = useState<string | null>(firstSubmenuId);
	const [hoveredListSlug, setHoveredListSlug] = useState<string | null>(null);
	const [hoveredListPreview, setHoveredListPreview] = useState<{
		image: string;
		title: string;
		description: string;
	} | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const hoveredIndex = hoveredIdx
		? submenu.findIndex((menu) => menu.id === hoveredIdx)
		: -1;
	const hoveredSubmenu = hoveredIdx
		? submenu.find((menu) => menu.id === hoveredIdx)
		: null;
	const hoveredSubmenuBasePath = hoveredSubmenu?.href?.replace(/\/$/, "");
	const previewImageSrc =
		hoveredListPreview?.image ||
		hoveredSubmenu?.image ||
		"/images/services/logo-design.jpg";
	const previewImageAlt = `${hoveredListPreview?.title || hoveredSubmenu?.title || "Service"} by Ziron Media`;

	// biome-ignore lint/correctness/useExhaustiveDependencies: Not needed
	useEffect(() => {
		setHoveredListPreview(null);
		setHoveredListSlug(null);
	}, [hoveredSubmenu?.id]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Not needed
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
		<div className="grid h-fit w-4xl grid-cols-[1fr_0.75fr_1fr] gap-2">
			<ul className="space-y-1">
				{submenu.map((sub) => {
					const Icon = sub.icon!;
					return (
						<li
							className="relative"
							key={sub.id}
							onMouseEnter={() => setHoveredIdx(sub.id)}
						>
							<Link
								className="group relative z-10 flex items-center gap-2 rounded-xl p-1"
								href={sub.href as Route}
							>
								<div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-input bg-floating">
									<Icon className={cn("size-6", sub.color)} />
								</div>
								<div className="space-y-1">
									<p className="font-medium text-base leading-none">
										{sub.title}
									</p>
									<span className="line-clamp-1 text-muted-foreground text-xs">
										{sub.alt}
									</span>
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
			<div className="rounded-xl bg-gray-100/60 px-4 py-2">
				<AnimatePresence mode="wait">
					{hoveredSubmenu && (
						<motion.ul
							animate={{ opacity: 1, y: 0 }}
							className="divide-y divide-gray-300/30"
							exit={{ opacity: 0, y: -6 }}
							initial={{ opacity: 0, y: 6 }}
							key={hoveredSubmenu.id}
							transition={{ duration: 0.12, ease: "easeOut" }}
						>
							{hoveredSubmenu.lists?.map((list, index) => (
								<motion.li
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 2 }}
									initial={{ opacity: 0, x: 6 }}
									key={list.title}
									onMouseEnter={() =>
										setHoveredListPreview({
											image: list.image,
											title: list.title,
											description: list.description,
										})
									}
									onMouseLeave={() => setHoveredListPreview(null)}
									transition={{
										duration: 0.16,
										ease: "easeOut",
										delay: index * 0.045,
									}}
								>
									<Link
										className={cn(
											"group flex items-center justify-between py-2 font-medium text-sm transition-colors",
											hoveredListSlug === list.slug && hoveredSubmenu.color
										)}
										href={`${hoveredSubmenuBasePath}/${list.slug}` as Route}
										onMouseEnter={() => setHoveredListSlug(list.slug)}
										onMouseLeave={() => setHoveredListSlug(null)}
									>
										{list.title}
										<IconArrowRight
											className={cn(
												"size-3 text-gray-300 transition-colors duration-300",
												hoveredListSlug === list.slug && hoveredSubmenu.color
											)}
										/>
									</Link>
								</motion.li>
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
			<div className="relative isolate size-full overflow-hidden rounded-xl">
				<AnimatePresence mode="wait">
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						className="absolute inset-0"
						exit={{ opacity: 0, scale: 1.02 }}
						initial={{ opacity: 0, scale: 0.98 }}
						key={previewImageSrc}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<Image
							alt={previewImageAlt}
							className="object-cover"
							fill
							sizes="(max-width: 1280px) 30vw, 400px"
							src={previewImageSrc}
						/>
						<AnimatePresence>
							{hoveredListPreview && (
								<motion.div
									animate={{ opacity: 1 }}
									className="relative z-10 flex h-full w-full flex-col justify-end bg-linear-to-t from-card/90 p-6"
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
									key={hoveredListPreview.title}
									transition={{ duration: 0.16, ease: "easeOut" }}
								>
									<p className="font-medium text-foreground text-xl">
										{hoveredListPreview.title}
									</p>
									<p className="text-muted-foreground text-sm">
										{hoveredListPreview.description}
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};
