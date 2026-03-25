import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Frame,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

import { IconArrowRightTag } from "@/assets/icons/arrow";
import { IconShapes } from "@/assets/icons/shapes";

import { SERVICES } from "@/features/services/constant";

export default function WorksPage() {
	return (
		<main className="pt-14">
			<header className="dashed dashed-x container mx-auto grid max-w-7xl gap-6 py-9 sm:py-12 md:grid-cols-2 md:gap-12 md:py-16">
				<h1 className="font-semibold text-4xl text-primary md:text-7xl">
					A closer look at our recent work.
				</h1>
				<div className="space-y-3">
					<p className="text-lg text-muted-foreground md:text-xl">
						Here’s a look at what we’ve been building with our clients. Every
						project is different, but what stays the same is the craft, speed,
						and thinking process behind it.
					</p>
					<Button
						className="group w-full flex-1 justify-between gap-2 md:w-60"
						data-umami-event="Our works - Get started"
						render={<Link href="/services" />}
						size="lg"
					>
						<span>
							Get started{" "}
							<span className="hidden font-normal text-primary-secondary md:inline">
								- it’s free
							</span>
						</span>
						<IconArrowRightTag className="size-5 transition-transform duration-300 ease-in group-hover:translate-x-1" />
					</Button>
				</div>
			</header>
			<section className="dashed dashed-t">
				<Tabs
					className="dashed dashed-x container max-w-7xl py-12"
					defaultValue="all"
				>
					<TabsList className="w-full">
						<TabsTab value="all">
							<IconShapes /> All Works
						</TabsTab>
						{SERVICES.map((service) => (
							<TabsTab key={service.id} value={service.slug}>
								<service.icon />
								{service.title}
							</TabsTab>
						))}
					</TabsList>
					<TabsPanel value="all">
						<Frame className="gap-3">
							<FrameHeader className="items-center gap-3 px-1.5 py-2 md:flex-row md:justify-between">
								<div className="space-y-3 md:space-y-0">
									<Badge
										className="transition-colors duration-300 md:hidden"
										render={
											<Link
												data-umami-event="Our works - Website Design & Dev"
												href="/services/websites"
											/>
										}
										variant="ghost"
									>
										Website Design & Dev
									</Badge>
									<FrameTitle className="text-xl">
										Engineering a Smarter Digital Presence for Enterprise
										Growth.
									</FrameTitle>
								</div>
								<div className="flex w-full items-center gap-2 md:w-auto">
									<Badge
										className="hidden transition-colors duration-300 md:inline-flex"
										render={
											<Link
												data-umami-event="Our works - Website Design & Dev"
												href="/services/websites"
											/>
										}
										variant="ghost"
									>
										Website Design & Dev
									</Badge>
									<Button
										className="w-full md:inline-flex md:w-auto"
										data-umami-event="Our works - See case study"
										variant="secondary"
									>
										See Case Study
									</Button>
								</div>
							</FrameHeader>

							<FramePanel>
								<div className="relative aspect-video w-full overflow-hidden rounded-xl">
									<Image
										alt=""
										className="object-cover"
										fill
										sizes="(max-width: 1280px) 100vw, 1280px"
										src="/images/works/direct-ls.webp"
									/>
								</div>
							</FramePanel>
							<FrameFooter className="px-1.5 py-2">
								<p className="text-sm md:text-base">
									"Ziron Media delivered a modern, fast, and professional
									website that perfectly reflects our brand. Their attention to
									detail and technical expertise made the entire process smooth
									and efficient."
								</p>
							</FrameFooter>
						</Frame>
					</TabsPanel>
					<TabsPanel value="branding">
						<p className="p-4 text-center text-muted-foreground text-xs">
							Tab 2 content
						</p>
					</TabsPanel>
					<TabsPanel value="websites">
						<p className="p-4 text-center text-muted-foreground text-xs">
							Tab 3 content
						</p>
					</TabsPanel>
				</Tabs>
			</section>
		</main>
	);
}
