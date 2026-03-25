"use client";

import * as React from "react";

import { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { IconCaretRight } from "@/assets/icons/caret";
import { IconMenu } from "@/assets/icons/menu";
import { IconNfc } from "@/assets/icons/nfc";

import { cn } from "@/lib/utils";

import { NAV_LINKS } from "../data/constants";
import { MobileProductsNavbar } from "./products-navbar";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<Drawer onOpenChange={setOpen} open={open}>
			<DrawerTrigger asChild>
				<Button
					className={cn(
						"extend-touch-target text-white hover:bg-white md:hidden"
					)}
					data-umami-event="Mobile nav - Open menu"
					size="icon-sm"
					variant="ghost"
				>
					<IconMenu />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent data-scroll-locked={open ? true : false}>
				<DrawerHeader className="sr-only">
					<DrawerTitle>Ziron Media</DrawerTitle>
					<DrawerDescription>Ziron Media</DrawerDescription>
				</DrawerHeader>
				<nav className="flex flex-col gap-12 overflow-auto px-6 py-6">
					<div className="flex flex-col gap-6">
						{NAV_LINKS.map((links) =>
							links.submenu ? (
								<ul className="space-y-2.5" key={links.label}>
									{links.label === "Products" ? (
										links.submenu?.map((sub) => (
											<MobileProductsNavbar key={sub.id} submenu={sub} />
										))
									) : (
										<li className="flex flex-col gap-2" key={links.label}>
											<h2 className="text-sm">{links.label}</h2>
											<div className="space-y-6">
												{links.submenu?.map((service) => (
													<MobileLink
														href={service.href}
														icon={service.icon}
														key={service.id}
														onOpenChange={setOpen}
													>
														{service.title}
													</MobileLink>
												))}
											</div>
										</li>
									)}
								</ul>
							) : (
								<MobileLink
									href={links.href!}
									key={links.label}
									onOpenChange={setOpen}
								>
									{links.label}
								</MobileLink>
							)
						)}
					</div>
				</nav>
				<DrawerFooter>
					<Button
						data-umami-event="Mobile nav - Start a project"
						render={<Link href="/contact" />}
						size="lg"
						variant="default"
					>
						Start a project
						<IconCaretRight className="hidden md:block" />
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function MobileLink({
	href,
	icon,
	onOpenChange,
	className,
	children,
	...props
}: {
	icon?: typeof IconNfc;
	href: Route;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}) {
	const router = useRouter();

	const Icon = icon;

	return (
		<Link
			className={cn("flex items-center gap-2 font-medium text-lg", className)}
			href={href}
			onClick={() => {
				router.push(href);
				onOpenChange?.(false);
			}}
			{...props}
		>
			{Icon && (
				<div>
					<Icon className="size-6 shrink-0 text-muted-foreground/70" />
				</div>
			)}
			{children}
		</Link>
	);
}
