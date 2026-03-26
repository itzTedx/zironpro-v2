import Image from "next/image";

import { PARTNERS } from "@/components/layout/data/constants";
import { ContactList } from "@/components/layout/ui/contact-list";
import { Socials } from "@/components/layout/ui/socials";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
export const ContactHeader = () => {
	return (
		<div className="h-fit space-y-9 md:sticky md:top-24">
			<div className="space-y-2">
				<Badge>The right partner for your next project</Badge>
				<h1 className="text-balance font-black font-display text-4xl text-primary uppercase tracking-tight md:text-6xl">
					Let's Build Something That Works for Your Brand
				</h1>
				<p className="text-balance font-medium text-lg text-muted-foreground leading-relaxed *:text-foreground md:text-xl">
					Whether you’re planning a{" "}
					<span>
						new launch, refreshing your brand, scaling your marketing,
					</span>{" "}
					or bringing your ideas to life across digital and print —{" "}
					<span>we’re ready.</span>
				</p>
				<p className="text-balance text-muted-foreground text-sm">
					Tell us what you're working on. We'll respond within{" "}
					<span className="font-medium">2 business</span> hours with a clear
					next step. No sales pressure, no jargon.
				</p>
			</div>
			<div className="grid items-center gap-4 md:grid-cols-2">
				<Socials className="text-muted-foreground" />
				<ContactList />
			</div>
			<Item className="w-fit" variant="muted">
				<ItemContent className="md:flex-row md:gap-6">
					<ItemTitle>Official Partnerships:</ItemTitle>
					<ul className="flex flex-wrap items-center gap-2">
						{PARTNERS.map((partner) => (
							<li
								className="squircle rounded-lg bg-card px-3 py-2.5 shadow-md"
								key={partner.title}
							>
								<Image
									alt={partner.alt}
									className="h-6 w-auto object-contain"
									height={30}
									src={partner.src}
									style={{ width: "auto" }}
									width={80}
								/>
							</li>
						))}
					</ul>
				</ItemContent>
			</Item>
		</div>
	);
};
