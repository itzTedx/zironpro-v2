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

import { NAV_LINKS } from "../data/constants";
import { ListItem } from "./list-item";
import { ProductsNavbar } from "./products-navbar";
import { ServicesNavbar } from "./services-navbar";

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
