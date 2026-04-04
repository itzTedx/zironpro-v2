import { Children, isValidElement } from "react";

import Script from "next/script";

import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Frame, FramePanel } from "@/components/ui/frame";

import { IconCalender } from "@/assets/icons/calender";

import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";

interface FaqItem {
	question: string;
	answer: string;
}

interface FaqContentProps {
	title: string;
	children: React.ReactNode;
}

// Helper function to extract text content from React children
function extractTextFromChildren(children: React.ReactNode): string {
	if (typeof children === "string") {
		return children.trim();
	}
	if (typeof children === "number") {
		return String(children).trim();
	}
	if (Array.isArray(children)) {
		return children
			.map((child) => extractTextFromChildren(child))
			.filter(Boolean)
			.join(" ")
			.trim();
	}
	if (isValidElement(children)) {
		const props = children.props as { children?: React.ReactNode };
		if (props?.children) {
			return extractTextFromChildren(props.children);
		}
	}
	return "";
}

function Faq({
	children,
	compact,
}: {
	children: React.ReactNode;
	compact?: boolean;
}) {
	// Extract FAQ items from children
	const faqItems: FaqItem[] = [];

	Children.forEach(children, (child) => {
		if (isValidElement(child)) {
			const props = child.props as FaqContentProps;
			// Check if this looks like a FaqContent component (has title prop)
			if (props?.title) {
				const answer = extractTextFromChildren(props.children);
				if (answer) {
					faqItems.push({
						question: props.title,
						answer,
					});
				}
			}
		}
	});

	// Generate FAQPage structured data
	const structuredData =
		faqItems.length > 0
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: faqItems.map((item) => ({
						"@type": "Question",
						name: item.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: item.answer,
						},
					})),
				}
			: null;

	return (
		<>
			{structuredData && (
				<Script id="faq-structured-data" type="application/ld+json">
					{JSON.stringify(structuredData)}
				</Script>
			)}
			<section
				className={cn(
					"relative grid max-w-7xl gap-4",
					compact ? "" : "dashed dashed-x"
				)}
				itemScope
				itemType="https://schema.org/FAQPage"
			>
				<div className="not-prose">
					<Badge>Frequently Asked Questions</Badge>
					<h2 className="my-3 font-semibold text-4xl text-foreground tracking-tight">
						Still have questions?
					</h2>
					<p className="mb-6 text-balance text-lg text-muted-foreground leading-normal">
						Have other questions or just want to chat? Book a call and let's
						figure it out together.
					</p>
					<Button
						className="text-foreground"
						data-label="FAQ - Book a call"
						data-location="services_faq"
						data-track="cta_click"
						variant="outline"
					>
						<IconCalender className="text-muted-foreground" />
						Book a call
					</Button>
				</div>
				<FaqItem>{children}</FaqItem>
			</section>
		</>
	);
}

function FaqItem({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Accordion className={cn("not-prose w-full", className)}>
			<Frame>{children}</Frame>
		</Accordion>
	);
}

function FaqContent({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<FramePanel className="py-2">
			<AccordionItem
				itemScope
				itemType="https://schema.org/Question"
				value={slugify(title)}
			>
				<AccordionTrigger className="text-base!" itemProp="name">
					{title}
				</AccordionTrigger>
				<AccordionPanel
					itemProp="acceptedAnswer"
					itemScope
					itemType="https://schema.org/Answer"
				>
					<div className="[&_a]:text-primary [&_a]:underline" itemProp="text">
						{children}
					</div>
				</AccordionPanel>
			</AccordionItem>
		</FramePanel>
	);
}

export { Faq, FaqContent, FaqItem };
