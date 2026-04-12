import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { siteConfig } from "@/data/site-config";
import {
	filterBlogsByQuery,
	getBlogs,
} from "@/features/articles/actions/query";
import { BlogCard } from "@/features/articles/components/blog-card";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

type BlogsSearchParams = Promise<{ query?: string | string[] }>;

function pickSearchQuery(
	params: { query?: string | string[] } | undefined
): string {
	const raw = params?.query;
	if (Array.isArray(raw)) return raw[0]?.trim() ?? "";
	return raw?.trim() ?? "";
}

export async function generateMetadata({
	searchParams,
}: {
	searchParams: BlogsSearchParams;
}): Promise<Metadata> {
	const blogs = getBlogs();
	const keywords = Array.from(
		new Set(blogs.flatMap((blog) => [blog.meta.title, ...blog.tags]))
	).slice(0, 12);

	const query = pickSearchQuery(await searchParams);
	const baseTitle = `Marketing, Tech & Business Growth Insights for UAE | ${siteConfig.shortName}`;
	const baseDescription =
		"Explore expert blogs on digital marketing, websites, technology, and business growth. Get practical insights to help UAE businesses scale smarter and faster.";

	return createPageMetadata({
		title: query
			? `“${query}” — Blog search | ${siteConfig.shortName}`
			: baseTitle,
		description: query
			? `Blog posts matching “${query}” on ${siteConfig.shortName}. ${baseDescription}`
			: baseDescription,
		path: query ? `/blogs?query=${encodeURIComponent(query)}` : "/blogs",
		keywords,
	});
}

export default async function BlogsPage({
	searchParams,
}: {
	searchParams: BlogsSearchParams;
}) {
	const query = pickSearchQuery(await searchParams);
	const allBlogs = getBlogs();
	const blogs = filterBlogsByQuery(allBlogs, query);
	const webPageSchema = buildWebPageSchema(
		`Marketing, Tech & Business Growth Insights for UAE | ${siteConfig.shortName}`,
		"Explore expert blogs on digital marketing, websites, technology, and business growth. Get practical insights to help UAE businesses scale smarter and faster.",
		"/blogs"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Blogs", path: "/blogs" },
	]);
	// bg-[radial-gradient(--alpha(var(--color-gray-500)/0.1)_1px,transparent_1px)]  bg-size-[16px_16px]
	return (
		<main className="bg-taupe-900">
			<JsonLdScript data={webPageSchema} id="schema-blogs-webpage" />
			<JsonLdScript data={breadcrumbSchema} id="schema-blogs-breadcrumb" />
			<section className="relative">
				<header className="dashed dashed-x container relative z-10 mx-auto max-w-7xl py-16 md:py-20">
					<div className="space-y-4 py-12">
						{/* <Badge>
							<IconCalender className="text-brand-600" /> Blogs
						</Badge> */}

						<h1 className="mx-auto text-balance font-bold font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] md:text-6xl lg:text-7xl">
							Marketing & Business Growth Insights
						</h1>

						<p className="max-w-4xl text-balance text-2xl text-muted leading-relaxed tracking-tight">
							Real strategies. Proven ideas. From marketing and web to tech and
							business growth. Built for UAE brands that mean business.
						</p>
					</div>
				</header>
			</section>

			<section className="dashed dashed-y relative py-9 md:py-14">
				<header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 px-6 md:mb-10 md:px-0">
					<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
						<h2 className="font-display font-semibold text-2xl text-card tracking-tight md:text-3xl">
							All blog posts
						</h2>
						<p className="text-muted-foreground text-sm md:text-base">
							{query
								? `${blogs.length} of ${allBlogs.length} posts`
								: `${blogs.length} posts`}
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

				{blogs.length === 0 ? (
					<p className="mx-auto max-w-7xl px-6 text-card/90 md:px-0">
						No posts match{" "}
						<span className="font-medium text-card">“{query}”</span>. Try
						different keywords or{" "}
						<Link className="underline underline-offset-2" href="/blogs">
							browse all posts
						</Link>
						.
					</p>
				) : (
					<div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
						{blogs.map((blog) => (
							<BlogCard
								blog={blog}
								className="bg-card/10 text-card"
								key={blog.slug}
								tagsClassName="text-muted"
							/>
						))}
					</div>
				)}

				<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
			</section>
		</main>
	);
}
