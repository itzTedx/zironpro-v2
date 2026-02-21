import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import { Suspense } from "react";

import Script from "next/script";

import { BreakpointIndicator } from "@/components/layout/breakpoint-indicator";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import { Video } from "@/components/ui/video-player";

import { inter, interTight, mono } from "@/assets/fonts";

import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	authors: [{ name: siteConfig.shortName, url: siteConfig.url }],
	keywords: siteConfig.keywords,
	creator: siteConfig.shortName,
	openGraph: {
		type: "website",
		locale: "en_AE",
		alternateLocale: "en_US",
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
		images: [siteConfig.ogImage],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@",
	},
	metadataBase: new URL(siteConfig.url),

	verification: {
		google: "H82IdVplopSwcjY_hXhk8ggR9RwBclOsumEZDHP-c6E",
	},
	other: {
		"msvalidate.01": "A8C503B4FF428B289DA437C18B34BBE3",
	},
};

export const viewport: Viewport = {
	themeColor: "#401CD8",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta content="Ziron Media" name="apple-mobile-web-app-title" />
				<Script
					data-website-id={
						process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
						"469aba3d-49c8-4e9e-9732-396c34a105da"
					}
					defer
					src={
						process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ??
						"https://analytics.alliedgulf.me/script.js"
					}
				/>
			</head>
			<Providers>
				<body
					className={cn(
						"antialiased",
						inter.variable,
						interTight.className,
						mono.variable
					)}
				>
					{/* <div className="container pointer-events-none fixed inset-0 z-50 flex h-full justify-between px-20">
						<div className="flex w-full justify-between">
							<div className="h-full w-px bg-border/80" />
							<div className="h-full w-px bg-border/80" />
						</div>
					</div> */}
					<Navbar />

					{children}
					<Suspense>
						<Video />
					</Suspense>
					<Footer />
					<BreakpointIndicator />
				</body>
			</Providers>
		</html>
	);
}
