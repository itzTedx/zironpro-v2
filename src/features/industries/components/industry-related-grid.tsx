import Link from "next/link";
import type { Route } from "next";

import { Header } from "@/components/shared/header";

import {
	INDUSTRY_SLUGS,
	type IndustrySlug,
	formatIndustryTitle,
	getIndustryContent,
} from "@/lib/industry-seo";

import { IndustryIcon } from "./industry-icon";

interface IndustryRelatedGridProps {
	currentSlug: IndustrySlug;
}

export function IndustryRelatedGrid({ currentSlug }: IndustryRelatedGridProps) {
	const others = INDUSTRY_SLUGS.filter((s) => s !== currentSlug).slice(0, 6);

	return (
		<section className="dashed dashed-y">
			<Header
				description="We work across a wide range of sectors."
				title="Other Industries"
			/>
			<div className="dashed dashed-x container mx-auto max-w-7xl">
				<div className="grid gap-4 px-6 py-12 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
					{others.map((slug) => {
						const content = getIndustryContent(slug);
						const icon = content?.frontmatter.icon ?? "Building2";
						const label =
							content?.frontmatter.heroBadge ?? formatIndustryTitle(slug);

						return (
							<Link
								className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-brand-50"
								href={`/industry/${slug}` as Route}
								key={slug}
							>
								<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
									<IndustryIcon className="size-5" name={icon} />
								</div>
								<span className="font-medium text-primary text-sm">
									{label}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
