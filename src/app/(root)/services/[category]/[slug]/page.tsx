import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import fs from "fs";
import path from "path";

import MDXContent from "@/components/markdown/mdx-component";
import { Noise } from "@/components/shared/noise";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { getServiceBySlug } from "@/features/services/actions/query";
import { Card } from "@/features/services/components/card";
import { Faq, FaqContent } from "@/features/services/components/faq";
import { ImageGalley } from "@/features/services/components/image-gallery";
import { LogoVariants } from "@/features/services/components/logo-variants";
import { Group, Section } from "@/features/services/components/section";
import { Cta } from "@/features/views/cta";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
	const contentDir = path.join(process.cwd(), "src/content/services");
	const categories = fs.readdirSync(contentDir);

	const params: { category: string; slug: string }[] = [];

	categories.forEach((category) => {
		const files = fs.readdirSync(path.join(contentDir, category));
		files.map((file) => {
			params.push({
				category,
				slug: file.replace(".mdx", ""),
			});
		});
	});

	return params;
}

export default async function ServicePage({
	params,
}: PageProps<"/services/[category]/[slug]">) {
	const { category, slug } = await params;
	const service = getServiceBySlug(category, slug);

	if (!service) return notFound();

	return (
		<div>
			<header className="dashed dashed-b relative w-full">
				<div className="md:dashed dashed-x container relative z-20 flex h-full max-w-7xl flex-col justify-end space-y-4 pt-12 pb-20">
					<div className="mx-auto max-w-5xl space-y-4">
						<h1 className="font-semibold text-4xl text-primary tracking-tighter sm:text-5xl md:text-6xl lg:text-8xl">
							{service.metadata.title}
						</h1>
						<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
							<p className="text-balance font-medium text-lg text-muted-foreground md:text-xl">
								{service.metadata.description}
							</p>
							<div>
								<Button
									className="w-48 justify-between"
									data-umami-event="Service page - Get started"
									size="lg"
								>
									Get started
									<IconArrowRightTag className="size-5" />
								</Button>
							</div>
						</div>
					</div>
					<div className="relative mt-9 aspect-video overflow-hidden rounded-3xl">
						<Image
							alt={service.metadata.title}
							className="pointer-events-none object-cover"
							fill
							sizes="(max-width: 1280px) 100vw, 1280px"
							src={service.metadata.image}
						/>
					</div>
				</div>
				<div className="absolute inset-x-0 bottom-0 z-10 mb-px h-3/4 bg-linear-to-t from-card" />
				<div className="absolute inset-x-0 top-0 z-10 h-3/4 bg-linear-to-b from-card" />
				<Noise />
			</header>

			<article className="prose prose-stone [&>div]:dashed [&>div]:dashed-x prose-xl max-w-none prose-a:text-primary prose-a:underline [&>div]:container [&>div]:max-w-7xl [&>div]:py-12">
				<MDXContent
					components={{
						a: (props) => (
							<Link
								{...props}
								className={cn(
									"group no-underline! relative items-center",
									"before:pointer-events-none before:absolute before:top-[1.3em] before:left-0 before:h-[0.072em] before:w-full before:bg-current before:content-['']",
									"before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
									"hover:before:origin-left hover:before:scale-x-100"
								)}
							/>
						),
						hr: (props) => (
							<hr className="dashed border-transparent" {...props} />
						),
						Cta,
						Faq,
						FaqContent,
						Image: (props) => (
							<Image
								height={1000}
								width={1000}
								{...props}
								className={cn(
									"rounded-2xl transition-transform hover:-translate-y-2",
									props.className
								)}
							/>
						),
						Card,
						Group,
						ImageGalley,
						LogoVariants,
						Section,
					}}
					source={service.content}
				/>
			</article>
		</div>
	);
}
