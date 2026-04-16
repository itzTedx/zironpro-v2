export const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ??
	process.env.BASE_URL ??
	"https://zironpro.ae";

export const siteConfig = {
	title:
		"Digital Marketing Agency in UAE | Website, SEO & Branding - Ziron Pro",
	shortName: "ZironPro",
	description:
		"UAE based digital marketing agency for SEO, Digital & Offset Printing, Web design and development, and social media that drive leads and revenue. Book a free strategy call today.",
	keywords: [
		"digital marketing agency Dubai, SEO services Dubai, PPC management, web design Dubai, social media marketing, web development, website, digital printing, nfc card",
	],
	companyName: "ZironPro Digital Design LLC",
	url: BASE_URL,
	logo: "/favicon.svg",
	ogImage: "/images/og.jpg",
	links: {
		// twitter: "https://x.com/itzTedx_",
		linkedin: "https://www.linkedin.com/company/zironpro",
		instagram: "https://www.instagram.com/zironpro/",
		facebook: "https://www.facebook.com/zironpro",
	},
	contact: "+971 58 171 1486",
	/** Custom meta for crawlers / internal tooling */
	siteCategory: "technology",
	siteClassification: "Digital Marketing Agency",
} as const;
