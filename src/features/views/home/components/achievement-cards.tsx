import Image from "next/image";

import { LogoItem } from "@/components/shared/logo-timeline";
import { Noise } from "@/components/shared/noise";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";

import { IconPlay } from "@/assets/icons/play";
import { Logo } from "@/assets/logo";

import { cn } from "@/lib/utils";

import { GrowthChart } from "./chart";

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"squircle relative aspect-4/3 overflow-hidden rounded-5xl bg-linear-0 from-gray-100 to-gray-50 transition",
				className
			)}
			{...props}
		/>
	);
}

export const BrandServed = () => {
	return (
		<Card>
			<Noise />
			<Image
				alt="Website redesign for Direct Logic Systems by Ziron pro in Dubai"
				className="absolute top-14 left-1/2 z-30 -translate-x-1/2 rounded-lg border-4 border-card object-contain transition-[scale,translate] duration-300 ease-out group-hover/card:-translate-y-20 group-hover/card:scale-75"
				height={280}
				src="/images/direct.jpg"
				width={290}
			/>

			<Image
				alt="Website redesign for Maxline Global Logistics by Ziron pro in Dubai"
				className="absolute top-14 left-1/2 z-20 -translate-x-1/2 -rotate-3 rounded-lg border-4 border-card object-contain transition-[scale,translate] duration-300 ease-out group-hover/card:-translate-x-[calc(50%+5rem)] group-hover/card:-translate-y-20 group-hover/card:scale-60"
				height={280}
				src="/images/maxline.jpg"
				width={290}
			/>

			<Image
				alt="Website design and development for Qordz by Ziron pro in Dubai"
				className="absolute top-14 left-1/2 z-10 -translate-x-1/2 rotate-3 rounded-lg border-4 border-card object-contain transition-[scale,translate] duration-300 ease-out group-hover/card:translate-x-[calc(-50%+5rem)] group-hover/card:-translate-y-20 group-hover/card:scale-60"
				height={280}
				src="/images/qordx.jpg"
				width={290}
			/>

			<Image
				alt="Blue gradient background texture by Ziron pro"
				fill
				src="/images/bg-grad-1.webp"
			/>
			{/* <div className="pointer-events-none absolute inset-0 bg-linear-0 from-brand-300 to-brand-100 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" /> */}
		</Card>
	);
};

const marqueeBadges1 = [
	"Brand Guidelines",
	"Logo Design",
	"Pitch Decks",
	"Packaging Design",
	"Social Media",
	"Paid Ads",
] as const;

const marqueeBadges2 = [
	"Website Development",
	"SEO",
	"Website Revamps",
	"Content Creation",
	"Campaigns",
	"Email & Newsletter",
] as const;

const marqueeBadges3 = [
	"Explainer Videos",
	"Motion Graphics",
	"Merchandise",
	"Offset & Digital Printing",
	"Corporate Gifts",
	"Copywriting",
] as const;

export const Experience = () => {
	return (
		<Card>
			<Noise className="opacity-20" />

			{/* <div className="absolute top-12 left-1/2 z-20 -translate-x-1/2 transition-transform group-hover/card:-translate-y-6 group-hover/card:scale-90">
				<svg
					className="text-muted-foreground/60 transition-colors group-hover/card:text-muted-foreground/40"
					fill="none"
					height="282"
					viewBox="0 0 237 282"
					width="237"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M119.948 282C56.2513 282 13.6492 252.556 0 214.403L59.1466 165.468C67.4188 195.326 90.9948 207.768 117.052 207.768C140.215 207.768 155.105 196.156 155.105 172.103C155.105 150.953 142.696 137.682 117.052 137.682C100.094 137.682 86.445 143.074 81.0681 159.662L80.6544 160.906L10.3403 153.856L21.0942 0H218.801V66.3529H88.9267L83.5497 140.171C93.0628 115.288 117.052 95.3823 155.518 95.3823C200.602 95.3823 237 121.509 237 180.812C237 242.188 187.78 282 119.948 282Z"
						fill="currentColor"
					/>
				</svg>
			</div>

			<div className="absolute -inset-1 z-10 opacity-10 transition-[opacity,z-index] group-hover/card:z-50 group-hover/card:opacity-100">
				<Integrations />
			</div> */}
			<div className="flex h-full items-center justify-center">
				<div className="relative z-50 flex size-20 items-center justify-center overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-out group-hover/card:scale-125">
					<Logo className="relative z-200 h-auto w-16" />
					<Image
						alt="Experience badge background by Ziron pro"
						className="object-cover"
						fill
						src="/images/icon-box.png"
					/>
				</div>
				<div className="absolute inset-x-0 z-10">
					<Marquee repeat={2}>
						{marqueeBadges1.map((label) => (
							<Badge key={label} variant="ghost">
								{label}
							</Badge>
						))}
					</Marquee>
					<Marquee repeat={2}>
						{marqueeBadges2.map((label) => (
							<Badge key={label} variant="ghost">
								{label}
							</Badge>
						))}
					</Marquee>
					<Marquee repeat={2}>
						{marqueeBadges3.map((label) => (
							<Badge key={label} variant="ghost">
								{label}
							</Badge>
						))}
					</Marquee>
				</div>
			</div>
			<Image
				alt="Purple gradient background texture by Ziron pro"
				fill
				src="/images/bg-grad-2.webp"
			/>
			{/* <div className="pointer-events-none absolute inset-0 bg-linear-0 from-fuchsia-300 to-fuchsia-100 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" /> */}
		</Card>
	);
};

