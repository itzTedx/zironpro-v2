"use client";

import { useState } from "react";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";

import { Noise } from "@/components/shared/noise";
import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/assets/icons/arrow";

import { SERVICES } from "@/features/services/constant";

export const ServiceList = ({
	service,
}: {
	service: (typeof SERVICES)[number];
}) => {
	const [hoveredListImage, setHoveredListImage] = useState<string | null>(null);

	const imageSrc = hoveredListImage ?? service.image;

	return (
		<div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
			<Link
				className="absolute inset-0 z-10"
				href={`/services/${service.slug}` as Route}
				title={service.title}
			/>
			<div className="relative col-span-2 h-fit overflow-hidden">
				<div className="transition-transform duration-300 ease-out">
					<span className="text-2xl text-primary">0{service.id}</span>
					<h3 className="font-display font-medium text-2xl tracking-tight md:text-4xl lg:text-8xl">
						{service.title}
					</h3>

					<div className="mt-6 grid grid-cols-2 gap-6">
						<div>
							<p className="text-balance text-2xl text-foreground/80 leading-relaxed">
								{service.description}
							</p>
							<div className="relative z-20 mt-6 flex items-center gap-4">
								<Button variant="secondary">
									Learn more <IconArrowRight />
								</Button>
								<Link
									className="relative flex items-center gap-2 text-muted-foreground transition-colors duration-300 ease-out before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:origin-right before:scale-x-0 before:bg-current before:transition-transform before:duration-300 before:ease-in-out before:content-[''] hover:text-primary hover:before:origin-left hover:before:scale-x-100"
									href="/contact"
								>
									Or start a project <IconArrowRight className="size-4" />
								</Link>
							</div>
						</div>
						<ul className="relative isolate z-20 h-fit space-y-3">
							{service.lists.map((list) => (
								<li className="group/list text-lg" key={list.title}>
									<Link
										className="flex items-center gap-3 font-medium transition-colors group-hover/list:text-primary"
										href={`/services/${service.slug}/${list.slug}` as Route}
										onBlur={() => setHoveredListImage(null)}
										onFocus={() => setHoveredListImage(list.image)}
										onMouseEnter={() => setHoveredListImage(list.image)}
										onMouseLeave={() => setHoveredListImage(null)}
									>
										<IconArrowRight className="size-4 text-muted-foreground/50 transition-[color_translate] group-hover/list:translate-x-1 group-hover/list:text-primary" />
										{list.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="relative aspect-4/3 overflow-hidden rounded-xl">
				<Noise />
				<LazyMotion features={domAnimation}>
					<div className="relative h-full w-full">
						<AnimatePresence initial={false} mode="sync">
							<m.div
								animate={{ opacity: 1, scale: 1 }}
								className="absolute inset-0"
								exit={{ opacity: 0, scale: 1.02 }}
								initial={{ opacity: 0, scale: 1.04 }}
								key={imageSrc}
								transition={{ duration: 0.32, ease: "easeOut" }}
							>
								<Image
									alt={`Preview image for ${service.title} by Ziron Media`}
									className="object-cover"
									fill
									priority={false}
									sizes="(max-width: 768px) 100vw, 33vw"
									src={imageSrc}
								/>
							</m.div>
						</AnimatePresence>
					</div>
				</LazyMotion>
			</div>
		</div>
	);
};

export const ServicesLists = () => {
	return (
		<ul className="relative z-10">
			{SERVICES.map((service) => (
				<li
					className="group dashed dashed-t relative px-6 py-12 transition-colors duration-300 ease-out hover:bg-card md:px-0 md:py-16 lg:py-20"
					key={service.id}
				>
					<ServiceList service={service} />
				</li>
			))}
		</ul>
	);
};
