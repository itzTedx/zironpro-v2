"use client";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Clock } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";

import { IconArrowLeft } from "@/assets/icons/arrow";

import { Blog } from "@/features/articles/actions/types";

const DEFAULT_PROMPTS = [
	"What insight from this article is most relevant to your next campaign?",
	"Which section can you turn into a concrete action this week?",
	"What would improve if you apply this consistently for the next 30 days?",
];

function getReadingTimeLabel(content: string) {
	const plainText = content
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[[^\]]+\]\([^)]*\)/g, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/[#{>*_~-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	const wordCount = plainText.length > 0 ? plainText.split(" ").length : 0;
	const minutes = Math.max(1, Math.ceil(wordCount / 200));

	return `${minutes} min read`;
}

function buildEngagementContent(data: Blog) {
	const customPrompts =
		data.metadata.engagement?.prompts?.filter(Boolean) ?? [];
	const normalizedTags = data.metadata.tags.map((tag) => tag.toLowerCase());
	const isSocial = normalizedTags.some((tag) => tag.includes("social"));
	const isSeo = normalizedTags.some((tag) => tag.includes("seo"));

	const fallbackPrompts = isSocial
		? [
				"Which content format will you test first: reels, carousels, or stories?",
				"What engagement signal should define success for your next 7 posts?",
				"Where can you add a clearer call-to-action in your current social flow?",
			]
		: isSeo
			? [
					"Which keyword cluster from this article should become your next page?",
					"What on-page fix can you ship this week to improve discoverability?",
					"Which internal link can connect intent across your top pages?",
				]
			: DEFAULT_PROMPTS;

	return {
		title:
			data.metadata.engagement?.panelTitle ??
			`Next steps for ${data.metadata.category}`,
		prompts: customPrompts.length > 0 ? customPrompts : fallbackPrompts,
		closingNote:
			data.metadata.engagement?.closingNote ??
			"Small, consistent improvements create compounding growth. Pick one action and ship it today.",
		cta: data.metadata.engagement?.cta ?? null,
	};
}

export function BlogContent({
	data,
	relatedBlogs,
	relatedServices,
	children,
}: {
	data: Blog;
	relatedBlogs: { slug: string; title: string }[];
	relatedServices: {
		href: string;
		title: string;
		image: string;
		alt: string;
	}[];
	children: React.ReactNode;
}) {
	const engagement = buildEngagementContent(data);
	const readingTimeLabel = getReadingTimeLabel(data.content);

	return (
		<section className="w-full px-4 py-16 md:py-24">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-card shadow-lg"
				initial={{ opacity: 0, y: 24 }}
				transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
			>
				<div className="relative h-56 w-full bg-gray-200 md:h-96">
					<motion.div
						animate={{ scale: 1, opacity: 1 }}
						className="absolute inset-0"
						initial={{ scale: 1.08, opacity: 0 }}
						transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
					>
						<Image
							alt="Writer desk with scattered notes"
							className="h-full w-full object-cover"
							fill
							src={data.metadata.image}
						/>
					</motion.div>
					<motion.div
						animate={{ opacity: 1 }}
						className="absolute inset-0 bg-linear-to-t from-card to-50%"
						initial={{ opacity: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
					/>
					<div className="absolute bottom-6 left-6 flex items-center gap-3">
						{data.metadata.tags.map((tag) => (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 12 }}
								key={tag}
								transition={{ delay: 0.5, duration: 0.5 }}
							>
								<Badge>{tag}</Badge>
							</motion.div>
						))}
					</div>
				</div>

				<div className="space-y-12 bg-card px-6 py-10 md:px-12 md:py-12">
					<motion.header
						animate={{ opacity: 1, y: 0 }}
						className="space-y-4"
						initial={{ opacity: 0, y: 10 }}
						transition={{ delay: 0.1, duration: 0.6 }}
					>
						<div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
							<Button
								className="group"
								render={<Link href="/blogs" />}
								variant="secondary"
							>
								<div className="pointer-events-none relative flex-none rotate-180 transition-colors duration-500">
									<IconArrowLeft className="translate-x-0 rotate-180 scale-100 transform-gpu opacity-100 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-2 group-hover:scale-0 group-hover:opacity-0" />
									<IconArrowLeft className="absolute inset-0 -translate-x-2 rotate-180 scale-0 transform-gpu opacity-0 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
								</div>
								Back
							</Button>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground/70" />
								{readingTimeLabel}
							</div>
							<span>Updated {data.metadata.date}</span>
						</div>
						<h1 className="font-semibold text-3xl text-foreground tracking-tight md:text-4xl lg:text-5xl">
							{data.metadata.title}
						</h1>
						<p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
							{data.metadata.description}
						</p>
					</motion.header>

					<div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
						<motion.article
							animate={{ opacity: 1, y: 0 }}
							className="prose prose-stone prose-lg prose-headings:mt-0 max-w-none space-y-8 prose-hr:border-muted/60 prose-a:text-primary"
							initial={{ opacity: 0, y: 12 }}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							{children}
						</motion.article>

						<motion.aside
							animate={{ opacity: 1, y: 0 }}
							className="space-y-8"
							initial={{ opacity: 0, y: 12 }}
							transition={{ delay: 0.3, duration: 0.6 }}
						>
							<Frame>
								<FrameHeader className="px-2 py-0.5">
									<FrameTitle className="text-base">Reading stack</FrameTitle>
								</FrameHeader>
								<FramePanel>
									<ul className="space-y-2 text-muted-foreground text-sm">
										{relatedBlogs.map((item) => (
											<li className="flex items-center gap-2" key={item.slug}>
												<span className="inline-block h-2 w-2 rounded-full bg-primary" />
												<Link
													className="transition-colors hover:text-foreground"
													href={`/blogs/${item.slug}`}
												>
													{item.title}
												</Link>
											</li>
										))}
									</ul>
								</FramePanel>
							</Frame>

							<div className="space-y-4">
								<h3 className="font-semibold text-base text-foreground">
									Related services
								</h3>
								{relatedServices.map((service) => (
									<div
										className="overflow-hidden rounded-2xl border border-border/50 bg-background"
										key={service.href}
									>
										<div className="relative h-40 w-full">
											<Link
												className="block h-full w-full"
												href={service.href as Route}
											>
												<Image
													alt={service.alt}
													className="h-full w-full object-cover"
													fill
													sizes="(max-width: 768px) 100vw, 320px"
													src={service.image}
													unoptimized
												/>
											</Link>
										</div>
										<p className="px-4 py-3 text-muted-foreground text-sm">
											<Link
												className="transition-colors hover:text-foreground"
												href={service.href as Route}
											>
												{service.title}
											</Link>
										</p>
									</div>
								))}
							</div>
						</motion.aside>
					</div>

					<motion.footer
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 12 }}
						transition={{ delay: 0.35, duration: 0.6 }}
					>
						<Frame>
							<FrameHeader className="px-2 py-0.5">
								<FrameTitle className="text-base">
									{engagement.title}
								</FrameTitle>
							</FrameHeader>
							<FramePanel>
								<div className="space-y-6 text-muted-foreground text-sm">
									<ul className="space-y-2">
										{engagement.prompts.map((prompt) => (
											<li key={prompt}>• {prompt}</li>
										))}
									</ul>
									<p>{engagement.closingNote}</p>
									{engagement.cta ? (
										<Button
											render={<Link href={engagement.cta.href as Route} />}
										>
											{engagement.cta.label}
										</Button>
									) : null}
								</div>
							</FramePanel>
						</Frame>
					</motion.footer>
				</div>
			</motion.div>
		</section>
	);
}
