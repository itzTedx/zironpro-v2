import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Noise } from "@/components/shared/noise";

import { SERVICES } from "@/features/services/constant";

export const ServiceList = ({
	service,
}: {
	service: (typeof SERVICES)[number];
}) => {
	return (
		<div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
			<Link
				className="absolute inset-0 z-10"
				href={`/services/${service.slug}` as Route}
				title={service.title}
			/>
			<div className="relative h-fit overflow-hidden">
				<div className="transition-transform duration-300 ease-out">
					<span className="text-2xl text-muted">
						0{service.id}
						<span className="font-bold text-primary">.</span>
					</span>
					<h3 className="font-medium text-2xl tracking-tight md:text-3xl">
						{service.title}
					</h3>
					<div className="relative aspect-5/3 overflow-hidden rounded-xl">
						<Noise />
						<Image
							alt=""
							className="object-cover transition-transform group-hover:scale-110"
							fill
							sizes="(max-width: 768px) 100vw, 33vw"
							src={service.image}
						/>
					</div>
					<p className="hidden text-balance text-muted-foreground opacity-0 md:block">
						{service.description}
					</p>
				</div>
			</div>

			<ul className="relative isolate z-10 h-fit space-y-3">
				{service.lists.map((list) => (
					<li className="text-lg" key={list.title}>
						{list.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export const ServicesLists = () => {
	return (
		<ul className="relative z-10">
			{SERVICES.map((service) => (
				<li
					className="group dashed dashed-t relative px-6 py-10 transition-all md:px-0"
					key={service.id}
				>
					<ServiceList service={service} />
				</li>
			))}
		</ul>
	);
};
