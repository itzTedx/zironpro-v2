import { Suspense } from "react";

import type { Metadata } from "next";

import { siteConfig } from "@/data/site-config";
import { getBlogs } from "@/features/articles/actions/query";
import { BlogsSearchResults } from "@/features/articles/components/blogs-search-results";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export function generateMetadata(): Metadata {
	const blogs = getBlogs();
	const keywords = Array.from(
		new Set(blogs.flatMap((blog) => [blog.meta.title, ...blog.tags]))
	).slice(0, 12);

	const baseTitle = `Marketing, Tech & Business Growth Insights for UAE | ${siteConfig.shortName}`;
	const baseDescription =
		"Explore expert blogs on digital marketing, websites, technology, and business growth. Get practical insights to help UAE businesses scale smarter and faster.";

	return createPageMetadata({
		title: baseTitle,
		description: baseDescription,
		path: "/blogs",
		keywords,
	});
}

export default function BlogsPage() {
	const allBlogs = getBlogs();
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
				<Suspense
					fallback={
						<div className="mx-auto max-w-7xl px-6 text-card/90 md:px-0">
							Loading posts...
						</div>
					}
				>
					<BlogsSearchResults blogs={allBlogs} />
				</Suspense>

				<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
			</section>
		</main>
	);
}
