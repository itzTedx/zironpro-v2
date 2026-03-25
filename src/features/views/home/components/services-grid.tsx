import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

import { AnimatedLogo } from "@/assets/animated-logo";
import { IconDesktopPoint } from "@/assets/icons/desktop";
import { IconPaint } from "@/assets/icons/paint";

import { cn } from "@/lib/utils";

import { AnimatedList } from "./animated-list";

export const WebDevelopmentGrid = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"group relative transform-gpu overflow-hidden rounded-2xl bg-floating p-6 md:col-span-2 md:min-h-0 md:p-14",
				className
			)}
		>
			<div className="relative z-10 mt-52 flex max-w-xs flex-col justify-center gap-2 md:mt-0 md:justify-start md:gap-4">
				<IconDesktopPoint />
				<h3 className="font-medium text-3xl text-grad">Web Development</h3>
				<p>
					Transform concepts into high-performance experiences. Engineering
					fast, scalable, and conversion-focused websites that grow with your
					business.
				</p>
				<Link href="/services/websites/design-and-dev">See more</Link>
			</div>
			<Image
				alt="Web Development"
				className="pointer-events-none absolute top-4 left-1/2 z-10 w-11/12 -translate-x-1/2 transform-gpu select-none overflow-hidden rounded-2xl object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 sm:h-64 sm:w-auto md:top-[-6%] md:right-[-12%] md:h-75 md:translate-x-0 md:opacity-100"
				height={1435}
				src="/images/services/web-dev.webp"
				width={2000}
			/>
			<div className="pointer-events-none absolute -right-24 -bottom-20 size-126 rounded-full bg-primary/40 blur-3xl blur-gpu" />
		</div>
	);
};

export const BrandingGrid = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"group relative min-h-100 transform-gpu overflow-hidden rounded-2xl bg-gray-1400 text-card md:row-span-2 md:min-h-0",
				className
			)}
		>
			<div className="relative z-10 mt-52 flex max-w-xs flex-col justify-center gap-2 p-6 md:mt-0 md:justify-start md:gap-4 md:p-14">
				<IconPaint />
				<h3 className="font-medium text-3xl">Branding</h3>
				<p className="text-muted/80">
					We build strategic brand identities designed to secure a premium
					market position.
				</p>
				<Link href="/services/branding">See more</Link>
			</div>
			<div className="absolute bottom-12 left-0 z-10 w-full md:bottom-30">
				<div className="mask-x-from-80%">
					<Marquee className="[--duration:20s]" repeat={10}>
						<Image
							alt="blocks"
							className="pointer-events-none size-20 md:size-26"
							height={150}
							src="images/services/blocks.svg"
							width={150}
						/>
						<Image
							alt="blocks"
							className="pointer-events-none size-20 md:size-26"
							height={150}
							src="images/services/typography.svg"
							width={150}
						/>
						<Image
							alt="blocks"
							className="pointer-events-none size-20 md:size-26"
							height={150}
							src="images/services/logo.svg"
							width={150}
						/>
						<Image
							alt="blocks"
							className="pointer-events-none size-20 md:size-26"
							height={150}
							src="images/services/logo-variants.svg"
							width={150}
						/>
					</Marquee>
				</div>
			</div>

			<div className="pointer-events-none absolute bottom-0 left-1/2 size-100 -translate-x-1/2 rounded-full bg-primary/60 blur-[120px] blur-min" />
		</div>
	);
};

