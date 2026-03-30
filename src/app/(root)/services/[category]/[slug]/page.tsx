import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import fs from "fs";
import path from "path";

import MDXContent from "@/components/markdown/mdx-component";
import { Noise } from "@/components/shared/noise";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { getServiceBySlug } from "@/features/services/actions/query";
import { Card } from "@/features/services/components/card";
import { Faq, FaqContent } from "@/features/services/components/faq";
import { ImageGalley } from "@/features/services/components/image-gallery";
import { LogoVariants } from "@/features/services/components/logo-variants";
import { Group, Section } from "@/features/services/components/section";
import { Cta } from "@/features/views/cta";
import {
	buildAggregateRatingSchema,
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildServiceSchema,
	buildWebPageSchema,
	createPageMetadata,
	makeUaeTitle,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
	const contentDir = path.join(process.cwd(), "src/content/services");
	const categories = fs.readdirSync(contentDir);

	const params: { category: string; slug: string }[] = [];

	categories.forEach((category) => {
		const files = fs.readdirSync(path.join(contentDir, category));
		files.map((file) => {
			params.push({
				category,
				slug: file.replace(".mdx", ""),
			});
		});
	});

	return params;
}

export async function generateMetadata({
	params,
}: PageProps<"/services/[category]/[slug]">): Promise<Metadata> {
	const { category, slug } = await params;
	const service = getServiceBySlug(category, slug);

	if (!service) {
		return {
			title: "Service Not Found",
		};
	}

	const metaTitle = service.metadata.meta?.title;
	const metaDescription = service.metadata.meta?.description;

	const title = metaTitle ?? makeUaeTitle(service.metadata.title, "Abu Dhabi");
	const description =
		(metaDescription ?? service.metadata.description) +
		" Delivered for businesses in Dubai, Abu Dhabi, Sharjah, and across the UAE.";
	const canonicalPath = `/services/${category}/${slug}`;

	return createPageMetadata({
		title,
		description,
		path: canonicalPath,
		image: service.metadata.image,
		keywords: [
			`${service.metadata.title.toLowerCase()} in Abu Dhabi`,
			`${service.metadata.title.toLowerCase()} in Dubai`,
			`${service.metadata.title.toLowerCase()} UAE`,
		],
	});
}

export default async function ServicePage({
	params,
}: PageProps<"/services/[category]/[slug]">) {
	const { category, slug } = await params;
	const service = getServiceBySlug(category, slug);

	if (!service) return notFound();
	const canonicalPath = `/services/${category}/${slug}`;
	const webPageSchema = buildWebPageSchema(
		makeUaeTitle(service.metadata.title, "Abu Dhabi"),
		`${service.metadata.description} Delivered for businesses in Dubai, Abu Dhabi, Sharjah, and across the UAE.`,
		canonicalPath
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Services", path: "/services" },
		{ name: category, path: `/services/${category}` },
		{ name: service.metadata.title, path: canonicalPath },
	]);
	const aggregateRatingSchema = buildAggregateRatingSchema(
		service.metadata.title,
		canonicalPath,
		4.9,
		24
	);
	const serviceSchema = buildServiceSchema({
		name: service.metadata.title,
		description: service.metadata.description,
		path: canonicalPath,
		image: service.metadata.image,
		serviceType: service.metadata.category,
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: 4.9,
			ratingCount: 24,
		},
	});
	const hasFaq = service.content.includes("FaqContent");
	const faqSchema = hasFaq
		? buildFaqSchema([
				{
					question: `What is included in ${service.metadata.title}?`,
					answer: service.metadata.description,
				},
			])
		: null;

	return (
		<main>
			<Script id="schema-service-detail-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-service-detail-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<Script id="schema-service-detail-service" type="application/ld+json">
				{JSON.stringify(serviceSchema)}
			</Script>
			<Script id="schema-service-detail-rating" type="application/ld+json">
				{JSON.stringify(aggregateRatingSchema)}
			</Script>
			{faqSchema ? (
				<Script id="schema-service-detail-faq" type="application/ld+json">
					{JSON.stringify(faqSchema)}
				</Script>
			) : null}
			<header className="dashed dashed-b relative w-full">
				<div className="md:dashed dashed-x container relative z-20 flex h-full max-w-7xl flex-col justify-end space-y-4 pt-12 pb-20">
					<div className="mx-auto max-w-5xl space-y-4">
						<h1 className="font-semibold text-4xl text-primary tracking-tighter sm:text-5xl md:text-6xl lg:text-8xl">
							{service.metadata.title}
						</h1>
						<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
							<p className="text-balance font-medium text-lg text-muted-foreground md:text-xl">
								{service.metadata.description}
							</p>
							<div>
								<Button
									className="w-48 justify-between"
									data-label="Service page - Get started"
									data-location="service_detail_hero"
									data-track="cta_click"
									render={<Link href="/contact" />}
									size="lg"
								>
									Get started
									<IconArrowRightTag className="size-5" />
								</Button>
							</div>
						</div>
					</div>
					<div className="relative mt-9 aspect-video overflow-hidden rounded-3xl">
						<Image
							alt={`${service.metadata.title} service hero by Ziron Media`}
							className="pointer-events-none object-cover"
							fill
							priority
							sizes="(max-width: 1280px) 100vw, 1280px"
							src={service.metadata.image}
						/>
					</div>
				</div>
				<div className="absolute inset-x-0 bottom-0 z-10 mb-px h-3/4 bg-linear-to-t from-card" />
				<div className="absolute inset-x-0 top-0 z-10 h-3/4 bg-linear-to-b from-card" />
				<Noise />
			</header>

			<article className="prose prose-stone [&>div]:dashed [&>div]:dashed-x prose-xl max-w-none prose-a:text-primary prose-a:underline [&>div]:container [&>div]:max-w-7xl [&>div]:py-12">
				<MDXContent
					components={{
						h1: (props) => (
							<h2 className="font-semibold text-3xl text-primary" {...props} />
						),
						a: (props) => (
							<Link
								{...props}
								className={cn(
									"group no-underline! relative items-center",
									"before:pointer-events-none before:absolute before:top-[1.3em] before:left-0 before:h-[0.072em] before:w-full before:bg-current before:content-['']",
									"before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
									"hover:before:origin-left hover:before:scale-x-100"
								)}
							/>
						),
						hr: (props) => (
							<hr className="dashed border-transparent" {...props} />
						),
						Cta,
						Faq,
						FaqContent,
						Image: (props) => (
							<Image
								height={1000}
								width={1000}
								{...props}
								className={cn(
									"rounded-2xl transition-transform hover:-translate-y-2",
									props.className
								)}
							/>
						),
						Card,
						Group,
						ImageGalley,
						LogoVariants,
						Section,
					}}
					source={service.content}
				/>
			</article>
		</main>
	);
}
