import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import MDXContent from "@/components/markdown/mdx-component";
import { Noise } from "@/components/shared/noise";
import { Badge } from "@/components/ui/badge";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

import { getBlogBySlug, getBlogs } from "@/features/articles/actions/query";
import { BlogPostSidebar } from "@/features/articles/components/blog-post-sidebar";
import {
	blogDateToIso,
	extractInternalLinks,
	getFallbackBlogs,
	getFallbackServices,
	getRelatedBlogs,
	getRelatedServices,
} from "@/features/articles/lib/blog-related";
import { Blogs } from "@/features/articles/views/blogs";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import { Faq, FaqContent } from "@/features/services/components/faq";
import {
	absoluteUrl,
	buildArticleSchema,
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";
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
	const publishedIso = blogDateToIso(blog.metadata.date);

	return createPageMetadata({
		title: `${blog.metadata.meta.title} | ZironPro UAE`,
		description: blog.metadata.meta.description,
		path: `/blogs/${blog.metadata.slug}`,
		image: blog.metadata.image,
		imageAlt: blog.metadata.alt ?? blog.metadata.title,
		imageWidth: 1200,
		imageHeight: 675,
		type: "article",
		keywords: blog.metadata.tags,
		authors: [blog.metadata.author],
		section: blog.metadata.category,
		...(publishedIso
			? { publishedTime: publishedIso, modifiedTime: publishedIso }
			: {}),
	});
}

export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
	const { slug } = await params;

	const blog = getBlogBySlug(slug);
	const internalLinks = extractInternalLinks(blog.content);
	const detectedBlogs = getRelatedBlogs(internalLinks, slug);
	const detectedServices = getRelatedServices(internalLinks);
	const relatedBlogs =
		detectedBlogs.length > 0 ? detectedBlogs : getFallbackBlogs(slug);
	const relatedServices =
		detectedServices.length > 0 ? detectedServices : getFallbackServices();
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
	return (
		<main>
			<ScrollIndicator />

			<JsonLdScript data={webPageSchema} id="schema-blog-webpage" />
			<JsonLdScript data={breadcrumbSchema} id="schema-blog-breadcrumb" />
			<JsonLdScript data={articleSchema} id="schema-blog-article" />

			<section className="relative w-full bg-[radial-gradient(ellipse_400%_240%_at_50%_100%,#fff,#fff_10%,15%,#c7c5fd_16%,rgba(154,103,250,.6)_17%,21%,#264cab_28%,35%,#00031d_45%,#00031d)]">
				<div className="dashed dashed-x container max-w-7xl py-16 text-center md:py-24">
					<div className="mb-4 flex flex-wrap items-center justify-center gap-4">
						<Badge>{blog.metadata.category}</Badge>
						<div className="size-2 rounded-[2px] bg-primary" />
						<p className="text-muted">{blog.metadata.date}</p>
					</div>
					<h1 className="mx-auto max-w-6xl text-balance font-display font-semibold text-4xl text-primary md:text-5xl lg:text-6xl">
						{blog.metadata.title}
					</h1>
					<p className="mx-auto mt-4 max-w-6xl text-balance text-2xl text-card leading-relaxed tracking-tight">
						{blog.metadata.description}
					</p>
					<div className="relative mx-auto mt-9 aspect-video max-w-4xl overflow-hidden rounded-xl shadow-md">
						<Image
							alt={blog.metadata.title}
							className="object-cover"
							fill
							src={blog.metadata.image}
						/>
					</div>
				</div>
				<Noise />
			</section>

			<div className="dashed dashed-t relative overflow-x-clip">
				<div className="dashed dashed-x container flex max-w-7xl flex-col-reverse justify-between gap-5 overflow-x-clip py-16 lg:flex-row lg:gap-22 lg:py-20">
					<BlogPostSidebar
						relatedBlogs={relatedBlogs}
						relatedServices={relatedServices}
						shareTitle={blog.metadata.title}
						shareUrl={absoluteUrl(canonicalPath)}
					/>
					<article className="prose prose-stone prose-lg mx-auto prose-headings:mt-0 max-w-none space-y-8 prose-hr:border-muted/60 prose-a:text-primary lg:max-w-[800px]">
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
								// h1: (props) => <h2 id={slugify(props.children)} {...props} />,
								// h2: (props) => <h2 id={slugify(props.children)} {...props} />,
								// h3: (props) => <h3 id={slugify(props.children)} {...props} />,
								// h4: (props) => <h4 id={slugify(props.children)} {...props} />,
								// h5: (props) => <h5 id={slugify(props.children)} {...props} />,
								// h6: (props) => <h6 id={slugify(props.children)} {...props} />,
								// Section: (props) => <Section {...props} />,
								Faq,
								FaqContent,
							}}
							source={blog.content}
						/>
					</article>
				</div>
				<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
			</div>

			<Blogs />
		</main>
	);
}
