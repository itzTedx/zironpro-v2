import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";
import { IconGear } from "@/assets/icons/gear";

import { ServicesLists } from "@/features/services/components/service-list";
import {
	buildBreadcrumbSchema,
	buildServiceSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Digital Services in Abu Dhabi, Dubai, UAE | ZironPro",
	description:
		"Explore branding, websites, SEO, social media, printing, and growth services delivered by ZironPro for businesses in Dubai, Abu Dhabi, Sharjah, and the UAE.",
	path: "/services",
	keywords: [
		"digital services UAE",
		"web design services Dubai",
		"branding Abu Dhabi",
	],
});

export default function ServicesPage() {
	const webPageSchema = buildWebPageSchema(
		"Digital Services in Abu Dhabi, Dubai, UAE | ZironPro",
		"Explore branding, websites, SEO, social media, printing, and growth services delivered by ZironPro for businesses in Dubai, Abu Dhabi, Sharjah, and the UAE.",
		"/services"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Services", path: "/services" },
	]);
	const serviceSchema = buildServiceSchema({
		name: "Integrated Digital Services",
		description:
			"Branding, web design, development, SEO, and growth marketing services for UAE businesses.",
		path: "/services",
		serviceType: "Digital marketing and web services",
	});

	return (
		<main>
			<Script id="schema-services-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-services-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<Script id="schema-services-service" type="application/ld+json">
				{JSON.stringify(serviceSchema)}
			</Script>
			<section className="relative bg-[radial-gradient(--alpha(var(--color-gray-500)/0.1)_1px,transparent_1px)] bg-gray-1400 bg-size-[16px_16px]">
				<header className="dashed dashed-x relative z-10 mx-auto max-w-7xl py-16 md:py-20">
					<div className="mx-auto max-w-5xl space-y-4 py-12 text-center">
						<Badge>
							<IconGear className="text-brand-600" /> Services
						</Badge>
						<h1 className="mx-auto font-black font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] uppercase md:text-6xl lg:text-7xl">
							Delivering results is really all that matters.
						</h1>
						<p className="text-balance text-2xl text-muted leading-relaxed tracking-tight *:text-card">
							100% of what we do is focused on turning your{" "}
							<span>brand into a revenue engine</span> through{" "}
							<span>integrated, performance-driven strategy.</span>
						</p>
					</div>
				</header>
			</section>
			<section className="dashed dashed-y py-px">
				<div className="bg-card">
					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 md:grid-cols-12 md:gap-8 md:py-16 lg:gap-10 lg:py-24">
						<div className="space-y-3 md:col-span-5">
							<Badge>
								<div className="size-1.5 rounded-full bg-brand-600" /> What we
								do
							</Badge>
							<h2 className="text-balance font-semibold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								We turn <span className="text-primary">first impressions</span>{" "}
								into lasting engagement
							</h2>
						</div>
						<div className="space-y-4 md:col-span-7 md:space-y-3">
							<h3 className="text-balance font-medium text-base sm:text-lg">
								Your brand isn’t experienced in pieces - it’s experienced as a
								whole.
							</h3>
							<div className="grid grid-cols-1 gap-4 text-muted-foreground sm:grid-cols-2 sm:gap-5 md:gap-6 [&_p_span]:text-foreground">
								<p>
									Our process blends{" "}
									<span>
										strategy, user psychology, creative execution, technology,
										and production
									</span>{" "}
									to create experiences that feel clear, consistent, and
									intentional - online and offline.
								</p>
								<p>
									Every service we offer is designed to work{" "}
									<span>
										together, ensuring clarity, consistency, and performance
									</span>{" "}
									across digital and physical.
								</p>
								<p>
									We start with <span>goals, structure, and behavior</span> -
									then design everything to support them.
								</p>
								<p>
									Because when every element works together, your brand doesn’t
									just look better - <span>it performs better.</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="dashed dashed-t relative">
				<ServicesLists />
				{/* <ServicesStickyCards /> */}

				<div className="dashed dashed-y">
					<div className="dashed dashed-x container flex max-w-7xl items-center justify-center py-12">
						<Button
							className="gap-4 text-foreground/70 hover:text-foreground"
							data-umami-event="Services - Build your vision"
							render={<Link href="/contact" />}
							size="xl"
							variant="ghost"
						>
							Build your vision with us <IconArrowRightTag />
						</Button>
					</div>
				</div>
				{/* <div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" /> */}
			</section>
		</main>
	);
}
