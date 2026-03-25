import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

import { IconCalender } from "@/assets/icons/calender";

import { siteConfig } from "@/data/site-config";
import { getBlogs } from "@/features/articles/actions/query";
import { BlogCard } from "@/features/articles/components/blog-card";

export async function generateMetadata(): Promise<Metadata> {
	const title = `Blogs - ${siteConfig.shortName}`;

	return {
		title,
		description:
			"Explore marketing insights, web development resources, and strategies designed to help your brand grow.",
		alternates: {
			canonical: "/blogs",
		},
		openGraph: {
			title,
			description:
				"Explore marketing insights, web development resources, and strategies designed to help your brand grow.",
			url: `${siteConfig.url}/blogs`,
			images: [siteConfig.ogImage],
			type: "website",
			siteName: siteConfig.title,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description:
				"Explore marketing insights, web development resources, and strategies designed to help your brand grow.",
			images: [siteConfig.ogImage],
			creator: "@",
		},
	};
}

export default async function BlogsPage() {
	const blogs = getBlogs();

	return (
		<main>
			<section className="relative bg-[radial-gradient(--alpha(var(--color-gray-500)/0.1)_1px,transparent_1px)] bg-gray-1400 bg-size-[16px_16px]">
				<header className="dashed dashed-x relative z-10 mx-auto max-w-7xl py-16 md:py-20">
					<div className="mx-auto max-w-5xl space-y-4 py-12 text-center">
						<Badge>
							<IconCalender className="text-brand-600" /> Blogs
						</Badge>

						<h1 className="mx-auto font-black font-display text-4xl text-primary text-shadow-[-1px_-1px_var(--color-brand-600)] uppercase md:text-6xl lg:text-7xl">
							Marketing Insights
						</h1>

						<p className="text-balance text-2xl text-muted leading-relaxed tracking-tight">
							Latest articles and resources to help you build, scale, and
							convert.
						</p>
					</div>
				</header>
			</section>

			<section className="dashed dashed-y relative py-9 md:py-14">
				<header className="mx-auto mb-6 flex max-w-7xl flex-col gap-2 px-6 md:mb-10 md:flex-row md:items-end md:justify-between md:px-0">
					<h2 className="font-display font-semibold text-2xl tracking-tight md:text-3xl">
						All blog posts
					</h2>
					<p className="text-muted-foreground text-sm md:text-base">
						{blogs.length} posts
					</p>
				</header>

				<div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
					{blogs.map((blog, i) => (
						<BlogCard blog={blog} index={i} key={blog.slug} />
					))}
				</div>

				<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
			</section>
		</main>
	);
}
