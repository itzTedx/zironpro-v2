import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SOCIALS } from "@/components/layout/data/constants";

import { siteConfig } from "@/data/site-config";
import {
	filterBlogsByQuery,
	getBlogs,
	getFeaturedBlog,
} from "@/features/articles/actions/query";
import { BlogCard } from "@/features/articles/components/blog-card";
import { NewsletterSubscription } from "@/features/articles/components/newsletter-subscription";
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
	const featuredBlog = getFeaturedBlog();
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
				<header className="dashed dashed-x container relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 py-16 md:grid-cols-2 md:py-20">
					<div className="space-y-6 py-12">
						<h1 className="mx-auto text-balance font-display font-semibold text-4xl text-primary leading-[1.2] md:text-6xl">
							Marketing & Business Growth Tips & Insights
						</h1>

						<p className="max-w-4xl text-balance text-muted text-xl leading-relaxed tracking-tight">
							Real strategies. Proven ideas. From marketing and web to tech and
							business growth. Built for UAE brands that mean business.
						</p>
						<NewsletterSubscription />

						<div className="flex items-center gap-6 text-muted/60">
							<span>Follow us on:</span>
							<ul className="flex items-center gap-4">
								{SOCIALS.map((social) => (
									<li key={social.label}>
										<Link href={social.href}>
											<social.icon className="size-6 hover:text-primary" />
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					{featuredBlog ? (
						<Link
							className="relative rounded-2xl p-4 hover:bg-muted/10"
							href={`/blogs/${featuredBlog.slug}`}
						>
							<div className="relative aspect-6/4 overflow-hidden rounded-2xl border border-muted-foreground/50 shadow-lg">
								<Image
									alt={`${featuredBlog.title} blog cover by Ziron pro`}
									className="object-cover"
									fill
									src={featuredBlog.image}
								/>
							</div>
							<h2 className="mt-4 font-semibold text-card text-xl">
								{featuredBlog.title}
							</h2>
						</Link>
					) : null}
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
