import RSS from "rss";

import { siteConfig } from "@/data/site-config";
import { getBlogs } from "@/features/articles/actions/query";
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
		const url = `${baseUrl}/blogs/${blog.slug}`;
		const imageUrl = blog.image ? absoluteUrl(blog.image) : undefined;
		const mime = blog.image ? mimeFromImagePath(blog.image) : undefined;
		const enclosure =
			imageUrl && mime ? { url: imageUrl, type: mime } : undefined;

		feed.item({
			title: blog.meta.title ?? blog.title,
			description: blog.meta.description ?? blog.description,
			url,
			guid: url,
			date: blog.date,
			categories: blog.tags,
			author: blog.author,
			...(enclosure ? { enclosure } : {}),
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
