import Image from "next/image";
import Link from "next/link";

import { Logo, Wordmark } from "@/assets/logo";

import { cn } from "@/lib/utils";

import { Noise } from "../shared/noise";
import { FOOTER_LINKS, FOOTER_META, PARTNERS } from "./data/constants";
import { ContactList } from "./ui/contact-list";
import { Socials } from "./ui/socials";

// Static copyright year to avoid re-computation
const currentYear = new Date().getFullYear();

export const Footer = () => {
	return (
		<footer className="relative pt-12">
			<section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:px-0 lg:grid-cols-[1fr_2fr]">
				<div className="squircle relative isolate flex flex-col justify-between gap-4 overflow-hidden rounded-5xl bg-linear-[180deg,#B362FF_-8.23%,#401CD8_44.8%,#1A1162_100%] p-12 shadow-sm">
					<Noise className="opacity-50" />
					<Link data-umami-event="Footer - Logo" href="/">
						<Logo className="h-10 w-fit text-white" />
					</Link>
					<div className="space-y-8">
						<h4 className="text-balance font-display font-medium text-2xl text-background leading-snug">
							We Build high‑converting Digital Experiences That{" "}
							<span className="text-brand-200">Convert Better, Faster.</span>
						</h4>
						<Socials />
					</div>
				</div>

				<div className="squircle space-y-12 rounded-5xl bg-card p-6 shadow-sm md:space-y-20 md:p-12">
					<div className="flex flex-col justify-between gap-12 md:flex-row md:gap-4">
						<ContactList />

						<div className="flex flex-wrap gap-9">
							{FOOTER_LINKS.map((l) => (
								<ul key={l.section}>
									<li className="space-y-5">
										<h5 className="font-mono text-muted-foreground text-xs tracking-tight">
											{l.section}
											<span className="font-bold text-brand-secondary">.</span>
										</h5>
										<ul className="space-y-4 font-medium">
											{l.links.map((link) => (
												<li key={link.label}>
													<Link
														className="relative text-primary transition-colors duration-300 ease-out before:pointer-events-none before:absolute before:top-[1.3em] before:left-0 before:h-[0.05em] before:w-full before:origin-right before:scale-x-0 before:bg-current before:transition-transform before:duration-300 before:ease-in-out before:content-[''] hover:text-brand-secondary hover:before:origin-left hover:before:scale-x-100"
														data-umami-event={`Footer - ${link.label}`}
														href={link.href}
													>
														{link.label}
													</Link>
												</li>
											))}
										</ul>
									</li>
								</ul>
							))}
						</div>
					</div>

					<div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-4">
						<h5 className="max-w-xs text-balance font-semibold text-primary text-xl tracking-tight md:text-2xl">
							A friendly digital marketing company in Dubai
						</h5>
						<ul className="flex flex-wrap items-center gap-6">
							{PARTNERS.map((partner) => (
								<li key={partner.title}>
									<Image
										alt={partner.alt}
										className="h-8 w-auto object-contain"
										height={30}
										src={partner.src}
										style={{ width: "auto" }}
										width={80}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
			<section className="dashed dashed-y relative z-10 mt-9 md:mt-12">
				<div className="dashed dashed-x mx-auto max-w-7xl p-px">
					<div className="flex flex-col items-center justify-between gap-4 bg-surface px-6 py-6 text-center md:flex-row md:gap-8 md:py-9 md:text-left">
						<p className="w-full">
							© {currentYear} Ziron Media. All rights reserved.
						</p>
						<Link data-umami-event="Footer - Wordmark" href="/">
							<Wordmark
								className="shrink-0 text-foreground transition-colors duration-300 ease-out hover:text-brand-secondary"
								isMono
							/>
						</Link>

						<ul className="flex w-full flex-wrap items-center justify-center gap-4 md:justify-end">
							{FOOTER_META.map((meta) => (
								<li key={meta.label}>
									<Link
										className={cn(
											"relative transition-colors duration-300 ease-out hover:text-brand-secondary",
											"before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
											"before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
											"hover:before:origin-left hover:before:scale-x-100"
										)}
										data-umami-event={`Footer - ${meta.label}`}
										href={meta.href}
									>
										{meta.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
			{/* <div className="h-12 overflow-hidden">
				<CrowdCanvas cols={7} rows={15} src="/images/all-peeps.png" />
			</div> */}
			<div className="dashed dashed-x mx-auto h-6 max-w-7xl md:h-12" />
		</footer>
	);
};
