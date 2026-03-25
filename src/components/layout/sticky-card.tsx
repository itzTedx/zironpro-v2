"use client";

import { useRef } from "react";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { MotionValue, motion, useScroll, useTransform } from "motion/react";

import {
	PreviewLinkCard,
	PreviewLinkCardImage,
	PreviewLinkCardPopup,
	PreviewLinkCardPortal,
	PreviewLinkCardPositioner,
	PreviewLinkCardTrigger,
} from "@/components/primitives/preview-link-card";

import { SERVICES } from "@/features/services/constant";

import { Noise } from "../shared/noise";
import { Badge } from "../ui/badge";

const StickyCard = ({
	i,
	service,
	progress,
	range,
	targetScale,
}: { service: (typeof SERVICES)[number] } & {
	i: number;
	progress: MotionValue<number>;
	range: [number, number];
	targetScale: number;
}) => {
	const container = useRef<HTMLDivElement>(null);

	const scale = useTransform(progress, range, [1, targetScale]);
	const { description, id, icon: Icon, image, lists, slug, title } = service;

	// const isMobile = useIsMobile

	return (
		<div
			className="sticky top-0 flex items-center justify-center"
			ref={container}
		>
			<motion.div
				className="squircle relative grid origin-top transform-gpu gap-6 overflow-hidden rounded-5xl bg-card p-6 shadow-sm md:w-7xl md:grid-cols-2 md:p-9"
				style={{
					scale,
					top: `calc(-12vh + ${i * 20 + 300}px)`,
				}}
			>
				<span className="pointer-events-none absolute bottom-6 left-6 z-20 text-6xl text-muted">
					0{id}
					<span className="font-bold text-brand-secondary">.</span>
				</span>
				<Icon className="pointer-events-none absolute -bottom-20 -left-12 size-72 text-muted/10" />
				<div className="relative z-40">
					<Link href={`/services/${slug}` as Route}>
						<h3 className="font-semibold text-2xl text-primary tracking-tight md:text-4xl">
							{title}
						</h3>
						<p className="text-balance text-muted-foreground md:text-lg">
							{description}
						</p>
					</Link>

					<ul className="relative isolate z-50 mt-4 flex flex-wrap gap-3 text-white">
						{lists.map((list) => (
							<li className="text-lg" key={list.title}>
								<PreviewLinkCard
									followCursor="x"
									href={`/services/${service.slug}/${list.slug}` as Route}
									src={list.image}
								>
									<PreviewLinkCardTrigger
										className="tracking-tight transition-colors duration-300 ease-out hover:text-brand-secondary"
										delay={100}
									>
										<Badge
											className="bg-card text-sm transition-transform hover:scale-102 md:text-base"
											size="lg"
											variant="outline"
										>
											{list.title}
										</Badge>
									</PreviewLinkCardTrigger>
									<PreviewLinkCardPortal>
										<PreviewLinkCardPositioner side="inline-end">
											<PreviewLinkCardPopup
												className="overflow-hidden rounded-lg"
												href={`/services/${service.slug}/${list.slug}` as Route}
											>
												<PreviewLinkCardImage alt={service.alt} />
											</PreviewLinkCardPopup>
										</PreviewLinkCardPositioner>
									</PreviewLinkCardPortal>
								</PreviewLinkCard>
							</li>
						))}
					</ul>
				</div>

				<Link
					className="relative aspect-video overflow-hidden rounded-xl transition-transform group-hover:scale-110 md:aspect-4/3"
					href={`/services/${slug}` as Route}
				>
					<Noise />
					<Image
						alt={title}
						className="object-cover"
						fill
						sizes="(max-width: 768px) 100vw, 35vw"
						src={image}
					/>
				</Link>
				{/* <div className="absolute inset-x-0 top-0 z-10 h-1/2 bg-linear-to-b from-foreground" /> */}
			</motion.div>
		</div>
	);
};

const ServicesStickyCards = () => {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	return (
		<div
			className="relative flex w-full flex-col items-center justify-center px-4 pb-[35vh] md:px-0 md:pt-20 md:pb-[30vh]"
			ref={container}
		>
			{SERVICES.map((service, i) => {
				const targetScale = Math.max(0.5, 1 - (SERVICES.length - i - 1) * 0.1);
				return (
					<StickyCard
						i={i}
						key={`p_${i + 1}`}
						progress={scrollYProgress}
						range={[i * 0.2, 1]}
						service={service}
						targetScale={targetScale}
					/>
				);
			})}
		</div>
	);
};

export { ServicesStickyCards, StickyCard };
