"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconCaretRight } from "@/assets/icons/caret";
import { Logo } from "@/assets/logo";

import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { DesktopNav } from "./ui/desktop-nav";
import { MobileNav } from "./ui/mobile-navbar";

export const Navbar = () => {
	const router = usePathname();
	const isScrolled = useIsScrolled(80);

	const homepage =
		router === "/" ||
		router.startsWith("/services") ||
		router.startsWith("/blogs");

	return (
		<header
			className={cn(
				"fixed top-0 z-999 w-full py-2.5 transition-[background-color_backdrop-filter] duration-300",
				isScrolled ? "bg-gray-1500/85 backdrop-blur-xl" : "",
				!homepage && "bg-gray-1500/85 backdrop-blur-xl"
			)}
		>
			<div className="container mx-auto flex max-w-7xl items-center justify-between gap-4">
				<div className="flex items-center gap-9">
					<Link
						className="relative z-50 flex items-center gap-2 transition-[filter] duration-300 hover:brightness-135"
						href="/"
					>
						<Logo className="h-6 w-auto md:h-7" />
						{/* <Wordmark className="mt-1 h-4 w-fit text-white md:h-5" isMono /> */}
					</Link>
					<DesktopNav />
				</div>
				<div className="flex items-center gap-2">
					<Button
						className="flex-row"
						data-label="Navbar - Start a project"
						data-location="navbar_primary"
						data-track="cta_click"
						id="signup-button"
						render={<Link href="/contact" />}
					>
						<span className="hidden md:inline">Start a project</span>
						<span className="md:hidden">Contact</span>
						<IconCaretRight className="hidden transition-transform duration-200 ease-in group-hover/button:translate-x-1 md:block" />
					</Button>
					<MobileNav />
				</div>
			</div>

			{/* <Noise className="opacity-40" /> */}
		</header>
	);
};
