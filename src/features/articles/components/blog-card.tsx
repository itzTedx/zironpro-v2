import Image from "next/image";
import Link from "next/link";

import { Noise } from "@/components/shared/noise";

import { cn } from "@/lib/utils";

import { BlogMetadata } from "../actions/types";
import { TagsCarousel } from "./tags-carousel";

export const BlogCard = ({ blog }: { blog: BlogMetadata }) => {
	return (
		<div
			className={cn(
				"group/blog relative min-w-0 rounded-[calc(var(--radius-2xl)+calc(var(--spacing)*1.5))] bg-card p-1.5 shadow-md transition-[box-shadow,translate] hover:-translate-y-4 hover:shadow-lg"
			)}
		>
			<Link
				className={cn("absolute inset-0 z-10")}
				data-label="Blog card"
				data-location="blogs_list"
				data-slug={blog.slug}
				data-track="cta_click"
				href={`/blogs/${blog.slug}`}
			/>
			<div className={cn("relative aspect-5/4 overflow-hidden rounded-2xl")}>
				<Noise />
				<Image
					alt={`${blog.title} blog cover by Ziron Media`}
					className="object-cover transition-[scale] group-hover/blog:scale-105"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 400px"
					src={blog.image}
				/>
			</div>
			<div className="flex w-full min-w-0 flex-col space-y-2 p-3">
				{blog.tags && <TagsCarousel tags={blog.tags} />}

				<h3 className="line-clamp-2 font-medium text-lg tracking-tight transition-colors group-hover/blog:text-primary md:text-xl">
					{blog.title}
				</h3>
			</div>
		</div>
	);
};
