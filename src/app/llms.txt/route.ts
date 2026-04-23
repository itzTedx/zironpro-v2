import { getBlogs } from "@/features/articles/actions/query";
import { SERVICES } from "@/features/services/constant";
import { formatIndustryTitle, INDUSTRY_SLUGS } from "@/lib/industry-seo";
import {
	formatLocation,
	formatService,
	LOCATION_SLUGS,
	SERVICE_SLUGS,
	serviceLocationPath,
} from "@/lib/location-seo";
import { getBaseUrl } from "@/lib/seo";

type LinkItem = {
	label: string;
	href: string;
	description: string;
};

function toAbsoluteUrl(baseUrl: string, href: string): string {
	return href.startsWith("http") ? href : `${baseUrl}${href}`;
}

function asLinkLine(baseUrl: string, item: LinkItem): string {
	return `[${item.label}](${toAbsoluteUrl(baseUrl, item.href)}): ${item.description}`;
}

function section(title: string, lines: string[]): string {
	return [`## ${title}`, ...lines, ""].join("\n");
}

function subsection(title: string, lines: string[]): string {
	return [`### ${title}`, ...lines, ""].join("\n");
}

function buildLlmsText(baseUrl: string): string {
	const blogs = getBlogs(10);

	const headline = "# ZironPro - Digital Marketing Agency in UAE";
	const intro =
		"ZironPro: A full-service digital marketing and creative partner for branding, websites, SEO, performance marketing, and content-led growth across the UAE.";

	const overviewSection = section("Overview", [
		asLinkLine(baseUrl, {
			label: "ZironPro",
			href: "/",
			description:
				"Main entry point for agency services, featured work, and growth-focused capabilities.",
		}),
	]);

	const companySection = section("Company", [
		asLinkLine(baseUrl, {
			label: "About Us",
			href: "/about",
			description:
				"Learn about ZironPro's team, mission, and approach to measurable business growth.",
		}),
		asLinkLine(baseUrl, {
			label: "Contact",
			href: "/contact",
			description:
				"Get in touch for strategy consultations, project scoping, and partnership opportunities.",
		}),
		asLinkLine(baseUrl, {
			label: "FAQs",
			href: "/faqs",
			description:
				"Frequently asked questions about services, delivery process, and engagement models.",
		}),
	]);

	const serviceCategoryLines = SERVICES.map((service) =>
		asLinkLine(baseUrl, {
			label: service.title,
			href: `/services/${service.slug}`,
			description: service.description,
		})
	);

	const serviceOfferingLines = SERVICES.flatMap((service) =>
		service.lists.map(
			(item) =>
				`- [${item.title}](${baseUrl}/services/${service.slug}/${item.slug}): ${item.description}`
		)
	);

	const servicesSection = [
		"## Services",
		asLinkLine(baseUrl, {
			label: "All Services",
			href: "/services",
			description:
				"Explore all service categories and tailored offerings for growth, design, and digital marketing.",
		}),
		"",
		subsection("Service Categories", serviceCategoryLines).trimEnd(),
		subsection("Service Offerings", serviceOfferingLines).trimEnd(),
		"",
	].join("\n");

	const industriesSection = [
		"## Industries",
		asLinkLine(baseUrl, {
			label: "Industry Hub",
			href: "/industry",
			description:
				"Industry-specific marketing pages with tailored solutions and capability mapping.",
		}),
		"",
		subsection(
			"Industry Pages",
			INDUSTRY_SLUGS.map((slug) =>
				asLinkLine(baseUrl, {
					label: formatIndustryTitle(slug),
					href: `/industry/${slug}`,
					description: `Targeted marketing solutions for ${formatIndustryTitle(slug)} brands.`,
				})
			)
		).trimEnd(),
		"",
	].join("\n");

	const locationsSection = [
		"## Regional Pages",
		subsection(
			"Location Landing Pages",
			LOCATION_SLUGS.map((location) =>
				asLinkLine(baseUrl, {
					label: formatLocation(location),
					href: `/${location}`,
					description: `Location-specific marketing services for ${formatLocation(location)}, UAE.`,
				})
			)
		).trimEnd(),
		subsection(
			"Service + Location Pages",
			SERVICE_SLUGS.flatMap((service) =>
				LOCATION_SLUGS.map((location) =>
					asLinkLine(baseUrl, {
						label: `${formatService(service)} in ${formatLocation(location)}`,
						href: serviceLocationPath(service, location),
						description: `Service landing page for ${formatService(service)} in ${formatLocation(location)}.`,
					})
				)
			)
		).trimEnd(),
		"",
	].join("\n");

	const resourcesSection = [
		"## Resources",
		asLinkLine(baseUrl, {
			label: "Our Works",
			href: "/our-works",
			description: "Portfolio examples and case highlights from completed client projects.",
		}),
		asLinkLine(baseUrl, {
			label: "Blogs",
			href: "/blogs",
			description:
				"Articles on marketing, branding, SEO, websites, and practical growth strategy.",
		}),
		"",
		subsection(
			"Recent Blog Posts",
			blogs.map((blog) =>
				asLinkLine(baseUrl, {
					label: blog.meta.title,
					href: `/blogs/${blog.slug}`,
					description: blog.meta.description,
				})
			)
		).trimEnd(),
		"",
	].join("\n");

	const utilitySection = section("Additional Resources", [
		asLinkLine(baseUrl, {
			label: "Sitemap",
			href: "/sitemap.xml",
			description: "Machine-readable list of all indexed pages.",
		}),
		asLinkLine(baseUrl, {
			label: "RSS",
			href: "/rss.xml",
			description: "Blog feed for automated updates and syndication.",
		}),
		asLinkLine(baseUrl, {
			label: "Privacy Policy",
			href: "/privacy-policy",
			description: "How user data is collected, processed, and protected.",
		}),
		asLinkLine(baseUrl, {
			label: "Terms of Service",
			href: "/terms-of-service",
			description: "Legal terms that govern the use of this website and services.",
		}),
		asLinkLine(baseUrl, {
			label: "llms.txt",
			href: "/llms.txt",
			description:
				"Machine-readable guide to core pages, services, and resource URLs for LLM systems.",
		}),
	]);

	return [
		headline,
		"",
		intro,
		"",
		overviewSection.trimEnd(),
		companySection.trimEnd(),
		servicesSection.trimEnd(),
		industriesSection.trimEnd(),
		locationsSection.trimEnd(),
		resourcesSection.trimEnd(),
		utilitySection.trimEnd(),
		"",
	].join("\n");
}

export async function GET(): Promise<Response> {
	const baseUrl = getBaseUrl();
	const body = buildLlmsText(baseUrl);

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
