import Image from "next/image";
import Link from "next/link";

import { Noise } from "@/components/shared/noise";

import { cn } from "@/lib/utils";

import { BlogMetadata } from "../actions/types";

export const BlogCard = ({ blog }: { blog: BlogMetadata }) => {
	return (
		<Link
			className={cn(
				"group/blog relative h-fit rounded-[calc(var(--radius-2xl)+calc(var(--spacing)*1.5))] bg-card p-1.5 transition-[box-shadow,translate] hover:-translate-y-4 hover:shadow-sm"
			)}
			data-umami-event="Blog card"
			data-umami-event-slug={blog.slug}
			href={`/blogs/${blog.slug}`}
		>
			<div
				className={cn(
					"relative aspect-5/4 overflow-hidden rounded-2xl shadow-sm"
				)}
			>
				<Noise />
				<Image
					alt={blog.title}
					className="object-cover transition-[scale] group-hover/blog:scale-105"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 400px"
					src={blog.image}
				/>
			</div>
			<h3 className="p-3 font-medium text-2xl tracking-tight transition-colors group-hover/blog:text-primary">
				{blog.title}
			</h3>
		</Link>
	);
};
