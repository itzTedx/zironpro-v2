import Link from "next/link";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { ServicesCarousel } from "./components/services-carousel";
import {
	AllServicesGrid,
	BrandingGrid,
	LogoGrid,
	MotionGraphicsGrid,
	WebDevelopmentGrid,
} from "./components/services-grid";

export const Services = () => {
	return (
		<section className="relative">
			{/* <header className="absolute left-1/2 z-10 w-full -translate-x-1/2 px-6 py-12 text-center md:px-0 md:py-20">
				<h2 className="shrink-0 font-bold font-display text-4xl text-primary tracking-tight md:text-6xl">
					With our services
				</h2>
				<p className="mx-auto mt-3 max-w-2xs text-balance text-muted-foreground md:text-xl">
					We help you achieve more at every stage of business growth.
				</p>
			</header> */}
			<Header
				description="We help you achieve more at every stage of business growth."
				title="Services"
			>
				<div className="flex items-center gap-4 sm:justify-center">
					<Button
						data-umami-event="Home - Build your vision"
						render={<Link href="/contact" />}
						variant="secondary"
					>
						Work with us <IconArrowRightTag />
					</Button>
					<Button
						data-umami-event="Home - Build your vision"
						render={<Link href="/services" />}
						variant="ghost"
					>
						Explore our services
					</Button>
				</div>
			</Header>
			<div className="dashed container max-w-7xl py-12 md:py-16 lg:py-20">
				<ServicesCarousel />
			</div>
			<div className="dashed-x dashed container grid max-w-7xl gap-4 py-12 md:grid-cols-3 md:py-16 lg:py-20">
				<WebDevelopmentGrid />
				<BrandingGrid />
				<AllServicesGrid />
				<LogoGrid />
				<MotionGraphicsGrid />
			</div>
			{/* <ServicesStickyCards /> */}
			{/* <ServicesLists /> */}
			<div className="relative overflow-hidden bg-gray-1400">
				<div className="dashed dashed-b-0 container flex max-w-7xl items-center justify-center gap-6 py-12">
					<h4 className="text-center font-medium text-3xl text-muted">
						Ready to take your business to the next level?
					</h4>
					<Button
						className="gap-4"
						render={<Link href="/contact" />}
						size="xl"
						variant="secondary"
					>
						Build your vision with us <IconArrowRightTag />
					</Button>
				</div>
			</div>
			<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
			<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
		</section>
	);
};
