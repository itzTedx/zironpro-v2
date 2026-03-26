import { notFound } from "next/navigation";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

import { root } from "@/lib/root-mdx";

import { Blog, BlogMetadata } from "./types";

type ParsedBlogFrontmatter = Omit<BlogMetadata, "slug"> & {
	meta?: {
		title?: string;
		description?: string;
	};
};

function normalizeBlogMetadata(
	data: ParsedBlogFrontmatter,
	slug: string
): BlogMetadata {
	return {
		...data,
		meta: {
			title: data.meta?.title ?? data.title,
			description: data.meta?.description ?? data.description,
		},
		slug,
	};
}

export function getBlogs(limit?: number): BlogMetadata[] {
	const files = fs.readdirSync(root("blogs"));

	let products = files
		.map((file) => getBlogMetadata(file))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	if (limit) {
		return products.slice(0, limit);
	}

	return products;
}

export function getBlogBySlug(slug: string): Blog {
	// Validate slug to prevent path traversal
	if (
		!slug ||
		slug.includes("/") ||
		slug.includes("\\") ||
		slug.includes("..")
	) {
		notFound();
	}

	try {
		const filePath = path.join(root("blogs"), `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
		const { data, content } = matter(fileContent);
		const metadata = normalizeBlogMetadata(data as ParsedBlogFrontmatter, slug);
		return { metadata, content };
	} catch {
		return notFound();
	}
}

export function getBlogMetadata(
	filepath: string
): BlogMetadata & { slug: string } {
	const slug = filepath.replace(/\.mdx$/, "");

	const filePath = path.join(root("blogs", filepath));

	const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
	const { data } = matter(fileContent);
	return normalizeBlogMetadata(data as ParsedBlogFrontmatter, slug);
}
