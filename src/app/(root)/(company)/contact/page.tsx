import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";

import { ADDRESS, OFFICE_HOURS } from "@/data/constant";
import { ContactForm } from "@/features/contact/contact-form";
import { ContactHeader } from "@/features/contact/views/contact-header";
import { HowWeHelp } from "@/features/contact/views/how-we-help";
import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

const title = "Contact ZironPro | Web Design & Digital Agency in Dubai, UAE";
const description =
	"Speak with ZironPro in Dubai for web design, SEO, branding, and growth marketing across Abu Dhabi, Sharjah, and the UAE. Request your free strategy call.";
const slug = "/contact";

export const metadata: Metadata = createPageMetadata({
	title,
	description,
	path: slug,
	keywords: [
		"contact digital agency Dubai",
		"SEO consultation UAE",
		"web design call Abu Dhabi",
	],
});

export default function ContactPage() {
	const webPageSchema = buildWebPageSchema(title, description, slug);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Contact", path: slug },
	]);

	return (
		<main className="pt-12">
			<Script id="schema-contact-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-contact-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<section className="dashed dashed-x mx-auto max-w-7xl py-4 md:py-12">
				<div className="container grid gap-4 md:grid-cols-2">
					<ContactHeader />
					{/* Contact Form */}
					<Frame>
						<FramePanel className="shadow-sm">
							<CardHeader className="p-3 pb-0">
								<CardTitle>Start your project today</CardTitle>
								<CardDescription className="text-sm">
									Tell us about your goals and we'll take it from there.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-3">
								<ContactForm />
							</CardContent>
						</FramePanel>
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

			<HowWeHelp />
		</main>
	);
}
