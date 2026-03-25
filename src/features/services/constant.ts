import { IconCog } from "@/assets/icons/cog";
import { IconDesktopPoint } from "@/assets/icons/desktop";
import { IconPlay } from "@/assets/icons/play";
import { IconPrinter } from "@/assets/icons/printer";
import { IconSpeaker } from "@/assets/icons/speaker";
import { IconTarget } from "@/assets/icons/target";

export const SERVICES = [
	{
		id: 1,
		slug: "branding",
		color: "text-green-500",
		bg: "/images/services/bg/bg-branding.png",
		icon: IconTarget,
		title: "Branding",
		alt: "Logo design, visual identity, and brand guidelines",
		description:
			"Building strong, memorable brands through strategy, identity design, and consistent visual systems.",
		image: "/images/services/logo-design.jpg",
		lists: [
			{
				title: "Logo Design",
				slug: "logo-design",
				image: "/images/services/logo-design.jpg",
				description: "Logos that represent your brand.",
			},
			{
				title: "Brand Guidelines",
				slug: "brand-guidelines",
				image: "/images/services/brand-guidelines.webp",
				description: "Guidelines for consistency and clarity.",
			},
			{
				title: "Pitch Decks",
				slug: "pitch-decks",
				image: "/images/services/pitch-deck.png",
				description: "Pitch decks to secure funding.",
			},
			{
				title: "Packaging Design",
				slug: "packaging-design",
				image: "/images/services/package/package-2.webp",
				description: "Functional, aesthetic packaging design.",
			},
			{
				title: "Brand Revamps",
				slug: "brand-revamps",
				image: "/images/services/branding.jpg",
				description: "Modern, appealing brand revamps.",
			},
		],
	},
	{
		id: 2,
		slug: "websites",
		icon: IconDesktopPoint,
		color: "text-blue-500",
		bg: "/images/services/bg/bg-websites.png",
		title: "Websites",
		description:
			"Designing and developing fast, scalable, and conversion-focused websites that grow with your business.",
		alt: "Fast, scalable, conversion-focused sites",
		image: "/images/services/web-dev.webp",
		lists: [
			{
				title: "Website Design & Development",
				slug: "design-and-dev",
				image: "/images/services/web-dev.webp",
				description: "Functional, beautiful website design.",
			},
			{
				title: "Web Revamps",
				slug: "web-revamps",
				image: "/images/services/website.jpg",
				description: "Modern, appealing web revamps.",
			},
			{
				title: "Search Engine Optimization (SEO)",
				slug: "seo",
				image: "/images/services/seo.webp",
				description: "Search engine visibility optimization.",
			},
			{
				title: "Website Management",
				slug: "management",
				image: "/images/services/website.jpg",
				description: "Keep site up and running.",
			},
		],
	},
	{
		id: 3,
		slug: "marketing",
		icon: IconSpeaker,
		color: "text-yellow-500",
		bg: "/images/services/bg/bg-marketing.png",
		title: "Digital Marketing",
		description:
			"Driving visibility, engagement, and leads through data-driven digital marketing strategies.",
		alt: "SEO, social media, content, and paid ads",
		image: "/images/services/social.jpg",
		lists: [
			{
				title: "Social Media Creatives",
				slug: "social-media",
				image: "/images/services/social.jpg",
				description: "Engaging, informative social content.",
			},
			{
				title: "Content Strategy",
				slug: "content-strategy",
				image: "/images/services/content-strategy.webp",
				description: "Content strategy for your goals.",
			},
			{
				title: "Paid Ads",
				slug: "paid-ads",
				image: "/images/services/paid-ads.webp",
				description: "Paid ads for your goals.",
			},
		],
	},
	{
		id: 4,
		slug: "printing",
		icon: IconPrinter,
		color: "text-purple-500",
		bg: "/images/services/bg/bg-printing.png",
		title: "Printing & Corporate Gifts",
		description:
			"High-quality printing and branded merchandise that enhance visibility and leave a lasting impression.",
		alt: "Branded merchandise and marketing collateral",
		image: "/images/services/corporate-gifts.webp",
		lists: [
			{
				title: "Offset & Digital Printing",
				slug: "offset-and-digital",
				image: "/images/services/offset-digital.webp",
				description: "Offset and digital printing.",
			},
			{
				title: "Merchandise",
				slug: "merchandise",
				image: "/images/services/merchandise.webp",
				description: "Branded merchandise for your goals.",
			},
			{
				title: "Custom Corporate Gifts",
				slug: "custom-corporate-gifts",
				image: "/images/services/corporate-gifts.webp",
				description: "Corporate gifts for your goals.",
			},
			{
				title: "Stationary & Corporate Identity",
				slug: "stationary-and-corporate-identity",
				image: "/images/services/stationary-corporate-identity.webp",
				description: "Stationery and corporate identity.",
			},
			{
				title: "Stickers",
				slug: "stickers",
				image: "/images/services/stickers.webp",
				description: "Branded stickers for your goals.",
			},
		],
	},
	{
		id: 5,
		slug: "motion",
		icon: IconPlay,
		color: "text-orange-500",
		bg: "/images/services/bg/bg-motion.png",
		title: "Motion Design & Video",
		description:
			"Bringing stories to life through engaging motion graphics and impactful video content.",
		alt: "Explainer videos, motion graphics, and brand videos",
		image: "/images/services/motion.webp",
		lists: [
			{
				title: "Motion Graphics",
				slug: "motion-graphics",
				image: "/images/services/motion-graphics.webp",
				description: "Motion graphics for your goals.",
			},
			{
				title: "Explainer Videos",
				slug: "explainer-videos",
				image: "/images/services/motion.avif",
				description: "Explainer videos for your goals.",
			},
			{
				title: "Brand Launch Videos",
				slug: "brand-launch-videos",
				image: "/images/services/brand-launch.webp",
				description: "Brand launch videos for goals.",
			},
		],
	},
	{
		id: 6,
		slug: "full-stack",
		icon: IconCog,
		color: "text-red-500",
		bg: "/images/services/bg/bg-full-stack.png",
		title: "Full-stack Marketing",
		description:
			"End-to-end marketing solutions that align strategy, content, and execution for scalable growth.",
		alt: "End‑to‑end strategy, content, and campaign execution",
		image: "/images/services/full-stack.webp",
		lists: [
			{
				title: "Marketing & Growth Strategy",
				slug: "marketing-and-growth-strategy",
				image: "/images/services/marketing-growth.webp",
				description: "Marketing and growth strategy.",
			},
			{
				title: "Emails & Newsletters",
				slug: "emails-and-newsletters",
				image: "/images/services/email-newsletter.webp",
				description: "Emails and newsletters for goals.",
			},
			{
				title: "Copywriting",
				slug: "copywriting",
				image: "/images/services/copy-writing.webp",
				description: "Copywriting for your goals.",
			},
			{
				title: "Technical Content Writing",
				slug: "technical-content-writing",
				image: "/images/services/tech-content-writing.webp",
				description: "Technical content for your goals.",
			},
			{
				title: "Campaigns",
				slug: "campaigns",
				image: "/images/services/campaigns.webp",
				description: "Campaigns for your goals.",
			},
			{
				title: "Social Media Management",
				slug: "social-media-management",
				image: "/images/services/social-media-management.webp",
				description: "Social media management for goals.",
			},
			{
				title: "Community, Events, Podcasts",
				slug: "community-events-podcasts",
				image: "/images/services/events-podcasts.webp",
				description: "Community, events, and podcasts.",
			},
			{
				title: "Strategic Partnerships",
				slug: "strategic-partnerships",
				image: "/images/services/strategic-partnerships.webp",
				description: "Strategic partnerships for your goals.",
			},
		],
	},
] as const;
