import Link from "next/link";
import type { Route } from "next";

import { Noise } from "@/components/shared/noise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { IndustryMdxFrontmatter } from "@/lib/industry-seo";

import { IndustryIcon } from "./industry-icon";
import { IndustryLeadDialog } from "./industry-lead-dialog";

interface IndustryHeroProps {
	frontmatter: IndustryMdxFrontmatter;
	industrySlug: string;
}

export function IndustryHero({ frontmatter, industrySlug }: IndustryHeroProps) {
	return (
		<section className="relative bg-[radial-gradient(ellipse_400%_240%_at_50%_100%,#fff,#fff_10%,15%,#c7c5fd_16%,rgba(154,103,250,.6)_17%,21%,#264cab_28%,35%,#00031d_45%,#00031d)]">
			<Noise className="opacity-20" />
			<div className="dashed dashed-x relative mx-auto max-w-7xl">
				<div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 md:px-0 lg:py-20">
					<Badge className="gap-2">
						<IndustryIcon className="size-4" name={frontmatter.icon} />
						<h1 className="tracking-wide">
							{frontmatter.heroBadge ?? frontmatter.title}
						</h1>
					</Badge>
					<h2 className="text-center font-black font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] uppercase md:text-6xl lg:text-7xl">
						{frontmatter.heroHeading}
					</h2>
					<p className="text-balance text-center font-medium text-muted leading-relaxed sm:text-lg md:text-xl">
						{frontmatter.heroSubheading}
					</p>

					<div className="relative z-99 flex w-full items-center gap-4 md:w-auto">
						<IndustryLeadDialog
							ctaLabel={frontmatter.heroCtaLabel}
							industrySlug={industrySlug}
							industryTitle={frontmatter.title}
							modalDescription={frontmatter.leadModalDescription}
							modalTitle={frontmatter.leadModalTitle}
						/>
						{frontmatter.heroCtaSecondaryLabel &&
							frontmatter.heroCtaSecondaryHref && (
								<Button
									className="group text-card hover:text-brand-900"
									data-label="Industry - Explore services"
									data-location="industry_hero"
									data-track="cta_click"
									render={
										<Link href={frontmatter.heroCtaSecondaryHref as Route} />
									}
									size="xl"
									variant="outline"
								>
									<span>{frontmatter.heroCtaSecondaryLabel}</span>
								</Button>
							)}
					</div>
				</div>
			</div>
		</section>
	);
}
