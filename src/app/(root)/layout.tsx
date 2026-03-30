import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/globals.css";

import { Suspense } from "react";

import { BreakpointIndicator } from "@/components/layout/breakpoint-indicator";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsappPopover } from "@/components/layout/whatsapp";
import { Providers } from "@/components/providers";
import { AiChatWidget } from "@/components/shared/ai-chat-widget";

import { inter, interTight, mono } from "@/assets/fonts";

import { siteConfig } from "@/data/site-config";
import { Video } from "@/features/views/home/video";
import {
	buildLocalBusinessSchema,
	buildOrganizationSchema,
	buildWebsiteSchema,
	createPageMetadata,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

const baseMetadata = createPageMetadata({
	title: siteConfig.title,
	description: siteConfig.description,
	path: "/",
	keywords: [...siteConfig.keywords],
});

export const metadata: Metadata = {
	...baseMetadata,
	authors: [{ name: siteConfig.shortName, url: siteConfig.url }],
	creator: siteConfig.shortName,
	robots: {
		"max-image-preview": "large",
		"max-snippet": -1,
	},
	metadataBase: new URL(siteConfig.url),
	verification: {
		google: "dzIViUIENzLsewEaXsHL9bvl5Is7CucMXMDlZT92HEI",
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
	const organizationSchema = buildOrganizationSchema();
	const websiteSchema = buildWebsiteSchema();
	const localBusinessSchema = buildLocalBusinessSchema();

	return (
		<html lang="en">
			<head>
				<meta content="Ziron Media" name="apple-mobile-web-app-title" />
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
					<Navbar />
					<WhatsappPopover />
					{children}
					<Script id="schema-organization" type="application/ld+json">
						{JSON.stringify(organizationSchema)}
					</Script>
					<Script id="schema-website" type="application/ld+json">
						{JSON.stringify(websiteSchema)}
					</Script>
					<Script id="schema-local-business" type="application/ld+json">
						{JSON.stringify(localBusinessSchema)}
					</Script>
					<Suspense>
						<Video />
					</Suspense>
					<AiChatWidget />
					<Footer />
					<BreakpointIndicator />
				</body>
			</Providers>
		</html>
	);
}
