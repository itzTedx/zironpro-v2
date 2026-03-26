import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { buildBreadcrumbSchema, buildWebPageSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "About ZironPro Digital Agency in Dubai, UAE",
	description:
		"Learn how ZironPro helps businesses in Dubai, Abu Dhabi, and Sharjah grow through integrated branding, websites, SEO, and conversion-focused marketing.",
	path: "/about",
	keywords: ["about ZironPro", "digital agency in Dubai", "marketing company UAE"],
});

export default function AboutPage() {
	const webPageSchema = buildWebPageSchema(
		"About ZironPro Digital Agency in Dubai, UAE",
		"Learn how ZironPro helps businesses in Dubai, Abu Dhabi, and Sharjah grow through integrated branding, websites, SEO, and conversion-focused marketing.",
		"/about"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
	]);

	return (
		<main className="container max-w-7xl space-y-8 py-12 md:py-16">
			<Script id="schema-about-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-about-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<header className="max-w-4xl space-y-4">
				<h1 className="font-display font-semibold text-4xl text-primary md:text-6xl">
					About ZironPro
				</h1>
				<p className="text-lg text-muted-foreground md:text-xl">
					We are a Dubai-based digital agency helping brands across the UAE turn
					attention into measurable growth.
				</p>
			</header>
			<section className="grid gap-6 md:grid-cols-2">
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">What we do</h2>
					<p className="text-muted-foreground">
						Our team combines strategy, design, development, and marketing to
						build high-performing digital experiences for businesses in Abu Dhabi,
						Dubai, and Sharjah.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">How we work</h2>
					<p className="text-muted-foreground">
						Every project starts with clear goals and ends with conversion-ready
						execution. Explore our <Link className="text-primary underline" href="/services">services</Link> or{" "}
						<Link className="text-primary underline" href="/contact">contact us</Link> to
						start.
					</p>
				</div>
			</section>
		</main>
	);
}
