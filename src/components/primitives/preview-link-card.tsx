"use client";

import * as React from "react";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import {
	PreviewCardArrow as PreviewCardArrowPrimitive,
	type PreviewCardArrowProps as PreviewCardArrowPropsPrimitive,
	PreviewCardBackdrop as PreviewCardBackdropPrimitive,
	type PreviewCardBackdropProps as PreviewCardBackdropPropsPrimitive,
	PreviewCardPopup as PreviewCardPopupPrimitive,
	type PreviewCardPopupProps as PreviewCardPopupPropsPrimitive,
	PreviewCardPortal as PreviewCardPortalPrimitive,
	type PreviewCardPortalProps as PreviewCardPortalPropsPrimitive,
	PreviewCardPositioner as PreviewCardPositionerPrimitive,
	type PreviewCardPositionerProps as PreviewCardPositionerPropsPrimitive,
	PreviewCard as PreviewCardPrimitive,
	type PreviewCardProps as PreviewCardPropsPrimitive,
	PreviewCardTrigger as PreviewCardTriggerPrimitive,
	type PreviewCardTriggerProps as PreviewCardTriggerPropsPrimitive,
} from "@/components/ui/preview-card";

import { getStrictContext } from "@/lib/get-strict-context";

type PreviewLinkCardContextType = {
	href: Route;
	src: string;
	width?: number;
	height?: number;
};

const [PreviewLinkCardProvider, usePreviewLinkCard] =
	getStrictContext<PreviewLinkCardContextType>("PreviewLinkCardContext");

type PreviewLinkCardProps = PreviewCardPropsPrimitive & {
	href: Route;
	src: string;
	width?: number;
	height?: number;
	deviceScaleFactor?: number;
	colorScheme?: "light" | "dark";
};

function PreviewLinkCard({
	href,
	src,
	width = 240,
	height = 135,
	deviceScaleFactor = 1,
	colorScheme = "light",
	...props
}: PreviewLinkCardProps) {
	const imageSrc =
		src ??
		`https://api.microlink.io/?${buildQueryString({
			url: href,
			screenshot: true,
			meta: false,
			embed: "screenshot.url",
			colorScheme,
			"viewport.isMobile": true,
			"viewport.deviceScaleFactor": deviceScaleFactor,
			"viewport.width": width * 3,
			"viewport.height": height * 3,
		})}`;

	return (
		<PreviewLinkCardProvider value={{ href, src: imageSrc, width, height }}>
			<PreviewCardPrimitive data-slot="preview-link-card" {...props} />
		</PreviewLinkCardProvider>
	);
}

type PreviewLinkCardTriggerProps = PreviewCardTriggerPropsPrimitive;

function PreviewLinkCardTrigger({
	children,
	render,
	...props
}: PreviewLinkCardTriggerProps) {
	const { href } = usePreviewLinkCard();

	return (
		<PreviewCardTriggerPrimitive
			data-slot="preview-link-card-trigger"
			render={render ?? <Link href={href}>{children}</Link>}
			{...props}
		/>
	);
}

type PreviewLinkCardPortalProps = PreviewCardPortalPropsPrimitive;

function PreviewLinkCardPortal(props: PreviewLinkCardPortalProps) {
	return (
		<PreviewCardPortalPrimitive
			data-slot="preview-link-card-portal"
			{...props}
		/>
	);
}

type PreviewLinkCardPositionerProps = PreviewCardPositionerPropsPrimitive;

function PreviewLinkCardPositioner({
	side = "top",
	sideOffset = 10,
	align = "center",
	...props
}: PreviewLinkCardPositionerProps) {
	return (
		<PreviewCardPositionerPrimitive
			align={align}
			className="z-999"
			data-slot="preview-link-card-positioner"
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

function buildQueryString(
	params: Record<string, string | number | boolean | undefined | null>
) {
	const sp = new URLSearchParams();
	for (const [k, v] of Object.entries(params)) {
		if (v === undefined || v === null) continue;
		sp.append(k, String(v));
	}
	return sp.toString();
}

type PreviewLinkCardPopupProps = PreviewCardPopupPropsPrimitive &
	React.ComponentProps<typeof Link>;

function PreviewLinkCardPopup({
	transition = { type: "spring", stiffness: 300, damping: 25 },
	href: hrefProp,
	style,
	children,
	...props
}: PreviewLinkCardPopupProps) {
	const { href } = usePreviewLinkCard();

	return (
		<PreviewCardPopupPrimitive
			data-slot="preview-link-card-popup"
			transition={transition}
		>
			<Link
				data-slot="preview-link-card-popup-link"
				href={hrefProp ?? (href as Route)}
				style={{
					display: "block",
					...style,
				}}
				{...props}
			>
				{children}
			</Link>
		</PreviewCardPopupPrimitive>
	);
}

type PreviewLinkCardImageProps = Omit<
	React.ComponentProps<typeof Image>,
	"src" | "width" | "height"
>;

function PreviewLinkCardImage({
	alt = "Website preview screenshot by Ziron Media",
	...props
}: PreviewLinkCardImageProps) {
	const { src, width, height } = usePreviewLinkCard();

	return <Image alt={alt} height={height} src={src} width={width} {...props} />;
}

type PreviewLinkCardBackdropProps = PreviewCardBackdropPropsPrimitive;

function PreviewLinkCardBackdrop(props: PreviewLinkCardBackdropProps) {
	return (
		<PreviewCardBackdropPrimitive
			data-slot="preview-link-card-backdrop"
			{...props}
		/>
	);
}

type PreviewLinkCardArrowProps = PreviewCardArrowPropsPrimitive;

function PreviewLinkCardArrow(props: PreviewLinkCardArrowProps) {
	return (
		<PreviewCardArrowPrimitive data-slot="preview-link-card-arrow" {...props} />
	);
}

export {
	PreviewLinkCard,
	PreviewLinkCardArrow,
	type PreviewLinkCardArrowProps,
	PreviewLinkCardBackdrop,
	type PreviewLinkCardBackdropProps,
	type PreviewLinkCardContextType,
	PreviewLinkCardImage,
	type PreviewLinkCardImageProps,
	PreviewLinkCardPopup,
	type PreviewLinkCardPopupProps,
	PreviewLinkCardPortal,
	type PreviewLinkCardPortalProps,
	PreviewLinkCardPositioner,
	type PreviewLinkCardPositionerProps,
	type PreviewLinkCardProps,
	PreviewLinkCardTrigger,
	type PreviewLinkCardTriggerProps,
	usePreviewLinkCard,
};
