import type { Metadata } from "next";
import Script from "next/script";

import { Badge } from "@/components/ui/badge";

import { IconWorld } from "@/assets/icons/world";

import { siteConfig } from "@/data/site-config";
import { FaqContent, FaqItem } from "@/features/services/components/faq";
import {
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

type FaqItemData = {
	question: string;
	answer: string;
};

type FaqCategory = {
	slug: string;
	title: string;
	description: string;
	items: FaqItemData[];
};

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

	const faqCategories: FaqCategory[] = [
		{
			slug: "seo",
			title: "SEO & Ranking",
			description:
				"Practical answers about SEO strategy, execution, and measurable outcomes for businesses in Dubai.",
			items: [
				{
					question: "What is SEO for a business in Dubai?",
					answer:
						"SEO is the process of improving your website so search engines can crawl, understand, and rank your pages for queries that match your customers’ intent—so you attract qualified traffic and convert more leads.",
				},
				{
					question: "How long does it take to see SEO results?",
					answer:
						"Most SEO efforts start showing measurable improvements within a few months, but competitive industries (and new sites) can take longer. We focus on real progress like rankings, clicks, and conversion impact.",
				},
				{
					question: "What’s included in your SEO process?",
					answer:
						"We start with an audit, align pages to search intent, and then handle technical SEO, on-page optimization, and content improvements. The goal is to build trust with search engines while keeping the page useful for visitors.",
				},
				{
					question: "How do you choose keywords and search intent?",
					answer:
						"We map keywords to the exact questions your audience asks, then prioritize opportunities based on relevance and the likelihood that the traffic will convert into leads or sales.",
				},
				{
					question: "Do you optimize on-page SEO like titles and headings?",
					answer:
						"Yes. We refine metadata, heading structure, internal linking, and page copy so your pages are clear, skimmable, and aligned with both user intent and search engine signals.",
				},
			],
		},
		{
			slug: "aeo",
			title: "AEO (Answer Engine Optimization)",
			description:
				"How we structure content to win direct answers—ideal for featured snippets and answer-based results.",
			items: [
				{
					question: "What is Answer Engine Optimization (AEO)?",
					answer:
						"AEO is the practice of structuring content so answer engines can quickly find the clearest response to a user’s question. Q&A formatting helps you deliver direct, scannable answers.",
				},
				{
					question: "How is AEO different from traditional SEO?",
					answer:
						"SEO focuses on ranking pages for keywords, while AEO focuses on being the best source for a direct answer. AEO relies on intent-aligned headings, concise responses, and helpful structure (including schema).",
				},
				{
					question: "How do answer engines pick the “best” direct answer?",
					answer:
						"They look for clear context, strong relevance to the question, and content structure that makes the answer easy to extract. We design pages around questions, headings, and high-signal answers.",
				},
				{
					question: "Should I publish FAQ content for AEO?",
					answer:
						"Yes, when it’s based on real user questions. FAQ pages improve skimming, match how people search (how/what/why), and can support rich results when implemented with the right structure.",
				},
				{
					question: "Do you use schema markup for AEO and SEO?",
					answer:
						"Yes. We use schema that matches your content (like FAQPage). We also include geo-relevant structured data so search engines understand your business and service location.",
				},
			],
		},
		{
			slug: "technical",
			title: "Technical SEO & Web Performance",
			description:
				"Mobile-first, fast, and crawlable websites—built to support rankings and conversions.",
			items: [
				{
					question: "Can you improve technical SEO for Next.js websites?",
					answer:
						"Yes. We ensure pages are crawlable, fast, and correctly structured—covering metadata, internal linking, and the technical foundations needed for long-term SEO.",
				},
				{
					question: "Do you optimize Core Web Vitals?",
					answer:
						"Yes. We focus on performance improvements that impact user experience and SEO signals, including faster loading, stable layout, and responsive interactions.",
				},
				{
					question: "Is mobile optimization included?",
					answer:
						"Yes. We design with a mobile-first approach so content is readable, navigation is straightforward, and layouts work reliably on smaller screens.",
				},
				{
					question: "Do you optimize images and metadata?",
					answer:
						"Absolutely. We optimize image usage for performance and improve metadata so search engines and social previews have accurate context.",
				},
				{
					question: "Will technical changes affect my existing rankings?",
					answer:
						"We plan changes carefully to avoid breaking pages. Our focus is on improvements that typically support crawlability, UX, and long-term ranking stability.",
				},
			],
		},
		{
			slug: "local-dubai",
			title: "Local SEO for Dubai & the UAE",
			description:
				"Geo-targeted answers for clients searching “in Dubai”—including local intent and service coverage across the UAE.",
			items: [
				{
					question: "Do you offer SEO services in Dubai and the UAE?",
					answer:
						"Yes. We are a Dubai-based digital marketing agency and we support businesses across the UAE with SEO, web design, and conversion-focused content strategies.",
				},
				{
					question: "Can you help me rank for “SEO company Dubai” searches?",
					answer:
						"Yes. We target local-intent keywords and structure pages around location-relevant questions and service details, so customers understand why you’re the right fit.",
				},
				{
					question: "Do you support multilingual SEO (English and Arabic)?",
					answer:
						"We can support multilingual SEO strategies so your content matches how local customers search. That includes planning content structure, language intent, and metadata for each version.",
				},
				{
					question: "Do you help with local trust signals and references?",
					answer:
						"Yes. We work on credibility signals such as consistent business details, structured context, and internal content that supports local relevance and user trust.",
				},
				{
					question: "How do you tailor SEO for different industries?",
					answer:
						"We map intent by industry, then prioritize pages and content that match how buyers evaluate services. This keeps the strategy focused on outcomes instead of generic traffic.",
				},
			],
		},
		{
			slug: "content-cro",
			title: "Content, CRO & Reporting",
			description:
				"More than rankings—turning SEO traffic into leads with clearer page structure and stronger calls to action.",
			items: [
				{
					question: "What content do you create for SEO and AEO?",
					answer:
						"We create content designed to answer real questions and move readers forward—topic research, page structure, and concise explanations aligned to user intent.",
				},
				{
					question: "How do you improve conversions, not just traffic?",
					answer:
						"We connect SEO and UX. That means clear hierarchy, strong page structure, mobile performance, and conversion-focused content so visitors can act confidently.",
				},
				{
					question: "How often do you provide SEO reporting?",
					answer:
						"Reporting is usually provided on a regular schedule (often monthly), including key metrics and insights tied to strategy progress like rankings, clicks, and conversion impact where applicable.",
				},
				{
					question: "What do you need from us to start?",
					answer:
						"We typically request access to analytics and key page information, plus your business goals and service details. Then we proceed with the audit, prioritization, and execution planning.",
				},
				{
					question: "Do you offer ongoing SEO plans or one-time projects?",
					answer:
						"Many clients choose ongoing plans so improvements compound over time. We can also scope one-time work when it makes sense, but continuous optimization is the usual path for SEO.",
				},
			],
		},
	];

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

			<Script id="schema-faqs-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-faqs-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>

			<section className="dashed dashed-y">
				<div className="dashed-b-0 dashed container grid max-w-7xl gap-6 py-12 md:grid-cols-2 md:py-16 lg:py-20">
					{faqCategories.map((category) => (
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

							<Script
								id={`faqpage-schema-${category.slug}`}
								type="application/ld+json"
							>
								{JSON.stringify(buildFaqPageSchema(category.items))}
							</Script>

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
