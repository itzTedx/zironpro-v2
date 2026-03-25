"use client";

import type { SVGProps } from "react";

import { domAnimation, LazyMotion, m } from "motion/react";

const DASH_PERIOD = 1 + 0.18;

export const AnimatedLogo = (props: SVGProps<SVGSVGElement>) => {
	return (
		<LazyMotion features={domAnimation}>
			<svg
				{...props}
				fill="none"
				height="447"
				viewBox="0 0 383 447"
				width="383"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient
						gradientUnits="userSpaceOnUse"
						id="sweepGradient"
						x1="0"
						x2="383"
						y1="0"
						y2="0"
					>
						<stop offset="0%" stopColor="white" stopOpacity="0" />
						<stop offset="35%" stopColor="white" stopOpacity="0.15" />
						<stop offset="55%" stopColor="white" stopOpacity="1" />
						<stop offset="75%" stopColor="white" stopOpacity="0.15" />
						<stop offset="100%" stopColor="white" stopOpacity="0" />
					</linearGradient>
					<filter height="200%" id="softGlow" width="200%" x="-50%" y="-50%">
						<feGaussianBlur result="blur" stdDeviation="2.2" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<path
					d="M80.7941 212.914L165.961 214.35C179.311 214.35 198.517 215.142 208.529 213.119C245.711 205.585 253.118 183.951 253.118 165.981C253.118 144.845 233.239 110.517 202.381 110.4L165.112 110.253L114.199 110.077L0.311799 1.69526e-05H202.206C267.903 -0.0292979 329.941 37.9627 350.64 95.3612C382.757 184.508 367.093 269.843 260.438 315.076L382.757 446.172H243.808L115.019 316.249V446.172H0.106861V274.24C0.106861 248.883 -6.33407 212.914 80.7941 212.914Z"
					fill="gray"
					opacity="0.1"
				/>
				<path
					d="M80.7941 212.914L165.961 214.35C179.311 214.35 198.517 215.142 208.529 213.119C245.711 205.585 253.118 183.951 253.118 165.981C253.118 144.845 233.239 110.517 202.381 110.4L165.112 110.253L114.199 110.077L0.311799 1.69526e-05H202.206C267.903 -0.0292979 329.941 37.9627 350.64 95.3612C382.757 184.508 367.093 269.843 260.438 315.076L382.757 446.172H243.808L115.019 316.249V446.172H0.106861V274.24C0.106861 248.883 -6.33407 212.914 80.7941 212.914Z"
					fill="none"
					opacity="0.08"
					stroke="white"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1"
					vectorEffect="non-scaling-stroke"
				/>
				<m.path
					animate={{ strokeDashoffset: -0.6071666666666715 - DASH_PERIOD }}
					className="safari-glow-fix"
					d="M80.7941 212.914L165.961 214.35C179.311 214.35 198.517 215.142 208.529 213.119C245.711 205.585 253.118 183.951 253.118 165.981C253.118 144.845 233.239 110.517 202.381 110.4L165.112 110.253L114.199 110.077L0.311799 1.69526e-05H202.206C267.903 -0.0292979 329.941 37.9627 350.64 95.3612C382.757 184.508 367.093 269.843 260.438 315.076L382.757 446.172H243.808L115.019 316.249V446.172H0.106861V274.24C0.106861 248.883 -6.33407 212.914 80.7941 212.914Z"
					fill="none"
					initial={{ strokeDashoffset: -0.6071666666666715 }}
					opacity={1}
					pathLength={1}
					stroke="url(#sweepGradient)"
					strokeDasharray="1 0.18"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1"
					transition={{
						duration: 2.8,
						ease: "linear",
						repeat: Number.POSITIVE_INFINITY,
					}}
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		</LazyMotion>
	);
};
