import Link from "next/link";
import type { Route } from "next";

import { Header } from "@/components/shared/header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { SERVICES } from "@/features/services/constant";
import type { IndustryTailoredService } from "@/lib/industry-seo";

function getServiceTitle(
	categorySlug: string,
	serviceListSlug?: string
): string {
	const category = SERVICES.find((s) => s.slug === categorySlug);
	if (!category) return categorySlug;

	if (serviceListSlug) {
		const sub = category.lists.find((l) => l.slug === serviceListSlug);
		if (sub) return sub.title;
	}
	return category.title;
}

function getServiceHref(
	categorySlug: string,
	serviceListSlug?: string
): string {
	if (serviceListSlug) {
		return `/services/${categorySlug}/${serviceListSlug}`;
	}
	return `/services/${categorySlug}`;
}

interface IndustryTailoredServicesProps {
	services: IndustryTailoredService[];
	industryTitle: string;
}

export function IndustryTailoredServices({
	services,
	industryTitle,
}: IndustryTailoredServicesProps) {
	if (!services.length) return null;

	return (
		<section className="dashed dashed-y">
			<Header
				description={`Services designed for ${industryTitle.toLowerCase()} businesses in the UAE.`}
				title="What We Deliver"
			/>
			<div className="dashed dashed-x container mx-auto max-w-7xl">
				<div className="grid gap-4 px-6 py-12 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
					{services.map((service) => {
						const title = getServiceTitle(
							service.categorySlug,
							service.serviceListSlug
						);
						const href = getServiceHref(
							service.categorySlug,
							service.serviceListSlug
						);

						return (
							<Card
								className="transition-transform hover:-translate-y-1"
								key={`${service.categorySlug}-${service.serviceListSlug ?? "root"}`}
							>
								<CardHeader>
									<CardTitle className="text-lg">{title}</CardTitle>
									<CardDescription className="text-sm">
										{service.whyForIndustry}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button
										className="group gap-1"
										data-label={`Industry - Service: ${title}`}
										data-location="industry_services"
										data-track="cta_click"
										render={<Link href={href as Route} />}
										size="sm"
										variant="ghost"
									>
										Learn more
										<IconArrowRightTag className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
