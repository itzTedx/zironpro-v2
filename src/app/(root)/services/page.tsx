import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { ServicesLists } from "@/features/services/components/service-list";

export default function ServicesPage() {
	return (
		<main>
			<section className="dashed dashed-b relative">
				<header className="dashed dashed-x relative z-10 mx-auto max-w-7xl py-12 md:py-16">
					<div className="container space-y-4">
						<h1 className="max-w-5xl font-black font-display text-4xl text-primary uppercase md:text-6xl lg:text-7xl">
							Delivering results is really all that matters.
						</h1>
						<p className="max-w-5xl text-balance text-2xl text-muted-foreground leading-relaxed tracking-tight *:text-foreground">
							100% of what we do is focused on turning your{" "}
							<span>brand into a revenue engine</span> through{" "}
							<span>integrated, performance-driven strategy.</span>
						</p>
					</div>
				</header>
			</section>
			<section className="bg-card py-24">
				<div className="mx-auto grid max-w-7xl grid-cols-12 gap-6">
					<div className="col-span-5 space-y-3">
						<Badge>
							<div className="size-1.5 rounded-full bg-brand-secondary" /> What
							we do
						</Badge>
						<h2 className="font-semibold text-5xl tracking-tight">
							We turn <span className="text-primary">first impressions</span>{" "}
							into lasting engagement
						</h2>
					</div>
					<div className="col-span-7 space-y-3">
						<h3 className="font-medium text-lg">
							Your brand isn’t experienced in pieces — it’s experienced as a
							whole.
						</h3>
						<div className="grid grid-cols-2 gap-6 text-muted-foreground [&_p_span]:text-foreground">
							<p>
								Our process blends{" "}
								<span>
									strategy, user psychology, creative execution, technology, and
									production
								</span>{" "}
								to create experiences that feel clear, consistent, and
								intentional - online and offline.
							</p>
							<p>
								Every service we offer is designed to work{" "}
								<span>
									together, ensuring clarity, consistency, and performance
								</span>{" "}
								across digital and physical.
							</p>
							<p>
								We start with <span>goals, structure, and behavior</span> - then
								design everything to support them.
							</p>
							<p>
								Because when every element works together, your brand doesn’t
								just look better - <span>it performs better.</span>
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="dashed dashed-t relative">
				<ServicesLists />
				{/* <ServicesStickyCards /> */}

				<div className="dashed dashed-y">
					<div className="dashed dashed-x container flex max-w-7xl items-center justify-center py-12">
						<Button
							asChild
							className="text-muted-foreground"
							data-umami-event="Services - Build your vision"
							size="lg"
							variant="secondary"
						>
							<Link href="/contact">
								Build your vision with us <IconArrowRightTag />
							</Link>
						</Button>
					</div>
				</div>
				{/* <div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" /> */}
			</section>
		</main>
	);
}
