import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";
import { IconDesktopPoint } from "@/assets/icons/desktop";
import { IconPlay } from "@/assets/icons/play";
import { IconPointer } from "@/assets/icons/pointer";
import { IconPrinter } from "@/assets/icons/printer";
import { IconSpeaker } from "@/assets/icons/speaker";
import { IconTarget } from "@/assets/icons/target";

import { cn } from "@/lib/utils";

import { ServicesCarousel } from "./components/services-carousel";
import { StarsBackground } from "./components/stars-background";

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
						render={
							<Link data-umami-event="Home - Work with us" href="/contact" />
						}
						variant="secondary"
					>
						Work with us <IconArrowRightTag />
					</Button>
					<Button
						render={
							<Link
								data-umami-event="Home - Explore our services"
								href="/services"
							/>
						}
						variant="ghost"
					>
						Explore our services
					</Button>
				</div>
			</Header>

			<div className="dashed-b-0 dashed container grid max-w-7xl gap-4 py-12 md:grid-cols-3 md:py-16 lg:py-20">
				<Link
					className="overflow-hidden rounded-2xl bg-orange-50 shadow-md transition-[box-shadow_translate] hover:scale-102 hover:shadow-lg"
					href="/services/branding"
				>
					<div className="space-y-3 p-9">
						<div className="flex items-center gap-3">
							<div className="squircle flex size-10 items-center justify-center rounded-2xl bg-orange-100">
								<IconTarget className="size-6 text-orange-500" />
							</div>
							<h3 className="font-medium text-xl">Branding</h3>
						</div>
						<p className="text-muted-foreground">
							Strategic brand identities that build trust, recognition, and
							loyalty helping e-commerce brands stand out.
						</p>
					</div>
					<Image
						alt="Branding service showcase by Ziron Media"
						height={720}
						src="/images/bento/branding.webp"
						width={800}
					/>
				</Link>

				<Link
					className="overflow-hidden rounded-2xl bg-green-50 shadow-md transition-[box-shadow_translate] hover:scale-102 hover:shadow-lg"
					href="/services/websites"
				>
					<div className="space-y-3 p-9">
						<div className="flex items-center gap-3">
							<div className="squircle flex size-10 items-center justify-center rounded-2xl bg-green-100">
								<IconDesktopPoint className="size-6 text-green-500" />
							</div>
							<h3 className="font-medium text-xl">Web Design & Development</h3>
						</div>
						<p className="text-muted-foreground">
							Conversion-focused websites built for speed, clarity, and
							scalability to consistently turn visitors into buyers.
						</p>
					</div>
					<Image
						alt="Web design and development service showcase by Ziron Media"
						height={720}
						src="/images/bento/web-dev-design.webp"
						width={800}
					/>
				</Link>

				<Link
					className="overflow-hidden rounded-2xl bg-fuchsia-50 shadow-md transition-[box-shadow_scale] hover:scale-102 hover:shadow-lg"
					href="/services/marketing"
				>
					<div className="space-y-3 p-9">
						<div className="flex items-center gap-3">
							<div className="squircle flex size-10 items-center justify-center rounded-2xl bg-fuchsia-100">
								<IconSpeaker className="size-6 text-fuchsia-500" />
							</div>
							<h3 className="font-medium text-xl">Digital Marketing</h3>
						</div>
						<p className="text-muted-foreground">
							Performance-driven ad campaigns built to scale e-commerce brands
							profitably with a strong focus on ROAS.
						</p>
					</div>
					<Image
						alt="Digital marketing campaign creatives by Ziron Media"
						height={720}
						src="/images/bento/social-media-creatives.webp"
						width={800}
					/>
				</Link>

				<Link
					className="overflow-hidden rounded-2xl bg-cyan-50 shadow-md transition-[box-shadow_translate] hover:scale-102 hover:shadow-lg"
					href="/services/printing"
				>
					<div className="space-y-3 p-9">
						<div className="flex items-center gap-3">
							<div className="squircle flex size-10 items-center justify-center rounded-2xl bg-cyan-100">
								<IconPrinter className="size-6 text-cyan-500" />
							</div>
							<h3 className="font-medium text-xl">
								Printing & Corporate Gifts
							</h3>
						</div>
						<p className="text-muted-foreground">
							Scroll-stopping ad creatives engineered for performance and rapid
							testing built to drive consistent sales.
						</p>
					</div>
					<Image
						alt="Printing and corporate gifts showcase by Ziron Media"
						height={720}
						src="/images/bento/paid-ads.webp"
						width={800}
					/>
				</Link>

				<Link
					className="overflow-hidden rounded-2xl bg-blue-50 shadow-md transition-[box-shadow_translate] hover:scale-102 hover:shadow-lg"
					href="/services/motion"
				>
					<div className="space-y-3 p-9">
						<div className="flex items-center gap-3">
							<div className="squircle flex size-10 items-center justify-center rounded-2xl bg-blue-100">
								<IconPlay className="size-6 text-blue-500" />
							</div>
							<h3 className="font-medium text-xl">Motion Design & Video</h3>
						</div>
						<p className="text-muted-foreground">
							High-impact explainer videos, brand films, and motion graphics
							that bring your UAE brand story to life.
						</p>
					</div>
					<Image
						alt="Motion design and video service showcase by Ziron Media"
						height={720}
						src="/images/bento/paid-ads.webp"
						width={800}
					/>
				</Link>

				<Link
					className="overflow-hidden rounded-2xl bg-purple-50 shadow-md transition-[box-shadow_translate] hover:scale-102 hover:shadow-lg"
					href="/services/full-stack"
				>
					<div className="space-y-3 p-9">
						<div className="flex items-center gap-3">
							<div className="squircle flex size-10 items-center justify-center rounded-2xl bg-purple-100">
								<IconPointer className="size-6 text-purple-500" />
							</div>
							<h3 className="font-medium text-xl">Conversion optimization</h3>
						</div>
						<p className="text-muted-foreground">
							We optimize funnels and user journeys to reduce friction and
							convert more traffic into customers.
						</p>
					</div>
					<Image
						alt="Conversion optimization service showcase by Ziron Media"
						height={720}
						src="/images/bento/conversion.webp"
						width={800}
					/>
				</Link>
			</div>

			<div className="dashed container max-w-7xl py-12 md:py-16 lg:py-20">
				<h2 className="mb-6 text-center font-medium text-4xl">
					Tailored services <br /> for every{" "}
					<span className="text-primary">Brand.</span>
				</h2>

				<ServicesCarousel />
			</div>
			{/* <div className="dashed-x dashed container grid max-w-7xl gap-4 py-12 md:grid-cols-3 md:py-16 lg:py-20">
				<WebDevelopmentGrid />
				<BrandingGrid />
				<AllServicesGrid />
				<LogoGrid />
				<MotionGraphicsGrid />
			</div> */}
			{/* <ServicesLists /> */}
			<div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,var(--color-brand-950)_0%,#000_100%)]">
				<div className="dashed dashed-b-0 container relative z-10 flex max-w-7xl flex-col items-center justify-center gap-6 py-12 md:flex-row">
					<h4 className="text-center font-medium text-3xl text-muted">
						Ready to take your business to the next level?
					</h4>
					<Button
						render={<Link className="gap-4" href="/contact" />}
						size="xl"
						variant="secondary"
					>
						Build your vision with us <IconArrowRightTag />
					</Button>
				</div>
				<StarsBackground
					className={cn("absolute inset-0 flex items-center justify-center")}
				/>
			</div>
			<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
			<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
		</section>
	);
};
