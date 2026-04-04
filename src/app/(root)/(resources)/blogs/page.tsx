import type { Metadata } from "next";
import Script from "next/script";

import { siteConfig } from "@/data/site-config";
import { getBlogs } from "@/features/articles/actions/query";
import { BlogCard } from "@/features/articles/components/blog-card";
import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
	const blogs = getBlogs();
	const keywords = Array.from(
		new Set(blogs.flatMap((blog) => [blog.meta.title, ...blog.tags]))
	).slice(0, 12);

	return createPageMetadata({
		title: `SEO & Growth Blogs in Dubai, UAE | ${siteConfig.shortName}`,
		description:
			"Read SEO, web design, and digital growth insights from ZironPro to help businesses in Dubai, Abu Dhabi, Sharjah, and the UAE convert more traffic.",
		path: "/blogs",
		keywords,
	});
}

export default async function BlogsPage() {
	const blogs = getBlogs();
	const webPageSchema = buildWebPageSchema(
		`SEO & Growth Blogs in Dubai, UAE | ${siteConfig.shortName}`,
		"Read SEO, web design, and digital growth insights from ZironPro to help businesses in Dubai, Abu Dhabi, Sharjah, and the UAE convert more traffic.",
		"/blogs"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Blogs", path: "/blogs" },
	]);
	// bg-[radial-gradient(--alpha(var(--color-gray-500)/0.1)_1px,transparent_1px)]  bg-size-[16px_16px]
	return (
		<main className="bg-taupe-900">
			<Script id="schema-blogs-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-blogs-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<section className="relative">
				<header className="dashed dashed-x container relative z-10 mx-auto max-w-7xl py-16 md:py-20">
					<div className="space-y-4 py-12">
						{/* <Badge>
							<IconCalender className="text-brand-600" /> Blogs
						</Badge> */}

						<h1 className="mx-auto font-bold font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] md:text-6xl lg:text-7xl">
							Insights
						</h1>

						<p className="max-w-4xl text-balance text-2xl text-muted leading-relaxed tracking-tight">
							Actionable strategies, expert insights, and proven ideas to help
							your business grow smarter in the digital world.
						</p>
					</div>
				</header>
			</section>

			<section className="dashed dashed-y relative py-9 md:py-14">
				<header className="mx-auto mb-6 flex max-w-7xl flex-col gap-2 px-6 md:mb-10 md:flex-row md:items-end md:justify-between md:px-0">
					<h2 className="font-display font-semibold text-2xl text-card tracking-tight md:text-3xl">
						All blog posts
					</h2>
					<p className="text-muted-foreground text-sm md:text-base">
						{blogs.length} posts
					</p>
				</header>

				<div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
					{blogs.map((blog) => (
						<BlogCard
							blog={blog}
							className="bg-card/10 text-card"
							key={blog.slug}
						/>
					))}
				</div>

				<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
			</section>
		</main>
	);
}
