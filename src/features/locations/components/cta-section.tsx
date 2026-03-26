import { Route } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface CTASectionProps {
	title?: string;
	description?: string;
	href?: Route;
	buttonLabel?: string;
}

export function CTASection({
	title = "Ready to grow in your location?",
	description = "Talk to our team and get a practical strategy tailored to your business goals.",
	href = "/contact",
	buttonLabel = "Start your project",
}: CTASectionProps) {
	return (
		<section className="dashed dashed-t">
			<div className="container max-w-5xl py-12 text-center md:py-16">
				<h2 className="font-semibold text-2xl text-primary md:text-3xl">
					{title}
				</h2>
				<p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
					{description}
				</p>
				<Button className="mt-6" render={<Link href={href} />}>
					{buttonLabel}
				</Button>
			</div>
		</section>
	);
}
