export type BlogMetadata = {
	title: string;
	description: string;
	meta: {
		title: string;
		description: string;
	};
	image: string;
	isFeatured?: boolean;
	slug: string;
	date: string;
	author: string;
	tags: string[];
};

export type Blog = {
	metadata: BlogMetadata;
	content: string;
};
