import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/globals.css";

import { GoogleTagManager } from "@next/third-parties/google";

import { BreakpointIndicator } from "@/components/layout/breakpoint-indicator";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsappPopover } from "@/components/layout/whatsapp";
import { Providers } from "@/components/providers";
import { AiChatWidget } from "@/components/shared/ai-chat-widget";

import { inter, interTight, mono } from "@/assets/fonts";

import { siteConfig } from "@/data/site-config";
import { GOOGLE_TAG_MANAGER_CONTAINER_ID } from "@/data/site-tracking";
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
	alternates: {
		...baseMetadata.alternates,
		types: {
			"application/rss+xml": new URL("/rss.xml", siteConfig.url).href,
		},
	},
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
				<meta content="Ziron Pro" name="apple-mobile-web-app-title" />
			</head>
			<body
				className={cn(
					"antialiased",
					inter.variable,
					interTight.className,
					mono.variable
				)}
			>
				<Providers>
					<GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_CONTAINER_ID} />
					<Navbar />

					{children}

					<WhatsappPopover />
					<AiChatWidget />
					<Footer />
					<BreakpointIndicator />

					{/* JSON-LD schemas */}
					<Script id="schema-organization" type="application/ld+json">
						{JSON.stringify(organizationSchema)}
					</Script>
					<Script id="schema-website" type="application/ld+json">
						{JSON.stringify(websiteSchema)}
					</Script>
					<Script id="schema-local-business" type="application/ld+json">
						{JSON.stringify(localBusinessSchema)}
					</Script>
				</Providers>
			</body>
		</html>
	);
}
