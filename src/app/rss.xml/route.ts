import { marked } from "marked";
import RSS from "rss";

import { siteConfig } from "@/data/site-config";
import { getBlogBySlug, getBlogs } from "@/features/articles/actions/query";
import { absoluteUrl, getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

function mimeFromImagePath(imagePath: string): string | undefined {
	const lower = imagePath.toLowerCase();
	if (lower.endsWith(".webp")) return "image/webp";
	if (lower.endsWith(".png")) return "image/png";
	if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
	if (lower.endsWith(".gif")) return "image/gif";
	if (lower.endsWith(".avif")) return "image/avif";
	return undefined;
}

/** MDX FAQ blocks are app components; omit them from feed HTML */
function stripInteractiveMdx(source: string): string {
	return source.replace(/<Faq\b[\s\S]*?<\/Faq>\s*/gi, "");
}

function absolutizeResourceUrls(html: string, baseUrl: string): string {
	const origin = baseUrl.replace(/\/$/, "");
	return html
		.replace(/href="\/(?!\/)/g, `href="${origin}/`)
		.replace(/href='\/(?!\/)/g, `href='${origin}/`)
		.replace(/src="\/(?!\/)/g, `src="${origin}/`)
		.replace(/src='\/(?!\/)/g, `src='${origin}/`);
}

/** CDATA sections cannot contain the literal sequence `]]>` */
function escapeCdata(html: string): string {
	return html.replace(/]]>/g, "]]]]><![CDATA[>");
}

function blogMarkdownToHtml(rawMdx: string, baseUrl: string): string {
	const md = stripInteractiveMdx(rawMdx).trim();
	const html = marked.parse(md, { async: false, gfm: true });
	return escapeCdata(absolutizeResourceUrls(html, baseUrl));
}

export async function GET() {
	const baseUrl = getBaseUrl();
	const feedUrl = `${baseUrl}/rss.xml`;

	const feed = new RSS({
		title: `${siteConfig.shortName} — Insights`,
		description: siteConfig.description,
		feed_url: feedUrl,
		site_url: baseUrl,
		image_url: absoluteUrl(siteConfig.ogImage),
		language: "en",
		pubDate: new Date().toUTCString(),
		generator: "ZironPro",
	});

	for (const blog of getBlogs()) {
		const { metadata, content } = getBlogBySlug(blog.slug);
		const url = `${baseUrl}/blogs/${metadata.slug}`;
		const contentEncoded = blogMarkdownToHtml(content, baseUrl);
		const imageUrl = metadata.image ? absoluteUrl(metadata.image) : undefined;
		const mime = metadata.image ? mimeFromImagePath(metadata.image) : undefined;
		const enclosure =
			imageUrl && mime ? { url: imageUrl, type: mime } : undefined;

		feed.item({
			title: metadata.meta.title ?? metadata.title,
			description: metadata.meta.description ?? metadata.description,
			url,
			guid: url,
			date: metadata.date,
			categories: metadata.tags,
			author: metadata.author,
			custom_elements: [{ "content:encoded": { _cdata: contentEncoded } }],
			...(enclosure ? { enclosure } : {}),
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
