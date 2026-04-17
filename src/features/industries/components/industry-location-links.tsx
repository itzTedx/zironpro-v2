import Link from "next/link";
import type { Route } from "next";

import { MapPin } from "lucide-react";

import { formatLocation, type LocationSlug } from "@/lib/location-seo";

interface IndustryLocationLinksProps {
	industryTitle: string;
	locations: string[];
}

export function IndustryLocationLinks({
	industryTitle,
	locations,
}: IndustryLocationLinksProps) {
	if (!locations.length) return null;

	return (
		<section className="dashed dashed-y">
			<div className="dashed dashed-x container mx-auto max-w-7xl">
				<div className="flex flex-wrap items-center justify-center gap-4 px-6 py-8 md:px-0">
					<p className="font-medium text-muted-foreground text-sm">
						See our work across the UAE:
					</p>
					{locations.map((loc) => (
						<Link
							className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 font-medium text-primary text-sm transition-colors hover:bg-brand-50 hover:text-brand-700"
							href={`/${loc}` as Route}
							key={loc}
						>
							<MapPin className="size-3.5" />
							{industryTitle} in {formatLocation(loc as LocationSlug)}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
