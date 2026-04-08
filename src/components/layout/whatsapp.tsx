"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { domAnimation, LazyMotion, m } from "motion/react";

import { IconSocialWhatsapp } from "@/assets/icons/socials";

import { Button } from "../ui/button";
import { WaQrCode } from "./ui/wa-qrcode";

const staggerContainerVariants = {
	closed: {
		transition: {
			staggerChildren: 0.04,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			delayChildren: 0.08,
			staggerChildren: 0.06,
		},
	},
};

const staggerItemVariants = {
	closed: { opacity: 0, y: 12 },
	open: { opacity: 1, y: 0 },
};

export const WhatsappPopover = () => {
	const popoverRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [isContentHovered, setIsContentHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isPinnedOpen, setIsPinnedOpen] = useState(false);

	const isOpen = isHovered || isContentHovered || isFocused || isPinnedOpen;

	useEffect(() => {
		if (!isPinnedOpen) return;

		function handlePointerDown(event: PointerEvent) {
			const targetNode = event.target as Node | null;
			if (!targetNode) return;
			if (popoverRef.current?.contains(targetNode)) return;
			setIsPinnedOpen(false);
		}

		window.addEventListener("pointerdown", handlePointerDown);

		return () => {
			window.removeEventListener("pointerdown", handlePointerDown);
		};
	}, [isPinnedOpen]);

	return (
		<LazyMotion features={domAnimation}>
			<div
				className="group fixed right-3 bottom-6 z-999 md:bottom-16"
				ref={popoverRef}
			>
				<m.div
					animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
					className="fixed inset-0 bg-black/25"
					initial={false}
					onClick={() => setIsPinnedOpen(false)}
					style={{ pointerEvents: isOpen ? "auto" : "none" }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				/>

				<m.button
					animate={isOpen ? { x: -9, y: -9 } : { x: 0, y: 0 }}
					aria-expanded={isOpen}
					aria-haspopup="dialog"
					className="relative z-10 cursor-pointer rounded-full p-2 before:absolute before:inset-[-6px] before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
					data-popover-trigger
					onBlur={() => setIsFocused(false)}
					onClick={() => setIsPinnedOpen((prev) => !prev)}
					onFocus={() => setIsFocused(true)}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					transition={{
						delay: 0.05,
						damping: 24,
						mass: 0.7,
						stiffness: 340,
						type: "spring",
					}}
					type="button"
					whileTap={{ scale: 0.95 }}
				>
					<IconSocialWhatsapp className="text-muted-foreground transition-colors duration-300 ease-out group-hover:text-[#009236]" />
				</m.button>

				<m.div
					animate={
						isOpen
							? {
									clipPath: "inset(0 0 0 0 round var(--wa-popover-radius))",
									opacity: 1,
									scale: 1,
									y: 0,
								}
							: {
									clipPath:
										"inset(calc(100% - (var(--wa-popover-radius) * 2) - 0.5em) 1.25em 1.25em calc(100% - (var(--wa-popover-radius) * 1) - 1.25em) round var(--wa-popover-radius))",
									opacity: 0,
									scale: 0.96,
									y: 8,
								}
					}
					className="absolute right-0 bottom-0 flex w-3xs flex-col items-center bg-card p-6 py-9 text-center"
					data-popover-content
					initial={false}
					onMouseEnter={() => setIsContentHovered(true)}
					onMouseLeave={() => setIsContentHovered(false)}
					style={
						{
							"--wa-popover-radius": "var(--border-radius-m, 1rem)",
							pointerEvents: isOpen ? "auto" : "none",
							transformOrigin: "bottom right",
							willChange: "clip-path, transform, opacity",
						} as CSSProperties
					}
					transition={{
						clipPath: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
						opacity: { duration: 0.22, ease: "easeOut" },
						scale: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
						y: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
					}}
				>
					<m.div
						animate={isOpen ? "open" : "closed"}
						initial={false}
						variants={staggerContainerVariants}
					>
						<m.div
							className="mx-auto w-fit"
							transition={{ duration: 0.24, ease: "easeOut" }}
							variants={staggerItemVariants}
						>
							<WaQrCode className="size-28" />
						</m.div>
						<m.h2
							className="mt-3 font-bold font-display text-xl"
							transition={{ duration: 0.24, ease: "easeOut" }}
							variants={staggerItemVariants}
						>
							WhatsApp Us
						</m.h2>
						<m.p
							transition={{ duration: 0.24, ease: "easeOut" }}
							variants={staggerItemVariants}
						>
							Scan the QR code to chat with us via your smartphone.
						</m.p>

						<m.div
							transition={{ duration: 0.24, ease: "easeOut" }}
							variants={staggerItemVariants}
						>
							<Button
								className="mt-3"
								render={<Link href="https://wa.me/971526789012" />}
								variant="link"
							>
								Chat in web
							</Button>
						</m.div>
					</m.div>
				</m.div>
			</div>
		</LazyMotion>
	);
};
