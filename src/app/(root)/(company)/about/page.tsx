import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { Header } from "@/components/shared/header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Frame,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";

import { Achievements } from "@/features/views/home/achievements";
import {
	buildBreadcrumbSchema,
	buildReviewSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "About ZironPro Digital Agency in Dubai, UAE",
	description:
		"Learn how ZironPro helps businesses in Dubai, Abu Dhabi, and Sharjah grow through integrated branding, websites, SEO, and conversion-focused marketing.",
	path: "/about",
	keywords: [
		"about ZironPro",
		"digital agency in Dubai",
		"marketing company UAE",
		"trusted digital agency UAE",
		"branding and web development Dubai",
	],
});

const TRUST_METRICS = [
	{
		label: "Brands Served",
		value: "2k+",
		description: "From startups to established UAE companies.",
	},
	{
		label: "Years in Market",
		value: "6+",
		description: "A proven track record since 2019.",
	},

	{
		label: "Execution Standard",
		value: "48h",
		description: "Most requests move from brief to first draft quickly.",
	},
] as const;

const PROCESS_STEPS = [
	{
		title: "Discover",
		description:
			"We start by understanding your goals, offer, audience, and growth bottlenecks.",
	},
	{
		title: "Design the Strategy",
		description:
			"We turn insights into a clear plan covering positioning, UX, messaging, and channels.",
	},
	{
		title: "Build and Launch",
		description:
			"Our team executes creative, development, and campaign delivery with production-level quality.",
	},
	{
		title: "Measure and Improve",
		description:
			"We track outcomes, report transparently, and iterate based on what drives results.",
	},
] as const;

const TRUST_PILLARS = [
	{
		title: "Clear Scope and Timelines",
		description:
			"You get upfront deliverables, milestones, and expectations before production begins.",
	},
	{
		title: "Senior-Led Execution",
		description:
			"Work is guided by experienced strategists, designers, and developers focused on quality.",
	},
	{
		title: "Transparent Communication",
		description:
			"You always know what is in progress, what is next, and where performance stands.",
	},
	{
		title: "Growth-Focused Decisions",
		description:
			"Every deliverable is designed to improve conversion potential, not just visual polish.",
	},
] as const;

const FAQ_ITEMS = [
	{
		question: "What types of businesses do you usually work with?",
		answer:
			"We support service businesses, e-commerce brands, and B2B companies across Dubai, Abu Dhabi, Sharjah, and wider UAE markets.",
	},
	{
		question: "How quickly can we start after our first call?",
		answer:
			"After a discovery call and scope alignment, most projects can begin quickly with a defined kickoff timeline.",
	},
	{
		question: "How do you report progress and performance?",
		answer:
			"You receive regular updates on completed work, current priorities, and measurable outcomes relevant to your goals.",
	},
	{
		question: "Can you handle both strategy and execution?",
		answer:
			"Yes. We combine brand strategy, design, web development, and marketing execution to keep delivery aligned and efficient.",
	},
] as const;

