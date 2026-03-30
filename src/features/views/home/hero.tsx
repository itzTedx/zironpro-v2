import Link from "next/link";

import { Noise } from "@/components/shared/noise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { Featured } from "./featured";

interface HeroProps {
	badgeLabel?: string;
	heading?: string;
	subheading?: string;
}

export const Hero = ({ badgeLabel, heading, subheading }: HeroProps) => {
	// const bg = "bg-[radial-gradient(ellipse_400%_240%_at_50%_100%,#fff,#fff_10%,15%,#c7c5fd_16%,rgba(154,103,250,.6)_17%,21%,#264cab_28%,35%,#00031d_45%,#00031d)]"
	const badgeNode = badgeLabel ? (
		badgeLabel
	) : (
		<>
			UAE&apos;s Digital Marketing Agency{" "}
			<span className="text-brand-400">Driving Revenue Growth</span>
		</>
	);

	const headingNode = heading ?? "Turn your brand into a revenue machine";

	const subheadingNode = subheading ? (
		subheading
	) : (
		<>
			We’re your full-stack creative & digital marketing partner from{" "}
			<span className="text-card">
				branding to websites, CRM software, social media, printing, corporate
				gifts,
			</span>{" "}
			and everything in between.
		</>
	);

	return (
		<section className="relative bg-[radial-gradient(ellipse_400%_240%_at_50%_100%,#fff,#fff_10%,15%,#c7c5fd_16%,rgba(154,103,250,.6)_17%,21%,#264cab_28%,35%,#00031d_45%,#00031d)]">
			<Noise className="opacity-20" />
			<div className="dashed dashed-x relative mx-auto max-w-7xl">
				<div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 md:px-0 lg:py-20">
					<Badge className="gap-2">
						<span className="size-1.5 rounded-full bg-brand-400" />{" "}
						<h1 className="tracking-wide">{badgeNode}</h1>
					</Badge>
					{/* <Badge className="gap-2 uppercase tracking-normal">
						<div className="size-1.5 rounded-full bg-violet-500" /> Ready to grow?
						We’re ready to go
					</Badge> */}
					<h2 className="text-center font-black font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] uppercase md:text-6xl lg:text-7xl">
						{headingNode}
					</h2>
					<p className="text-balance text-center font-medium text-muted leading-relaxed sm:text-lg md:text-xl">
						{subheadingNode}
					</p>

					<div className="relative z-99 flex w-full items-center gap-4 md:w-auto">
						<Button
							className="group w-full flex-1 justify-between gap-2 md:w-48"
							data-label="Hero - Get started"
							data-location="hero_primary"
							data-track="cta_click"
							render={<Link href="/services" />}
							size="xl"
						>
							<span>
								Get started{" "}
								{/* <span className="hidden font-normal text-primary-secondary md:inline">
									- it’s free
								</span> */}
							</span>
							<IconArrowRightTag className="size-5 transition-transform duration-300 ease-in group-hover:translate-x-1" />
						</Button>
						<Button
							className="group text-card hover:text-brand-900"
							data-label="Hero - See us in action"
							data-location="hero_secondary"
							data-track="cta_click"
							render={<Link href="/our-works" />}
							size="xl"
							variant="outline"
						>
							<span>See us in action</span>
							{/* <IconPlay className="hidden size-5 transition-transform duration-300 ease-in group-hover:translate-x-1 md:inline" /> */}
						</Button>
					</div>
				</div>

				{/* <ul className="dashed dashed-t flex flex-col items-center text-lg md:flex-row">
					<li className="dashed dashed-b md:dashed-b-0 flex w-full items-center justify-center gap-2 p-6">
						<div className="flex size-12 items-center justify-center rounded-lg bg-muted/20">
							<IconClock className="size-8" />
						</div>
						<p>48 Hours Delivery</p>
					</li>
					<li className="dashed dashed-b md:dashed-b-0 md:dashed-x flex w-full items-center justify-center gap-2 p-6">
						<div className="flex size-12 items-center justify-center rounded-lg bg-muted/20">
							<IconClock className="size-8" />
						</div>
						<p>One Partner for Digital & Print</p>
					</li>
					<li className="flex w-full items-center justify-center gap-2 p-6">
					<div className="flex size-12 items-center justify-center rounded-lg bg-muted/20">
					<IconClock className="size-8" />
					</div>
						<p>Scalable Creative Support</p>
						</li>
						</ul> */}
			</div>
			<Featured />
		</section>
	);
};
