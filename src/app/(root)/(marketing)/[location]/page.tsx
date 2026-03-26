import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import MDXContent from "@/components/markdown/mdx-component";

import { Breadcrumbs } from "@/features/locations/components/breadcrumbs";
import { CTASection } from "@/features/locations/components/cta-section";
import { FAQSection } from "@/features/locations/components/faq-section";
import { LocationHero } from "@/features/locations/components/location-hero";
import {
	formatLocation,
	formatService,
	getLocationContent,
	isLocationSlug,
	LOCATION_SLUGS,
	SERVICE_SLUGS,
} from "@/lib/location-seo";
import {
	buildBreadcrumbSchema,
	createPageMetadata,
	getBaseUrl,
} from "@/lib/seo";

export function generateStaticParams() {
	return LOCATION_SLUGS.map((location) => ({ location }));
}

export async function generateMetadata({
	params,
}: PageProps<"/[location]">): Promise<Metadata> {
	const { location } = await params;
	if (!isLocationSlug(location)) return { title: "Page Not Found" };

	const locationContent = getLocationContent(location);
	const formattedLocation = formatLocation(location);
	const title =
		locationContent?.frontmatter.title ?? `${formattedLocation} | ZironPro`;
	const description =
		locationContent?.frontmatter.description ??
		`Explore professional digital services for businesses in ${formattedLocation}.`;

	return createPageMetadata({
		title,
		description,
		path: `/${location}`,
		keywords: locationContent?.frontmatter.keywords ?? [
			`${formattedLocation} digital marketing`,
			`${formattedLocation} web design`,
		],
		image: locationContent?.frontmatter.ogImage,
	});
}

export default async function LocationPage({
	params,
}: PageProps<"/[location]">) {
	const { location } = await params;
	if (!isLocationSlug(location)) return notFound();

	const formattedLocation = formatLocation(location);
	const locationContent = getLocationContent(location);
	const breadcrumbItems = [
		{ name: "Home", path: "/" },
		{ name: formattedLocation, path: `/${location}` },
	];
	const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
	const localBusinessSchema = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "ZironPro",
		url: `${getBaseUrl()}/${location}`,
		areaServed: formattedLocation,
	};

	return (
		<main>
			<Script id="schema-location-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<Script id="schema-location-business" type="application/ld+json">
				{JSON.stringify(localBusinessSchema)}
			</Script>

			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: formattedLocation, href: `/${location}` as Route },
				]}
			/>

			<LocationHero
				description={
					locationContent?.frontmatter.description ??
					`High-performance marketing, branding, and web solutions in ${formattedLocation}.`
				}
				location={formattedLocation}
				title={
					locationContent?.frontmatter.title ??
					`Services in ${formattedLocation}`
				}
			/>

			{locationContent ? (
				<article className="prose prose-stone container max-w-5xl py-10 prose-a:text-primary">
					<MDXContent source={locationContent.content} />
				</article>
			) : (
				<section className="container max-w-5xl py-10">
					<p className="text-muted-foreground">
						Content for this location is coming soon. You can still explore
						available services below.
					</p>
				</section>
			)}

			<section className="dashed dashed-y">
				<div className="container max-w-7xl py-10">
					<h2 className="font-semibold text-2xl text-primary">
						Services in {formattedLocation}
					</h2>
					<ul className="mt-4 grid gap-3 md:grid-cols-3">
						{SERVICE_SLUGS.map((service) => (
							<li key={service}>
								<Link
									className="block rounded-lg border p-4 transition-colors hover:bg-card"
									href={`/${service}/${location}` as Route}
								>
									{formatService(service)} in {formattedLocation}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>

			<FAQSection items={locationContent?.frontmatter.faq} />
			<CTASection />
		</main>
	);
}
