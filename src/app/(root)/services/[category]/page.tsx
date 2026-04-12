import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
	PreviewLinkCard,
	PreviewLinkCardImage,
	PreviewLinkCardPopup,
	PreviewLinkCardPortal,
	PreviewLinkCardPositioner,
	PreviewLinkCardTrigger,
} from "@/components/primitives/preview-link-card";
import { Noise } from "@/components/shared/noise";
import { Button } from "@/components/ui/button";

import { IconArrowLeft, IconArrowRightTag } from "@/assets/icons/arrow";

import { siteConfig } from "@/data/site-config";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import { findServiceBySlug } from "@/features/services/actions/query";
import { SERVICES } from "@/features/services/constant";
import { Cta } from "@/features/views/cta";
import {
	buildBreadcrumbSchema,
	buildServiceSchema,
	buildWebPageSchema,
	createPageMetadata,
	makeUaeTitle,
} from "@/lib/seo";

type PageProps = {
	params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
	return SERVICES.map((service) => ({
		category: service.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { category } = await params;
	const service = findServiceBySlug(category);

	if (!service) {
		return {
			title: "Service Not Found",
		};
	}

	const title = `${service.title} - ${siteConfig.shortName}`;
	const description = `${service.description} We serve businesses in Dubai, Abu Dhabi, Sharjah, and across the UAE.`;

	return createPageMetadata({
		title: makeUaeTitle(service.title, "Dubai") || title,
		description,
		path: `/services/${service.slug}`,
		image: service.image,
		keywords: [
			`${service.title.toLowerCase()} in Dubai`,
			`${service.title.toLowerCase()} in Abu Dhabi`,
			`${service.title.toLowerCase()} UAE`,
		],
	});
}

export default async function ServiceCategoryPage({ params }: PageProps) {
	const { category } = await params;
	const service = findServiceBySlug(category);

	if (!service) {
		notFound();
	}
	const canonicalPath = `/services/${service.slug}`;
	const webPageSchema = buildWebPageSchema(
		makeUaeTitle(service.title, "Dubai"),
		`${service.description} We serve businesses in Dubai, Abu Dhabi, Sharjah, and across the UAE.`,
		canonicalPath
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Services", path: "/services" },
		{ name: service.title, path: canonicalPath },
	]);
	const serviceSchema = buildServiceSchema({
		name: service.title,
		description: service.description,
		path: canonicalPath,
		image: service.image,
		serviceType: service.title,
	});

	return (
		<main>
			<JsonLdScript data={webPageSchema} id="schema-service-category-webpage" />
			<JsonLdScript
				data={breadcrumbSchema}
				id="schema-service-category-breadcrumb"
			/>
			<JsonLdScript data={serviceSchema} id="schema-service-category-service" />
			<section className="dashed dashed-b relative">
				<header className="dashed dashed-x relative z-10 mx-auto max-w-7xl py-12 md:py-16 md:pt-24">
					<div className="container grid grid-cols-2 gap-6">
						<div>
							<Button
								className="flex w-fit gap-2"
								data-label="Services category - Back to services"
								data-location="services_category_header"
								data-track="cta_click"
								render={<Link href="/services" />}
								variant="ghost"
							>
								<IconArrowLeft
									aria-hidden="true"
									className="transition-transform group-hover/button:-translate-x-1"
								/>
								Back to Services
							</Button>

							<h1 className="max-w-5xl font-bold font-display text-4xl text-primary uppercase md:text-6xl lg:text-8xl">
								{service.title}
							</h1>
							<p className="max-w-5xl text-balance text-2xl text-muted-foreground leading-relaxed tracking-tight">
								{service.description}
							</p>
						</div>
						<div className="relative aspect-5/3 overflow-hidden rounded-xl">
							<Noise />
							<Image
								alt={`${service.title} service cover by Ziron pro`}
								className="object-cover"
								fill
								priority
								sizes="(max-width: 768px) 100vw, 50vw"
								src={service.image}
							/>
						</div>
					</div>
				</header>
			</section>

			<section className="bg-card">
				<div className="dashed dashed-x container max-w-7xl">
					<div className="dashed dashed-x mx-auto max-w-5xl space-y-12 py-24">
						<div className="space-y-8">
							<div className="px-12">
								<h2 className="font-semibold text-3xl text-primary md:text-4xl">
									What we offer
								</h2>
								<p className="pt-2 text-lg text-muted-foreground">
									Explore our comprehensive range of{" "}
									{service.title.toLowerCase()} solutions designed to elevate
									your brand and drive results.
								</p>
							</div>

							<ul className="space-y-4">
								{service.lists.map((list, index) => (
									<li
										className="group dashed dashed-b px-12 pb-4 transition-colors last:border-0 hover:border-primary"
										key={list.title}
									>
										<PreviewLinkCard
											followCursor="x"
											href={`/services/${service.slug}/${list.slug}` as Route}
											src={list.image}
										>
											<div className="flex items-center justify-between gap-4">
												<div className="flex items-center gap-4">
													<span className="font-bold text-2xl text-muted-foreground">
														{String(index + 1).padStart(2, "0")}
													</span>
													<PreviewLinkCardTrigger delay={100}>
														<h3 className="font-medium text-xl transition-colors group-hover:text-primary md:text-2xl">
															{list.title}
														</h3>
													</PreviewLinkCardTrigger>
												</div>
												<IconArrowRightTag className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
											</div>
											<PreviewLinkCardPortal>
												<PreviewLinkCardPositioner side="inline-end">
													<PreviewLinkCardPopup
														className="overflow-hidden rounded-xl"
														href={
															`/services/${service.slug}/${list.slug}` as Route
														}
													>
														<PreviewLinkCardImage
															alt={`Service preview card for ${list.title} by Ziron pro`}
														/>
													</PreviewLinkCardPopup>
												</PreviewLinkCardPositioner>
											</PreviewLinkCardPortal>
										</PreviewLinkCard>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<Cta />
		</main>
	);
}
