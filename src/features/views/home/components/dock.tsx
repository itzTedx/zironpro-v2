"use client";

import * as React from "react";
import { useRef } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface DockProps {
	className?: string;
	children: React.ReactNode;
	maxAdditionalSize?: number;
	iconSize?: number;
}

interface DockIconProps {
	className?: string;
	src?: string;
	name: string;
	handleIconHover?: (e: React.MouseEvent<HTMLLIElement>) => void;
	children?: React.ReactNode;
	iconSize?: number;
}

type ScaleValueParams = [number, number];

export const scaleValue = (
	value: number,
	from: ScaleValueParams,
	to: ScaleValueParams
): number => {
	const scale = (to[1] - to[0]) / (from[1] - from[0]);
	const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return Math.floor(capped * scale + to[0]);
};

export function DockIcon({
	className,
	src,
	name,
	handleIconHover,
	children,
	iconSize,
}: DockIconProps) {
	const ref = useRef<HTMLLIElement | null>(null);

	return (
		<>
			<li
				className={cn(
					"icon group/li flex w-(--icon-size) cursor-pointer items-center justify-center px-[calc(var(--icon-size)*0.075)] hover:-mt-[calc(var(--icon-size)/2)] hover:h-[calc(var(--icon-size)*1.5)] hover:w-[calc(var(--icon-size)*1.5)] md:h-(--icon-size) [&_img]:object-contain",
					className
				)}
				onMouseMove={handleIconHover}
				ref={ref}
				style={
					{
						transition:
							"width, height, margin-top, cubic-bezier(0.25, 1, 0.5, 1) 150ms",
						"--icon-size": `${iconSize}px`,
					} as React.CSSProperties
				}
			>
				<div className="group/a relative aspect-square w-full rounded-[10px] border border-gray-100 bg-linear-to-t from-neutral-100 to-white p-1.5 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_inset] after:absolute after:inset-0 after:rounded-[inherit] after:shadow-md after:shadow-zinc-800/10">
					<span className="absolute top-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-100 bg-linear-to-t from-neutral-100 to-white p-1 px-2 text-black text-xs opacity-0 transition-opacity duration-200 group-hover/li:opacity-100">
						{name}
					</span>
					{src ? (
						<Image
							alt={`${name} icon by Ziron pro`}
							className="h-full w-full rounded-[inherit]"
							height={iconSize ?? 52}
							src={src}
							width={iconSize ?? 52}
						/>
					) : (
						children
					)}
				</div>
			</li>
		</>
	);
}

export function Dock({
	className,
	children,
	maxAdditionalSize = 5,
	iconSize = 52,
}: DockProps) {
	const dockRef = useRef<HTMLDivElement | null>(null);

	const handleIconHover = (e: React.MouseEvent<HTMLLIElement>) => {
		if (!dockRef.current) return;
		const mousePos = e.clientX;
		const iconPosLeft = e.currentTarget.getBoundingClientRect().left;
		const iconWidth = e.currentTarget.getBoundingClientRect().width;

		const cursorDistance = (mousePos - iconPosLeft) / iconWidth;
		const offsetPixels = scaleValue(
			cursorDistance,
			[0, 1],
			[maxAdditionalSize * -1, maxAdditionalSize]
		);

		dockRef.current.style.setProperty(
			"--dock-offset-left",
			`${offsetPixels * -1}px`
		);

		dockRef.current.style.setProperty(
			"--dock-offset-right",
			`${offsetPixels}px`
		);
	};

	return (
		<nav aria-label="Main Dock" ref={dockRef} role="navigation">
			<ul
				className={cn(
					"flex items-center rounded-xl border border-gray-100 bg-linear-to-t from-gray-50 to-white p-1",
					className
				)}
			>
				{React.Children.map(children, (child) =>
					React.isValidElement<DockIconProps>(child)
						? React.cloneElement(child as React.ReactElement<DockIconProps>, {
								handleIconHover,
								iconSize,
							})
						: child
				)}
			</ul>
		</nav>
	);
}
