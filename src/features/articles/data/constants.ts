export const ARTICLES: Article[] = [
	{
		id: 1,
		image: "/images/blogs/blog-1.jpeg",
		title: "How a Strong Digital Presence Helps Businesses Grow in 2025",
	},
	{
		id: 2,
		isFeatured: true,
		image: "/images/blogs/blog-2.jpg",
		title: "How Ziron pro Helps Brands Scale Digitally",
	},
	{
		id: 3,
		image: "/images/blogs/blog-3.jpeg",
		title: "How to Boost your Business with Social media?",
	},
];

export type Article = {
	id: number;
	image: string;
	isFeatured?: boolean;
	title: string;
};
