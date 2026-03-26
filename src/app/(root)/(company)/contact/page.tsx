import { Route } from "next";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import { ContactList } from "@/components/layout/ui/contact-list";
import { Socials } from "@/components/layout/ui/socials";
import {
	PreviewLinkCard,
	PreviewLinkCardImage,
	PreviewLinkCardPopup,
	PreviewLinkCardPortal,
	PreviewLinkCardPositioner,
	PreviewLinkCardTrigger,
} from "@/components/primitives/preview-link-card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";

import { IconCheckmark } from "@/assets/icons/check";

import { ADDRESS, OFFICE_HOURS } from "@/data/constant";
import { ContactForm } from "@/features/contact/components/contact-form";
import { SERVICES } from "@/features/services/constant";
import { buildBreadcrumbSchema, buildWebPageSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Contact ZironPro in Dubai, UAE | Book Strategy Call",
	description:
		"Speak with ZironPro in Dubai for web design, SEO, branding, and growth marketing across Abu Dhabi, Sharjah, and the UAE. Request your free strategy call.",
	path: "/contact",
	keywords: ["contact digital agency Dubai", "SEO consultation UAE", "web design call Abu Dhabi"],
});

export default function ContactPage() {
	const webPageSchema = buildWebPageSchema(
		"Contact ZironPro in Dubai, UAE | Book Strategy Call",
		"Speak with ZironPro in Dubai for web design, SEO, branding, and growth marketing across Abu Dhabi, Sharjah, and the UAE. Request your free strategy call.",
		"/contact"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Contact", path: "/contact" },
	]);

	return (
		<main>
			<Script id="schema-contact-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-contact-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<section className="dashed dashed-x mx-auto max-w-7xl py-4 md:py-12">
				<div className="container grid gap-4 md:grid-cols-2">
					<div className="space-y-9 py-4 md:py-6">
						<div className="space-y-2">
							<Badge>Let’s Build Something That Works for Your Brand</Badge>
							<h1 className="text-balance font-black font-display text-4xl text-primary uppercase tracking-tight md:text-6xl">
								The right partner for your next project
							</h1>
							<p className="text-balance font-medium text-lg text-muted-foreground leading-relaxed *:text-foreground md:text-xl">
								Whether you’re planning a{" "}
								<span>
									new launch, refreshing your brand, scaling your marketing,
								</span>{" "}
								or bringing your ideas to life across digital and print —{" "}
								<span>we’re ready.</span>
							</p>
						</div>
						<ContactList />
						<Socials className="text-muted-foreground" />
					</div>
					{/* Contact Form */}
					<Frame>
						<Alert className="flex items-center" variant="success">
							<IconCheckmark className="size-6" />
							<AlertTitle className="text-success-secondary">
								Time slots available right now!
							</AlertTitle>
						</Alert>

						<Card className="shadow-sm">
							<CardHeader className="p-6 pb-0">
								<CardTitle>
									Request a call and see how Ziron Media works
								</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<ContactForm />
							</CardContent>
						</Card>
						<FrameHeader>
							<FrameTitle>
								<p className="text-muted-foreground">
									Prefer to hop on a call?{" "}
									<Link className="text-primary hover:underline" href="/">
										Book a call
									</Link>{" "}
									instead.
								</p>
							</FrameTitle>
						</FrameHeader>
						<div className="grid gap-4 md:grid-cols-2">
							<FramePanel>
								<span className="w-12 font-mono text-muted-foreground text-xs uppercase leading-none tracking-tight">
									Address
									<span className="font-bold text-brand-secondary">.</span>
								</span>
								<p className="font-medium text-lg">{ADDRESS}</p>
							</FramePanel>
							<FramePanel>
								<span className="w-12 font-mono text-muted-foreground text-xs uppercase leading-none tracking-tight">
									Office Hours
									<span className="font-bold text-brand-secondary">.</span>
								</span>
								<ul className="space-y-1.5 font-medium text-lg">
									{OFFICE_HOURS.map((h) => (
										<li key={h.period}>
											<h4>{h.period}</h4>
											<p>{h.time}</p>
										</li>
									))}
								</ul>
							</FramePanel>
						</div>
					</Frame>
				</div>
			</section>

			<section className="dashed dashed-y relative">
				<div className="absolute inset-x-0 top-px h-1/2 bg-linear-to-b from-card" />
				<div className="absolute inset-x-0 bottom-px h-1/2 bg-linear-to-t from-card" />
				<div className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 py-9 md:grid-cols-3 md:px-0 md:py-16">
					<div>
						<h2 className="font-semibold text-2xl tracking-tight">
							How we help you grow
						</h2>
						<div className="mt-4 space-y-3 text-balance text-muted-foreground">
							<p>
								We help businesses turn ideas into clear brand systems and
								growth engines.
							</p>

							<p>
								From branding and websites to marketing, motion, printing, and
								full-stack execution - everything is handled under one roof,
								with one accountable team.
							</p>

							<p className="font-medium">
								No handoffs. No silos. Just progress.
							</p>
						</div>
					</div>
					<div className="col-span-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3">
						{SERVICES.map(({ icon: Icon, ...service }) => {
							return (
								<Frame key={service.id}>
									<FramePanel className="flex items-center gap-3">
										<Icon className="size-5 shrink-0 text-muted-foreground" />
										<h3 className="font-medium text-sm">{service.title}</h3>
									</FramePanel>
									<FramePanel className="h-full">
										<ul className="flex flex-col gap-1">
											{service.lists.map((list) => (
												<li key={list.slug}>
													<PreviewLinkCard
														followCursor="x"
														href={
															`/services/${service.slug}/${list.slug}` as Route
														}
														src={list.image}
													>
														<PreviewLinkCardTrigger
															className="font-medium text-sm transition-colors duration-300 ease-out hover:text-brand-secondary"
															delay={20}
														>
															{list.title}
														</PreviewLinkCardTrigger>
														<PreviewLinkCardPortal>
															<PreviewLinkCardPositioner side="inline-end">
																<PreviewLinkCardPopup
																	className="overflow-hidden rounded-lg"
																	href={
																		`/services/${service.slug}/${list.slug}` as Route
																	}
																>
																	<PreviewLinkCardImage alt="Preview link card content" />
																</PreviewLinkCardPopup>
															</PreviewLinkCardPositioner>
														</PreviewLinkCardPortal>
													</PreviewLinkCard>
												</li>
											))}
										</ul>
									</FramePanel>
								</Frame>
							);
						})}
					</div>
				</div>
				<div />
			</section>
		</main>
	);
}
