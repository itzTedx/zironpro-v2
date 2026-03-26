import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { buildBreadcrumbSchema, buildWebPageSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Privacy Policy | ZironPro Dubai, UAE",
	description:
		"Read the ZironPro privacy policy for how we collect, use, and protect client data for marketing and website projects in Dubai and across the UAE.",
	path: "/privacy-policy",
	keywords: ["privacy policy agency UAE", "data policy Dubai", "ZironPro privacy"],
});

export default function PrivacyPage() {
	const webPageSchema = buildWebPageSchema(
		"Privacy Policy | ZironPro Dubai, UAE",
		"Read the ZironPro privacy policy for how we collect, use, and protect client data for marketing and website projects in Dubai and across the UAE.",
		"/privacy-policy"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Privacy Policy", path: "/privacy-policy" },
	]);

	return (
		<main className="container max-w-4xl space-y-8 py-12 md:py-16">
			<Script id="schema-privacy-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-privacy-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<header className="space-y-3">
				<h1 className="font-display font-semibold text-4xl text-primary md:text-5xl">
					Privacy Policy
				</h1>
				<p className="text-muted-foreground">
					We respect your privacy and handle personal information with care when
					you use our website or contact us for services in the UAE.
				</p>
			</header>
			<section className="space-y-4 text-muted-foreground">
				<h2 className="font-medium text-2xl text-primary">Data we collect</h2>
				<p>
					We collect only the information needed to respond to inquiries, deliver
					projects, and improve website performance.
				</p>
				<h2 className="font-medium text-2xl text-primary">How we use data</h2>
				<p>
					Data is used for communication, analytics, and service delivery. We do
					not sell personal data.
				</p>
				<p>
					Questions? Visit <Link className="text-primary underline" href="/contact">contact</Link>.
				</p>
			</section>
		</main>
	);
}
