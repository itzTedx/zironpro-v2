export type BlogMetadata = {
	title: string;
	description: string;
	meta: {
		title: string;
		description: string;
	};
	engagement?: {
		panelTitle?: string;
		prompts?: string[];
		closingNote?: string;
		cta?: {
			label: string;
			href: string;
		};
	};
	image: string;
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
