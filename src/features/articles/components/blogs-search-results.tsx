"use client";

import { useMemo } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { BlogMetadata } from "@/features/articles/actions/types";

import { BlogCard } from "./blog-card";

interface BlogsSearchResultsProps {
	blogs: BlogMetadata[];
}

function normalizeSearchText(value: string): string {
	return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function filterBlogsByQuery(blogs: BlogMetadata[], query: string): BlogMetadata[] {
	const normalized = normalizeSearchText(query);
	if (!normalized) return blogs;

	const tokens = normalized.split(" ").filter(Boolean);
	return blogs.filter((blog) => {
		const haystack = normalizeSearchText(
			[
				blog.title,
				blog.meta.title,
				blog.description,
				blog.meta.description,
				blog.category,
				blog.author,
				...blog.tags,
			].join(" ")
		);
		return tokens.every((token) => haystack.includes(token));
	});
}

export function BlogsSearchResults({ blogs }: BlogsSearchResultsProps) {
	const searchParams = useSearchParams();
	const query = (searchParams.get("query") ?? "").trim();
	const filteredBlogs = useMemo(() => filterBlogsByQuery(blogs, query), [blogs, query]);

	return (
		<>
			<header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 px-6 md:mb-10 md:px-0">
				<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
					<h2 className="font-display font-semibold text-2xl text-card tracking-tight md:text-3xl">
						All blog posts
					</h2>
					<p className="text-muted-foreground text-sm md:text-base">
						{query
							? `${filteredBlogs.length} of ${blogs.length} posts`
							: `${filteredBlogs.length} posts`}
					</p>
				</div>

				<form
					action="/blogs"
					className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
					method="get"
					role="search"
				>
					<label className="sr-only" htmlFor="blogs-search-query">
						Search blog posts
					</label>
					<Input
						className="bg-card/10 text-card placeholder:text-muted"
						defaultValue={query}
						id="blogs-search-query"
						name="query"
						placeholder="Search by topic, tag, or keyword…"
						type="search"
					/>
					<div className="flex shrink-0 gap-2">
						<Button
							className="border-border/50 text-card hover:text-foreground"
							type="submit"
							variant="outline"
						>
							Search
						</Button>
						{query ? (
							<Button render={<Link href="/blogs" />} variant="ghost">
								Clear
							</Button>
						) : null}
					</div>
				</form>
			</header>

			{filteredBlogs.length === 0 ? (
				<p className="mx-auto max-w-7xl px-6 text-card/90 md:px-0">
					No posts match <span className="font-medium text-card">"{query}"</span>.
					Try different keywords or{" "}
					<Link className="underline underline-offset-2" href="/blogs">
						browse all posts
					</Link>
					.
				</p>
			) : (
				<div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
					{filteredBlogs.map((blog) => (
						<BlogCard
							blog={blog}
							className="bg-card/10 text-card"
							key={blog.slug}
							tagsClassName="text-muted"
						/>
					))}
				</div>
			)}
		</>
	);
}
