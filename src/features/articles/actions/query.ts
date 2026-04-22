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

export function getFeaturedBlogs(limit?: number): BlogMetadata[] {
	const featuredBlogs = getBlogs().filter((blog) => blog.isFeatured);

	if (limit) {
		return featuredBlogs.slice(0, limit);
	}

	return featuredBlogs;
}

export function getFeaturedBlog(): BlogMetadata | null {
	return getFeaturedBlogs(1)[0] ?? null;
}

function normalizeSearchText(value: string): string {
	return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Filters blogs by `query` (space-separated tokens; all must match). Matches title, descriptions, tags, category, and author. */
export function filterBlogsByQuery(
	blogs: BlogMetadata[],
	query: string
): BlogMetadata[] {
	const normalized = normalizeSearchText(query);
	if (!normalized) return blogs;

	const tokens = normalized.split(" ").filter(Boolean);
	return blogs.filter((blog) => {
		const haystack = normalizeSearchText(
			[
				blog.title,
				blog.meta.title,
				blog.description,
				blog.meta.description,
				blog.category,
				blog.author,
				...blog.tags,
			].join(" ")
		);
		return tokens.every((token) => haystack.includes(token));
	});
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
