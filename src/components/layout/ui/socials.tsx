import Link from "next/link";

import { cn } from "@/lib/utils";

import { SOCIALS } from "../data/constants";

export const Socials = ({
	hasTitle = true,
	className,
	...props
}: React.ComponentProps<"div"> & { hasTitle?: boolean }) => {
	return (
		<div className="space-y-3" {...props}>
			{hasTitle ? (
				<p className={cn("font-medium text-brand-50", className)}>
					Stay Connected
				</p>
			) : null}
			<ul className="flex items-center gap-4">
				{SOCIALS.map((social) => (
					<Social key={social.label} social={social} />
				))}
			</ul>
		</div>
	);
};

interface SocialProps {
	social: (typeof SOCIALS)[number];
}

function Social({ social }: SocialProps) {
	const Icon = social.icon;
	return (
		<li>
			<Link
				className="flex size-12 items-center justify-center rounded-lg bg-gray-1300 text-white shadow-dark transition-[filter,background-color] duration-300 ease-out hover:bg-brand-secondary hover:brightness-125"
				href={social.href}
			>
				<Icon />
			</Link>
		</li>
	);
}
