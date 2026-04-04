import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
	children: React.ReactNode;
	title: string;
}
function Section({ children, title }: SectionProps) {
	return (
		<section className="grid gap-6 md:grid-cols-[1.5fr_2fr]">
			<SectionTitle>{title}</SectionTitle>
			<SectionContent>{children}</SectionContent>
		</section>
	);
}

function SectionTitle({ children }: PropsWithChildren) {
	return (
		<h2 className="not-prose h-fit text-balance font-semibold text-5xl text-primary leading-[1.125] tracking-tight md:sticky md:top-20">
			{children}
		</h2>
	);
}

function SectionContent({ children }: PropsWithChildren) {
	return <div className="*:first:mt-0">{children}</div>;
}

function Group({ children, className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("grid grid-cols-3 gap-3", className)} {...props}>
			{children}
		</div>
	);
}

export { Group, Section, SectionContent, SectionTitle };