export const AllServicesGrid = ({ className }: { className?: string }) => {
	const notifications: NotificationData[] = [
		{
			id: 1,
			name: "Web development",
			message: "Staging site is ready for your review",
			timeAgo: "2h ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-1.png",
		},
		{
			id: 2,
			name: "Branding",
			message: "Logo concepts — round 2 are in your inbox",
			timeAgo: "1h ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-2.png",
		},
		{
			id: 3,
			name: "SEO",
			message: "Monthly report: organic clicks up this quarter",
			timeAgo: "45m ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-3.png",
		},
		{
			id: 4,
			name: "Social media",
			message: "This week's creatives are scheduled to post",
			timeAgo: "1d ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-4.png",
		},
		{
			id: 5,
			name: "Motion graphics",
			message: "Hero animation draft is ready to review",
			timeAgo: "3h ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-5.png",
		},
		{
			id: 6,
			name: "Print design",
			message: "Proofs approved — heading to print",
			timeAgo: "5m ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-6.png",
		},
		{
			id: 7,
			name: "Pitch deck",
			message: "Investor deck v3 exported for your meeting",
			timeAgo: "2d ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-7.png",
		},
		{
			id: 8,
			name: "Packaging",
			message: "Dieline and label artwork need your sign-off",
			timeAgo: "1w ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-8.png",
		},
		{
			id: 9,
			name: "Website management",
			message: "Updates deployed — SSL and backups verified",
			timeAgo: "2d ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-9.png",
		},
		{
			id: 10,
			name: "Content strategy",
			message: "Q2 blog calendar is ready for approval",
			timeAgo: "4h ago",
			icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-10.png",
		},
	];

	return (
		<div
			className={cn(
				"group relative flex min-h-100 transform-gpu flex-col gap-9 overflow-hidden rounded-2xl bg-floating p-6 md:row-span-2 md:min-h-0 md:gap-12 md:p-9",
				className
			)}
		>
			<div className="mask-y-from-80% absolute inset-x-0 bottom-0 h-[300px] w-full">
				<AnimatedList
					columnGap={100}
					formationDuration={1}
					scaleFactor={0.01}
					scrollDownDuration={5}
					stackGap={20}
				>
					{notifications.map((notification) => (
						<Notification key={notification.id} notification={notification} />
					))}
				</AnimatedList>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4">
				{[
					"Web design",
					"Logos",
					"Slide decks",
					"Branding",
					"Web development",
					"Print design",
					"Social media",
					"Packaging design",
					"Website management",
				].map((service) => (
					<Button
						key={service}
						render={
							<Link
								className="hover:bg-gray-1400 hover:text-card"
								href={`/services/${service.toLowerCase()}`}
							/>
						}
						size="sm"
						variant="outline"
					>
						{service}
					</Button>
				))}
			</div>
			<div className="relative z-10 flex max-w-xs flex-col justify-center gap-2 text-center md:mt-0 md:justify-start md:gap-4">
				<h3 className="font-medium text-2xl">
					Websites, logos, social media, printing & more...
				</h3>
				<p>All the things you need under one roof.</p>
			</div>
		</div>
	);
};

export const LogoGrid = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"group transform-gpu-blur relative flex aspect-square min-h-63 items-center justify-center overflow-hidden rounded-2xl bg-gray-1400 p-6 text-center md:min-h-0 md:p-14",
				className
			)}
		>
			<AnimatedLogo className="absolute top-1/2 left-1/2 -translate-x-[46%] -translate-y-1/2 scale-75 object-contain opacity-50 md:scale-100 md:opacity-100" />
			<div className="relative z-10">
				<h3 className="text-3xl text-card leading-snug tracking-tight md:text-5xl">
					Everything
					<br />
					in One Place
				</h3>
			</div>

			<div className="absolute -bottom-10 -left-2 size-50 rounded-full bg-primary/40 blur-3xl blur-gpu" />
			<div className="absolute -top-20 left-0 size-50 rounded-full bg-brand-secondary/50 blur-[100px] blur-gpu" />
		</div>
	);
};

export const MotionGraphicsGrid = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"group relative min-h-100 transform-gpu overflow-hidden rounded-2xl bg-card p-6 md:col-span-1 md:min-h-0 md:p-14 lg:col-span-2",
				className
			)}
		>
			<div className="relative z-10 mt-52 flex max-w-xs flex-col justify-center gap-2 md:mt-0 md:justify-start md:gap-4">
				<IconDesktopPoint />
				<h3 className="font-medium text-3xl text-grad">Motion Graphics</h3>
				<p>
					We build cinematic 3D assets designed to give your brand a premium
					feel.
				</p>
				<Link href="/services/websites/design-and-dev">See more</Link>
			</div>
			<div className="pointer-events-none inset-y-0 -right-8 z-10 -mb-6 select-none md:absolute md:h-full md:w-2/3">
				<Image
					alt="Web Development"
					className="h-full scale-110 transform-gpu object-contain opacity-100 transition-transform duration-700 group-hover:scale-125 md:scale-120"
					height={1435}
					src="/images/services/motion-software.webp"
					width={2000}
				/>
			</div>
			<div className="pointer-events-none absolute -right-24 -bottom-60 size-120 rounded-full bg-primary/70 blur-[100px] blur-gpu" />
		</div>
	);
};

interface NotificationData {
	id: number;
	name: string;
	message: string;
	timeAgo: string;
	icon: string;
}
type NotificationProps = {
	notification: NotificationData;
};
export function Notification({ notification }: NotificationProps) {
	return (
		<div className="flex w-full max-w-[290px] items-center justify-between gap-4 rounded-2xl border border-neutral-50 bg-white p-3.5 shadow-neutral-200 shadow-xl">
			<img
				alt={notification.name}
				className="h-10 w-10"
				src={notification.icon}
			/>
			<div className="flex w-full flex-col">
				<div className="flex w-full items-start justify-between">
					<span className="font-medium text-sm">{notification.name}</span>
					<span className="text-neutral-400 text-xs">
						{notification.timeAgo}
					</span>
				</div>
				<span className="text-neutral-600 text-sm dark:text-neutral-400">
					{notification.message}
				</span>
			</div>
		</div>
	);
}
