import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/shared/header";

import { IndustryCapabilityGrid } from "@/features/industries/components/industry-capability-grid";
import { IndustryFaq } from "@/features/industries/components/industry-faq";
import { IndustryHero } from "@/features/industries/components/industry-hero";
import { IndustryLeadSection } from "@/features/industries/components/industry-lead-section";
import { IndustryLocationLinks } from "@/features/industries/components/industry-location-links";
import { IndustryMdxBody } from "@/features/industries/components/industry-mdx-body";
import { IndustryRelatedGrid } from "@/features/industries/components/industry-related-grid";
import { IndustrySocialProof } from "@/features/industries/components/industry-social-proof";
import { IndustryTailoredServices } from "@/features/industries/components/industry-tailored-services";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import {
	INDUSTRY_SLUGS,
	type IndustrySlug,
	getIndustryContent,
	isIndustrySlug,
} from "@/lib/industry-seo";
import {
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildServiceSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
	return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ industry: string }>;
}): Promise<Metadata> {
	const { industry } = await params;
	if (!isIndustrySlug(industry)) return { title: "Page Not Found" };

	const content = getIndustryContent(industry);
	if (!content) return { title: "Page Not Found" };

	const { frontmatter } = content;

	return createPageMetadata({
		title: frontmatter.title,
		description: frontmatter.description,
		path: `/industry/${industry}`,
		keywords: frontmatter.keywords ?? [],
		image: frontmatter.ogImage,
	});
}

export default async function IndustryDetailPage({
	params,
}: {
	params: Promise<{ industry: string }>;
}) {
	const { industry } = await params;
	if (!isIndustrySlug(industry)) return notFound();

	const content = getIndustryContent(industry);
	if (!content) return notFound();

	const { frontmatter } = content;
	const slug = industry as IndustrySlug;

	const canonicalPath = `/industry/${slug}`;

	const webPageSchema = buildWebPageSchema(
		frontmatter.title,
		frontmatter.description,
		canonicalPath
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Industries", path: "/industry" },
		{ name: frontmatter.heroBadge ?? frontmatter.title, path: canonicalPath },
	]);
	const serviceSchema = buildServiceSchema({
		name: `${frontmatter.heroBadge ?? frontmatter.title} Marketing Services`,
		description: frontmatter.description,
		path: canonicalPath,
		image: frontmatter.ogImage,
		serviceType: "Digital Marketing",
		areaServed: "United Arab Emirates",
	});
	const faqSchema =
		frontmatter.faq?.length > 0 ? buildFaqSchema(frontmatter.faq) : null;

	return (
		<main>
			<JsonLdScript data={webPageSchema} id="schema-industry-webpage" />
			<JsonLdScript data={breadcrumbSchema} id="schema-industry-breadcrumb" />
			<JsonLdScript data={serviceSchema} id="schema-industry-service" />
			{faqSchema && <JsonLdScript data={faqSchema} id="schema-industry-faq" />}

			<IndustryHero frontmatter={frontmatter} industrySlug={slug} />

			<IndustryMdxBody source={content.content} />

			<IndustryTailoredServices
				industryTitle={frontmatter.heroBadge ?? frontmatter.title}
				services={frontmatter.tailoredServices}
			/>

			{frontmatter.socialProof && (
				<IndustrySocialProof data={frontmatter.socialProof} />
			)}

			<IndustryCapabilityGrid capabilities={frontmatter.capabilities} />

			{frontmatter.relatedLocations &&
				frontmatter.relatedLocations.length > 0 && (
					<IndustryLocationLinks
						industryTitle={frontmatter.heroBadge ?? frontmatter.title}
						locations={frontmatter.relatedLocations}
					/>
				)}

			{frontmatter.faq?.length > 0 && (
				<section className="dashed dashed-y">
					<Header
						description="Common questions about our approach to this industry."
						title="Frequently Asked Questions"
					/>
					<div className="dashed dashed-x container mx-auto max-w-7xl">
						<div className="mx-auto max-w-3xl px-6 py-12 md:px-0">
							<IndustryFaq items={frontmatter.faq} />
						</div>
					</div>
				</section>
			)}

			<IndustryRelatedGrid currentSlug={slug} />

			<IndustryLeadSection
				industrySlug={slug}
				industryTitle={frontmatter.heroBadge ?? frontmatter.title}
			/>
		</main>
	);
}