export default function AboutPage() {
	const webPageSchema = buildWebPageSchema(
		"About ZironPro Digital Agency in Dubai, UAE",
		"Learn how ZironPro helps businesses in Dubai, Abu Dhabi, and Sharjah grow through integrated branding, websites, SEO, and conversion-focused marketing.",
		"/about"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
	]);
	const reviewSchema = buildReviewSchema({
		authorName: "Direct LS",
		reviewBody:
			"Ziron Media delivered a modern, fast, and professional website that reflects our brand and made the process smooth.",
		reviewRatingValue: 5,
		itemName: "Digital Agency Services",
		itemPath: "/about",
	});

	return (
		<main className="pb-16 md:pb-20">
			<Script id="schema-about-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-about-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<Script id="schema-about-review" type="application/ld+json">
				{JSON.stringify(reviewSchema)}
			</Script>

			<section className="dashed dashed-x container max-w-7xl py-12 md:py-16">
				<div className="grid gap-6 md:grid-cols-2 md:gap-12">
					<div className="space-y-4">
						<Badge variant="outline">Dubai-Based Digital Agency</Badge>
						<h1 className="font-display font-semibold text-4xl text-primary md:text-7xl">
							We Build Brands and Digital Systems People Trust.
						</h1>
						<p className="max-w-xl text-lg text-muted-foreground md:text-xl">
							ZironPro helps ambitious UAE businesses grow with strategy-led
							branding, conversion-focused websites, and performance marketing
							that turns attention into measurable business outcomes.
						</p>
					</div>
					<div className="flex flex-col justify-end space-y-4">
						<div className="rounded-2xl bg-surface p-5">
							<p className="font-medium text-foreground">
								Trusted by teams that value speed, quality, and clear
								communication.
							</p>
							<p className="mt-2 text-muted-foreground text-sm md:text-base">
								You work with one integrated team across strategy, creative, and
								development, so decisions are faster and execution stays
								aligned.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<Button render={<Link href="/contact" />} size="lg">
								Book a Strategy Call
							</Button>
							<Button
								render={<Link href="/our-works" />}
								size="lg"
								variant="outline"
							>
								See Case Studies
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section className="dashed dashed-y">
				<Header
					description="Our delivery process is designed to reduce ambiguity and accelerate progress from idea to launch."
					title="How We Work"
				/>
				<div className="container max-w-7xl py-8 md:py-12">
					<div className="grid gap-4 md:grid-cols-2">
						{PROCESS_STEPS.map((step) => (
							<Frame key={step.title}>
								<FramePanel>
									<FrameHeader className="gap-2 px-2 py-1">
										<FrameTitle>{step.title}</FrameTitle>
										<FrameDescription className="text-base">
											{step.description}
										</FrameDescription>
									</FrameHeader>
								</FramePanel>
							</Frame>
						))}
					</div>
				</div>
			</section>

			<Achievements />

			<section className="dashed dashed-y">
				<Header
					description="Practical standards that clients rely on when choosing us as their long-term digital partner."
					title="Why Clients Choose ZironPro"
				/>
				<div className="container max-w-7xl py-8 md:py-12">
					<div className="grid gap-4 md:grid-cols-2">
						{TRUST_PILLARS.map((pillar) => (
							<Frame key={pillar.title}>
								<FramePanel>
									<FrameHeader className="gap-2 px-2 py-1">
										<FrameTitle>{pillar.title}</FrameTitle>
										<FrameDescription className="text-base">
											{pillar.description}
										</FrameDescription>
									</FrameHeader>
									<FrameFooter className="px-2 py-1">
										<p className="text-muted-foreground text-sm">
											Built to lower risk, improve decision-making, and support
											steady growth.
										</p>
									</FrameFooter>
								</FramePanel>
							</Frame>
						))}
					</div>
				</div>
			</section>

			<section className="dashed dashed-y">
				<Header
					description="Common pre-project questions from teams evaluating a digital agency in the UAE."
					title="Frequently Asked Questions"
				/>
				<div className="container max-w-7xl py-8 md:py-12">
					<Frame>
						<FramePanel>
							<Accordion className="px-2 py-1" defaultValue={["faq-0"]}>
								{FAQ_ITEMS.map((item, index) => (
									<AccordionItem key={item.question} value={`faq-${index}`}>
										<AccordionTrigger>{item.question}</AccordionTrigger>
										<AccordionContent>{item.answer}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</FramePanel>
					</Frame>
				</div>
			</section>

			<section className="dashed dashed-x container max-w-7xl py-12 md:py-16">
				<div className="rounded-3xl bg-linear-to-b from-brand-500 to-brand-secondary-400 p-8 text-white md:p-12">
					<Badge className="bg-card text-foreground" variant="outline">
						Ready to Grow
					</Badge>
					<h2 className="mt-4 max-w-3xl font-display font-semibold text-3xl text-white md:text-5xl">
						Build a Digital Presence That Performs as Good as It Looks.
					</h2>
					<p className="mt-3 max-w-2xl text-sm text-white/90 md:text-lg">
						Book a strategy conversation to map your next 90 days of brand,
						website, and marketing priorities with a team built for execution.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<Button render={<Link href="/contact" />} variant="secondary">
							Get Your Growth Plan
						</Button>
						<Button
							className="border-white/40 bg-transparent text-white hover:bg-white/10"
							render={<Link href="/services" />}
							variant="outline"
						>
							Explore Services
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