export const Growth = () => {
	return (
		<Card>
			<Noise />
			<p className="relative z-50 p-6 font-medium text-3xl transition-colors group-hover/card:text-green-800">
				Growth
			</p>
			<GrowthChart />

			<Image
				alt="Green gradient background texture by Ziron pro"
				fill
				src="/images/bg-grad-3.webp"
			/>
			{/* <div className="pointer-events-none absolute inset-0 bg-linear-0 from-green-300 to-green-50 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" /> */}
		</Card>
	);
};

export const logos: LogoItem[] = [
	// Row 1 - Communication & Social (2 logos, 50s duration, spaced 25s apart)
	{
		label: "Discord",
		icon: <IconPlay />,
		animationDelay: -50,
		animationDuration: 50,
		row: 1,
	},
	{
		label: "Twitter",
		icon: <IconPlay />,
		animationDelay: -25,
		animationDuration: 50,
		row: 1,
	},
	// Row 2 - Development Tools (2 logos, 45s duration, spaced 22.5s apart)
	{
		label: "GitHub",
		icon: <IconPlay />,
		animationDelay: -45,
		animationDuration: 45,
		row: 2,
	},
	{
		label: "React",
		icon: <IconPlay />,
		animationDelay: -22.5,
		animationDuration: 45,
		row: 2,
	},
	// Row 3 - Development Tools Continued (3 logos, 60s duration, spaced 20s apart)
	{
		label: "TypeScript",
		icon: <IconPlay />,
		animationDelay: -60,
		animationDuration: 60,
		row: 3,
	},
	{
		label: "Tailwind",
		icon: <IconPlay />,
		animationDelay: -40,
		animationDuration: 60,
		row: 3,
	},
	{
		label: "Radix UI",
		icon: <IconPlay />,
		animationDelay: -40,
		animationDuration: 60,
		row: 3,
	},
	// Row 4 - Productivity & Cloud (2 logos, 55s duration, spaced 27.5s apart)
	{
		label: "Google Drive",
		icon: <IconPlay />,
		animationDelay: -55,
		animationDuration: 55,
		row: 4,
	},
	{
		label: "Notion",
		icon: <IconPlay />,
		animationDelay: -27.5,
		animationDuration: 55,
		row: 4,
	},
	// Row 5 - Messaging (2 logos, 50s duration, spaced 25s apart)
	{
		label: "WhatsApp",
		icon: <IconPlay />,
		animationDelay: -50,
		animationDuration: 50,
		row: 5,
	},
	{
		label: "Messenger",
		icon: <IconPlay />,
		animationDelay: -25,
		animationDuration: 50,
		row: 5,
	},
	// Row 6 - AI & Automation (3 logos, 65s duration, spaced ~21.5s apart)
	{
		label: "OpenAI",
		icon: <IconPlay />,
		animationDelay: -65,
		animationDuration: 65,
		row: 6,
	},
	{
		label: "Zapier",
		animationDelay: -43,
		icon: <IconPlay />,
		animationDuration: 65,
		row: 6,
	},
	{
		label: "v0",
		animationDelay: -21.5,
		icon: <IconPlay />,
		animationDuration: 65,
		row: 6,
	},
	// Row 7 - Payment & Services (2 logos, 50s duration, spaced 25s apart)
	{
		label: "PayPal",
		animationDelay: -50,
		icon: <IconPlay />,
		animationDuration: 50,
		row: 7,
	},
	{
		label: "Apple Pay",
		icon: <IconPlay />,
		animationDelay: -25,
		animationDuration: 50,
		row: 7,
	},
];
