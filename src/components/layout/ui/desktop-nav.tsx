import Link from "next/link";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { IconCalender } from "@/assets/icons/calender";

import { cn } from "@/lib/utils";

import { NAV_LINKS } from "../data/constants";
import { ListItem } from "./list-item";
import { ProductsNavbar } from "./products-navbar";
import { ServicesNavbar } from "./services-navbar";
export type LinkItemType = {
	label: string;
	href: string;
	icon: React.ReactNode;
	description?: string;
};

export const companyLinks: LinkItemType[] = [
	{
		label: "About Us",
		href: "#",
		description: "Learn more about our story and team",
		icon: <IconCalender />,
	},
	{
		label: "Customer Stories",
		href: "#",
		description: "See how we've helped our clients succeed",
		icon: <IconCalender />,
	},
	{
		label: "Partnerships",
		href: "#",
		icon: <IconCalender />,
		description: "Collaborate with us for mutual growth",
	},
];

export const companyLinks2: LinkItemType[] = [
	{
		label: "Terms of Service",
		href: "#",
		icon: <IconCalender />,
	},
	{
		label: "Privacy Policy",
		href: "#",
		icon: <IconCalender />,
	},
	{
		label: "Refund Policy",
		href: "#",
		icon: <IconCalender />,
	},
	{
		label: "Blog",
		href: "#",
		icon: <IconCalender />,
	},
	{
		label: "Help Center",
		href: "#",
		icon: <IconCalender />,
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
									<div className="grid w-lg grid-cols-2 gap-2">
										<div className="space-y-2 rounded-lg border bg-card p-2 shadow">
											{companyLinks.map((item, i) => (
												<NavigationMenuLink
													className="rounded-sm"
													key={`item-${item.label}-${Number(i)}`}
													render={<LinkItem {...item} />}
												/>
											))}
										</div>
										<div className="space-y-2 p-3">
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
		<a
			className={cn("flex items-center gap-x-2", className)}
			href={href}
			{...props}
		>
			<div
				className={cn(
					"flex aspect-square size-12 items-center justify-center rounded-md border bg-card text-sm shadow-sm",
					"[&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground"
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
		</a>
	);
}
