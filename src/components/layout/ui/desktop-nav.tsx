import { Route } from "next";
import Link from "next/link";

import {
	Building2Icon,
	FileBadgeIcon,
	LeafIcon,
	MessageSquareTextIcon,
	ShieldCheckIcon,
	SmilePlusIcon,
	StarIcon,
} from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

import { NAV_LINKS } from "../data/constants";
import { ListItem } from "./list-item";
import { ProductsNavbar } from "./products-navbar";
import { ServicesNavbar } from "./services-navbar";
export type LinkItemType = {
	label: string;
	href: Route;
	icon: React.ReactNode;
	description?: string;
};

export const companyLinks: LinkItemType[] = [
	{
		label: "About Us",
		href: "/about",
		description: "Learn more about our story and team",
		icon: <Building2Icon />,
	},
	{
		label: "Customer Stories",
		href: "/our-works",
		description: "See how we've helped our clients succeed",
		icon: <SmilePlusIcon />,
	},
	{
		label: "Partnerships",
		href: "#",
		icon: <StarIcon />,
		description: "Collaborate with us for mutual growth",
	},
];

export const companyLinks2: LinkItemType[] = [
	{
		label: "FAQs",
		href: "/faqs",
		icon: <MessageSquareTextIcon />,
	},
	{
		label: "Blogs",
		href: "/blogs",
		icon: <LeafIcon />,
	},
	{
		label: "Terms of Service",
		href: "/terms-of-service",
		icon: <FileBadgeIcon />,
	},
	{
		label: "Privacy Policy",
		href: "/privacy-policy",
		icon: <ShieldCheckIcon />,
	},
];

export const DesktopNav = () => {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				{NAV_LINKS.map((link) =>
					link.submenu ? (
						<NavigationMenuItem key={link.label}>
							<NavigationMenuTrigger>
								{link.href ? (
									<Link href={link.href}>{link.label}</Link>
								) : (
									link.label
								)}
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								{link.label === "Products" ? (
									<ProductsNavbar submenu={link.submenu} />
								) : link.label === "Services" ? (
									<ServicesNavbar submenu={link.submenu} />
								) : link.label === "Company" ? (
									<div className="grid w-lg grid-cols-[1fr_.75fr] gap-2">
										<div className="space-y-3 rounded-lg border bg-card p-2 shadow">
											{companyLinks.map((item, i) => (
												<NavigationMenuLink
													className="rounded-sm p-0"
													key={`item-${item.label}-${Number(i)}`}
													render={<LinkItem {...item} />}
												/>
											))}
										</div>
										<div className="space-y-2 py-3">
											{companyLinks2.map((item, i) => (
												<NavigationMenuLink
													href={item.href}
													key={`item-${item.label}-${Number(i)}`}
												>
													{item.icon}
													{item.label}
												</NavigationMenuLink>
											))}
										</div>
									</div>
								) : (
									<ul className="w-96">
										{link.submenu.map((sub) => (
											<ListItem
												href={sub.href}
												id={sub.id}
												key={sub.title}
												title={sub.title}
											>
												{sub.description}
											</ListItem>
										))}
									</ul>
								)}
							</NavigationMenuContent>
						</NavigationMenuItem>
					) : (
						<NavigationMenuItem key={link.label}>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								render={<Link href={link.href!} />}
							>
								{link.label}
							</NavigationMenuLink>
						</NavigationMenuItem>
					)
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export function LinkItem({
	label,
	description,
	icon,
	className,
	href,
	...props
}: React.ComponentProps<"a"> & LinkItemType) {
	return (
		<Link
			className={cn("flex items-center gap-x-2", className)}
			href={href}
			{...props}
		>
			<div
				className={cn(
					"inset-shadow-[0_1px_--theme(--color-white/56%)] flex aspect-square size-12 items-center justify-center rounded-md border border-primary bg-linear-to-t from-primary to-brand-400 text-brand-950 text-sm shadow-primary/24 shadow-xs [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-yellow-950"
				)}
			>
				{icon}
			</div>
			<div className="flex flex-col items-start justify-center">
				<span className="font-medium">{label}</span>
				<span className="line-clamp-2 text-muted-foreground text-xs">
					{description}
				</span>
			</div>
		</Link>
	);
}
