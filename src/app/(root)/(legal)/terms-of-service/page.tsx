import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Terms of Service | ZironPro Dubai, UAE",
	description:
		"Read ZironPro terms of service for website, branding, and marketing engagements across Dubai, Abu Dhabi, Sharjah, and the UAE.",
	path: "/terms-of-service",
	keywords: ["terms of service UAE", "agency terms Dubai", "ZironPro terms"],
});

export default function TermsOfServicePage() {
	const webPageSchema = buildWebPageSchema(
		"Terms of Service | ZironPro Dubai, UAE",
		"Read ZironPro terms of service for website, branding, and marketing engagements across Dubai, Abu Dhabi, Sharjah, and the UAE.",
		"/terms-of-service"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Terms of Service", path: "/terms-of-service" },
	]);

	return (
		<main className="container max-w-4xl space-y-8 py-12 md:py-16">
			<Script id="schema-terms-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-terms-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<header className="space-y-3">
				<h1 className="font-display font-semibold text-4xl text-primary md:text-5xl">
					Terms of Service
				</h1>
				<p className="text-muted-foreground">
					These terms describe how we deliver branding, website, and marketing
					services for UAE-based clients.
				</p>
			</header>
			<section className="space-y-4 text-muted-foreground">
				<h2 className="font-medium text-2xl text-primary">Service scope</h2>
				<p>
					Project scope, milestones, and delivery timelines are agreed in
					writing before work begins.
				</p>
				<h2 className="font-medium text-2xl text-primary">
					Payment and approvals
				</h2>
				<p>
					Payments, revisions, and approvals follow your signed proposal and
					project agreement.
				</p>
				<p>
					For clarifications, please{" "}
					<Link className="text-primary underline" href="/contact">
						contact us
					</Link>
					.
				</p>
			</section>
		</main>
	);
}
