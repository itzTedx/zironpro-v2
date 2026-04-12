import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

import { IconWorld } from "@/assets/icons/world";

import { FAQS, FaqItemData } from "@/data/faqs";
import { siteConfig } from "@/data/site-config";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import { FaqContent, FaqItem } from "@/features/services/components/faq";
import {
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

function buildFaqPageSchema(items: FaqItemData[]) {
	return buildFaqSchema(items);
}

export async function generateMetadata(): Promise<Metadata> {
	return createPageMetadata({
		title: `SEO FAQ in Dubai, UAE | ${siteConfig.shortName}`,
		description:
			"Get clear answers on SEO, AEO, and technical web performance for businesses in Dubai, Abu Dhabi, Sharjah, and the UAE.",
		path: "/faqs",
		keywords: [
			"SEO FAQ UAE",
			"AEO answers Dubai",
			"technical SEO Abu Dhabi",
			"web performance Sharjah",
		],
	});
}

export default async function FaqsPage() {
	const webPageSchema = buildWebPageSchema(
		`SEO FAQ in Dubai, UAE | ${siteConfig.shortName}`,
		"Get clear answers on SEO, AEO, and technical web performance for businesses in Dubai, Abu Dhabi, Sharjah, and the UAE.",
		"/faqs"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "FAQs", path: "/faqs" },
	]);

	return (
		<main>
			<section className="relative bg-[radial-gradient(--alpha(var(--color-gray-500)/0.1)_1px,transparent_1px)] bg-gray-1400 bg-size-[16px_16px]">
				<header className="dashed dashed-x relative z-10 mx-auto max-w-7xl py-16 md:py-20">
					<div className="mx-auto max-w-5xl space-y-4 py-12 text-center">
						<Badge>
							<IconWorld className="text-brand-600" /> FAQs
						</Badge>

						<h1 className="mx-auto font-black font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] uppercase md:text-6xl lg:text-7xl">
							Frequently Asked Questions
						</h1>

						<p className="text-balance text-2xl text-muted leading-relaxed tracking-tight">
							Quick, clear answers about SEO, AEO, and growth for businesses in
							Dubai and across the UAE.
						</p>
					</div>
				</header>
			</section>

			<JsonLdScript data={webPageSchema} id="schema-faqs-webpage" />
			<JsonLdScript data={breadcrumbSchema} id="schema-faqs-breadcrumb" />

			<section className="dashed dashed-y">
				<div className="dashed-b-0 dashed container grid max-w-7xl gap-6 py-12 md:grid-cols-2 md:py-16 lg:py-20">
					{FAQS.map((category) => (
						<section
							aria-labelledby={`faq-cat-${category.slug}`}
							className="not-prose space-y-6"
							key={category.slug}
						>
							<header className="space-y-3">
								<h2
									className="font-display font-semibold text-2xl text-primary tracking-tight md:text-3xl"
									id={`faq-cat-${category.slug}`}
								>
									{category.title}
								</h2>
								<p className="max-w-3xl text-balance text-base text-muted-foreground leading-relaxed md:text-lg">
									{category.description}
								</p>
							</header>

							<JsonLdScript
								data={buildFaqPageSchema(category.items)}
								id={`faqpage-schema-${category.slug}`}
							/>

							<FaqItem>
								{category.items.map((item) => (
									<FaqContent key={item.question} title={item.question}>
										{item.answer}
									</FaqContent>
								))}
							</FaqItem>
						</section>
					))}
				</div>
			</section>
		</main>
	);
}
