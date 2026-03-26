import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import MDXContent from "@/components/markdown/mdx-component";
import { Badge } from "@/components/ui/badge";
import { PageTOC, PageTOCItems, TOCProvider } from "@/components/ui/toc";

import { getBlogBySlug, getBlogs } from "@/features/articles/actions/query";
import { Blogs } from "@/features/articles/views/blogs";
import { Faq, FaqContent } from "@/features/services/components/faq";
import {
	buildArticleSchema,
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
	const blogs = getBlogs();
	return blogs.map((b) => ({
		slug: b.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const blog = getBlogBySlug(slug);

	return createPageMetadata({
		title: `${blog.metadata.meta.title} | ZironPro UAE`,
		description:
			`${blog.metadata.meta.description} Insights for businesses in Dubai, Abu Dhabi, Sharjah, and across the UAE.`,
		path: `/blogs/${blog.metadata.slug}`,
		image: blog.metadata.image,
		type: "article",
		keywords: blog.metadata.tags,
	});
}

export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
	const { slug } = await params;

	const blog = getBlogBySlug(slug);
	const canonicalPath = `/blogs/${blog.metadata.slug}`;
	const webPageSchema = buildWebPageSchema(
		`${blog.metadata.meta.title} | ZironPro UAE`,
		`${blog.metadata.meta.description} Insights for businesses in Dubai, Abu Dhabi, Sharjah, and across the UAE.`,
		canonicalPath
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Blogs", path: "/blogs" },
		{ name: blog.metadata.title, path: canonicalPath },
	]);
	const articleSchema = buildArticleSchema({
		title: blog.metadata.meta.title,
		description: blog.metadata.meta.description,
		path: canonicalPath,
		image: blog.metadata.image,
		datePublished: blog.metadata.date,
		authorName: blog.metadata.author,
	});
	const hasFaq = blog.content.includes("FaqContent");
	const faqSchema = hasFaq
		? buildFaqSchema([
				{
					question: `What does ${blog.metadata.meta.title} cover?`,
					answer: blog.metadata.meta.description,
				},
		  ])
		: null;

	return (
		<main>
			<Script id="schema-blog-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-blog-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<Script id="schema-blog-article" type="application/ld+json">
				{JSON.stringify(articleSchema)}
			</Script>
			{faqSchema ? (
				<Script id="schema-blog-faq" type="application/ld+json">
					{JSON.stringify(faqSchema)}
				</Script>
			) : null}
			<header>
				<div className="dashed dashed-x container mx-auto max-w-7xl space-y-12 py-12">
					<div className="mx-auto grid max-w-4xl">
						<div className="col-span-2 space-y-3">
							<div className="flex items-center gap-3">
								<time
									className="font-medium tracking-tight"
									dateTime={blog.metadata.date}
								>
									{blog.metadata.date}
								</time>
								<div className="size-1.5 rounded-full bg-brand-secondary" />{" "}
								<p className="text-muted-foreground">6 min read</p>
							</div>
							<h1 className="text-balance font-bold font-display text-4xl text-primary uppercase sm:text-5xl md:text-6xl">
								{blog.metadata.title}
							</h1>
							<div className="flex flex-wrap gap-3 md:gap-4">
								{blog.metadata.tags.map((tag) => (
									<Badge key={tag}>
										<span className="size-1 rounded-full bg-brand-secondary" />{" "}
										{tag}
									</Badge>
								))}
							</div>
							<p className="font-medium text-lg text-muted-foreground md:text-xl">
								{blog.metadata.description}
							</p>
						</div>
					</div>
				</div>
				<div className="dashed dashed-y relative py-12">
					<div className="container max-w-7xl">
						<div className="relative z-10 aspect-video overflow-hidden rounded-2xl shadow-sm">
							<Image
								alt={`${blog.metadata.title} blog header by Ziron Media`}
								className="object-cover"
								fill
								priority
								sizes="(max-width: 1280px) 100vw, 1280px"
								src={blog.metadata.image}
							/>
						</div>
					</div>
					<div className="pointer-events-none absolute inset-0 mb-px bg-linear-0 from-white" />
				</div>
			</header>
			<TOCProvider>
				<section className="dashed dashed-x mx-auto grid max-w-7xl grid-cols-[auto_20rem]">
					<article className="prose prose-stone prose-lg prose-headings:mt-0 max-w-none prose-hr:border-muted/60 prose-a:text-primary">
						<MDXContent
							components={{
								a: (props) => (
									<Link
										{...props}
										className={cn(
											"group no-underline! relative items-center",
											"before:pointer-events-none before:absolute before:top-[1.3em] before:left-0 before:h-[0.072em] before:w-full before:bg-current before:content-['']",
											"prose-headings:text-primary before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
											"hover:before:origin-left hover:before:scale-x-100"
										)}
									/>
								),
								h1: (props) => <h2 id={slugify(props.children)} {...props} />,
								h2: (props) => <h2 id={slugify(props.children)} {...props} />,
								h3: (props) => <h3 id={slugify(props.children)} {...props} />,
								h4: (props) => <h4 id={slugify(props.children)} {...props} />,
								h5: (props) => <h5 id={slugify(props.children)} {...props} />,
								h6: (props) => <h6 id={slugify(props.children)} {...props} />,
								Section: (props) => <Section {...props} />,
								Faq,
								FaqContent,
							}}
							source={blog.content}
						/>
					</article>

					<aside className="dashed dashed-x dashed-r-0 h-full shrink-0 px-px">
						<div className="h-full bg-floating px-6 py-12">
							<PageTOC className="sticky top-20 h-fit">
								<p className="font-medium text-sm">On This Page</p>
								<PageTOCItems variant="clerk" />
							</PageTOC>
						</div>
					</aside>
				</section>
			</TOCProvider>

			<Blogs />
		</main>
	);
}

function Section(props: React.ComponentProps<"div">) {
	return (
		<section className="dashed last:dashed-b-0 dashed-t pt-9 pb-4">
			<div {...props} className="mx-auto max-w-prose" />
		</section>
	);
}
