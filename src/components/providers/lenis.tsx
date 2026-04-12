"use client";
import { ReactNode, useEffect } from "react";

import Lenis from "lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		let lenis: Lenis | null = null;
		let rafId = 0;

		function raf(time: number) {
			lenis?.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		function sync() {
			cancelAnimationFrame(rafId);
			lenis?.destroy();
			lenis = null;

			if (!mq.matches) {
				lenis = new Lenis({
					prevent(node) {
						return node.hasAttribute("data-scroll-locked");
					},
				});
				rafId = requestAnimationFrame(raf);
			}

			document.body.classList.remove("loading");
		}

		sync();
		mq.addEventListener("change", sync);

		return () => {
			mq.removeEventListener("change", sync);
			cancelAnimationFrame(rafId);
			lenis?.destroy();
		};
	}, []);
	return <>{children}</>;
}
