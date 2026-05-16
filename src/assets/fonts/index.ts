import { Chivo_Mono } from "next/font/google";
import localFont from "next/font/local";

// export const interTight = Inter_Tight();

export const clash = localFont({
	variable: "--font-display",
	display: "swap",
	preload: true,
	src: [
		// {
		// 	weight: "200",
		// 	path: "./clash-grotesk/ClashGrotesk-Extralight.woff2",
		// },
		// {
		// 	weight: "300",
		// 	path: "./clash-grotesk/ClashGrotesk-Light.woff2",
		// },
		{
			weight: "400",
			path: "./clash-grotesk/ClashGrotesk-Regular.woff2",
		},
		{
			weight: "500",
			path: "./clash-grotesk/ClashGrotesk-Medium.woff2",
		},
		{
			weight: "600",
			path: "./clash-grotesk/ClashGrotesk-Semibold.woff2",
		},
		{
			weight: "700",
			path: "./clash-grotesk/ClashGrotesk-Bold.woff2",
		},
	],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});

export const inter = localFont({
	variable: "--font-display",
	display: "swap",
	preload: true,
	src: [
		// {
		// 	weight: "100",
		// 	path: "./inter-display/InterDisplay-Thin.woff2",
		// },
		// {
		// 	weight: "200",
		// 	path: "./inter-display/InterDisplay-ExtraLight.woff2",
		// },
		// {
		// 	weight: "300",
		// 	path: "./inter-display/InterDisplay-Light.woff2",
		// },
		{
			weight: "400",
			path: "./inter-display/InterDisplay-Regular.woff2",
		},
		{
			weight: "500",
			path: "./inter-display/InterDisplay-Medium.woff2",
		},
		{
			weight: "600",
			path: "./inter-display/InterDisplay-SemiBold.woff2",
		},
		{
			weight: "700",
			path: "./inter-display/InterDisplay-Bold.woff2",
		},
		// {
		// 	weight: "800",
		// 	path: "./inter-display/InterDisplay-ExtraBold.woff2",
		// },
		// {
		// 	weight: "900",
		// 	path: "./inter-display/InterDisplay-Black.woff2",
		// },
	],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});

export const mono = Chivo_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: "500",
	fallback: [
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		"Liberation Mono",
		"Courier New",
		"monospace",
	],
});
