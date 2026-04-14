import RSS from "rss";

import { siteConfig } from "@/data/site-config";
import { getBlogs } from "@/features/articles/actions/query";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
	const baseUrl = getBaseUrl();
	const feedUrl = `${baseUrl}/rss.xml`;

	const feed = new RSS({
		title: siteConfig.shortName,
		description: siteConfig.description,
		feed_url: feedUrl,
		site_url: baseUrl,
		language: "en",
		pubDate: new Date().toUTCString(),
		generator: "ZironPro",
	});

	for (const metadata of getBlogs()) {
		const url = `${baseUrl}/blogs/${metadata.slug}`;

		feed.item({
			title: metadata.meta.title ?? metadata.title,
			description: metadata.meta.description ?? metadata.description,
			url,
			guid: url,
			date: metadata.date,
			categories: metadata.tags,
			author: metadata.author,
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
