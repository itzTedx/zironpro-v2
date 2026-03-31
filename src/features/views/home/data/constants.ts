import { IconCheckmark } from "@/assets/icons/check";

import {
	BrandServed,
	Experience,
	Growth,
} from "../components/achievement-cards";

const COMPANY_START_YEAR = 2019;
const CURRENT_YEAR = new Date().getFullYear();

export const ACHIEVEMENTS = [
	{
		id: 1,
		title: "2k+ Brands Served",
		description:
			"Helping businesses across various industries achieve their goals",
		card: BrandServed,
	},
	{
		id: 2,
		title: `${CURRENT_YEAR - COMPANY_START_YEAR} Years of Experience`,
		description:
			"Proven expertise in design, marketing & technology to every project",
		card: Experience,
	},
	{
		id: 3,
		title: "100,000+ Growth for Brands",
		description: "Through smarter processes and scalable solutions",
		card: Growth,
	},
];

export const FEATURED_ITEMS = [
	{
		id: 1,
		title: "Digital Marketing",
		alt: "Digital Marketing for your goals.",
		image: "/images/featured/marketing.webp",
		icon: IconCheckmark,
	},
	{
		id: 2,
		title: "Branding",
		alt: "Logo Design for your Brand's Identity.",
		image: "/images/featured/logo-design.webp",
		icon: IconCheckmark,
	},
	{
		id: 3,
		title: "Website UI/UX Design",
		alt: "UI/UX Design for your website.",
		image: "/images/featured/ui-ux-design.webp",
		icon: IconCheckmark,
	},
	{
		id: 4,
		title: "Web Development",
		alt: "Website Development.",
		image: "/images/featured/web-dev.webp",
		icon: IconCheckmark,
	},
	{
		id: 5,
		title: "SEO & Content Marketing",
		alt: "SEO & Content Marketing for your website.",
		image: "/images/featured/seo.webp",
		icon: IconCheckmark,
	},
	{
		id: 6,
		title: "Motion Graphics",
		alt: "Motion Graphics for your brand.",
		image: "/images/featured/motion-graphics.webp",
		icon: IconCheckmark,
	},
	// {
	// 	id: 7,
	// 	title: "Digital Marketing",
	// 	alt: "Digital Marketing for your goals.",
	// 	image: "/images/direct.jpg",
	// 	icon: IconCheckmark,
	// },
	// {
	// 	id: 8,
	// 	title: "Digital Marketing",
	// 	alt: "Digital Marketing for your goals.",
	// 	image: "/images/direct.jpg",
	// 	icon: IconCheckmark,
	// },
];
