export type BlogMetadata = {
	title: string;
	description: string;
	meta: {
		title: string;
		description: string;
	};
	image: string;
	alt?: string;
	isFeatured?: boolean;
	slug: string;
	date: string;
	author: string;
	tags: string[];
	category: string;
};

export type Blog = {
	metadata: BlogMetadata;
	content: string;
};

export type RelatedBlog = {
	slug: string;
	title: string;
};

export type RelatedService = {
	href: string;
	title: string;
	image: string;
	alt: string;
};
