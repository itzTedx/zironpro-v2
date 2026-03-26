import { Route } from "next";

import {
	PreviewLinkCard,
	PreviewLinkCardImage,
	PreviewLinkCardPopup,
	PreviewLinkCardPortal,
	PreviewLinkCardPositioner,
	PreviewLinkCardTrigger,
} from "@/components/primitives/preview-link-card";
import { Frame, FramePanel } from "@/components/ui/frame";

import { SERVICES } from "@/features/services/constant";

export const HowWeHelp = () => {
	return (
		<section className="dashed dashed-y relative">
			<div className="absolute inset-x-0 top-px h-1/2 bg-linear-to-b from-card" />
			<div className="absolute inset-x-0 bottom-px h-1/2 bg-linear-to-t from-card" />
			<div className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 py-9 md:grid-cols-3 md:px-0 md:py-16">
				<div>
					<h2 className="font-semibold text-2xl tracking-tight">
						How we help you grow
					</h2>
					<div className="mt-4 space-y-3 text-balance text-muted-foreground">
						<p>
							We help businesses turn ideas into clear brand systems and growth
							engines.
						</p>

						<p>
							From branding and websites to marketing, motion, printing, and
							full-stack execution - everything is handled under one roof, with
							one accountable team.
						</p>

						<p className="font-medium">No handoffs. No silos. Just progress.</p>
					</div>
				</div>
				<div className="col-span-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3">
					{SERVICES.map(({ icon: Icon, ...service }) => {
						return (
							<Frame key={service.id}>
								<FramePanel className="flex items-center gap-3">
									<Icon className="size-5 shrink-0 text-muted-foreground" />
									<h3 className="font-medium text-sm">{service.title}</h3>
								</FramePanel>
								<FramePanel className="h-full">
									<ul className="flex flex-col gap-1">
										{service.lists.map((list) => (
											<li key={list.slug}>
												<PreviewLinkCard
													followCursor="x"
													href={
														`/services/${service.slug}/${list.slug}` as Route
													}
													src={list.image}
												>
													<PreviewLinkCardTrigger
														className="font-medium text-sm transition-colors duration-300 ease-out hover:text-brand-secondary"
														delay={20}
													>
														{list.title}
													</PreviewLinkCardTrigger>
													<PreviewLinkCardPortal>
														<PreviewLinkCardPositioner side="inline-end">
															<PreviewLinkCardPopup
																className="overflow-hidden rounded-lg"
																href={
																	`/services/${service.slug}/${list.slug}` as Route
																}
															>
																<PreviewLinkCardImage
																	alt={`Service preview card for ${list.title} by Ziron Media`}
																/>
															</PreviewLinkCardPopup>
														</PreviewLinkCardPositioner>
													</PreviewLinkCardPortal>
												</PreviewLinkCard>
											</li>
										))}
									</ul>
								</FramePanel>
							</Frame>
						);
					})}
				</div>
			</div>
		</section>
	);
};
