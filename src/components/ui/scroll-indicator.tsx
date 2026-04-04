"use client";

import {
	domAnimation,
	LazyMotion,
	m,
	useScroll,
	useSpring,
} from "motion/react";

export function ScrollIndicator() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 180,
		damping: 30,
		mass: 0.2,
	});

	return (
		<LazyMotion features={domAnimation}>
			<div
				aria-hidden
				className="pointer-events-none fixed top-0 left-0 z-1001 h-1 w-full bg-transparent"
			>
				<m.div
					className="h-full w-full origin-left bg-linear-to-r from-primary/80 to-primary shadow-[0_0_14px_hsl(var(--primary)/0.55)]"
					style={{ scaleX }}
				/>
			</div>
		</LazyMotion>
	);
}
