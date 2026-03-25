import Image from "next/image";
import Link from "next/link";

import { Noise } from "@/components/shared/noise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconSparkle } from "@/assets/icons/sparkle";

interface CtaProps {
	title?: string;
	description?: string;
	buttonText?: string;
}

export const Cta = ({ title, description, buttonText }: CtaProps) => {
	return (
		<section className="not-prose container py-12">
			<div className="mask-origin-content mask-auto mask-[url(/images/cta-mask.svg)] mask-no-repeat mask-center relative overflow-hidden rounded-3xl bg-linear-to-b from-brand-500 to-80% to-brand-secondary-400 p-12 text-center text-white md:p-20">
				<Noise className="opacity-20" />
				<Badge className="bg-card" variant="outline">
					Ready to grow? We’re ready to go
				</Badge>
				<h3 className="mx-auto mt-4 mb-3 max-w-4xl text-balance font-bold text-3xl uppercase tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
					{title ?? "Ready to establish your brand standards?"}
				</h3>
				<p className="mx-auto mb-6 max-w-2xl md:text-xl">
					{description ??
						"Consistent branding builds recognition, trust, and value. Let's create brand guidelines that protect and strengthen your brand identity."}
				</p>
				<Button
					className="mb-12 justify-between md:w-48"
					data-umami-event="CTA - Get in touch"
					render={<Link href="/contact" />}
					variant="secondary"
				>
					{buttonText ?? "Get in touch"} <IconSparkle />
				</Button>
				<div className="absolute left-1/2 z-10 aspect-7/3 w-[80%] -translate-x-1/2 rounded-[calc(var(--radius-3xl)+calc(var(--spacing)*1.5)-1px)] border border-card/20 bg-card/10 p-1.5 md:w-[85%] md:p-2.5 2xl:w-[50%]">
					<div className="relative aspect-5/3 overflow-hidden rounded-2xl">
						<Image
							alt=""
							className="object-cover"
							fill
							sizes="(max-width: 1536px) 85vw, 50vw"
							src="/images/services/logo-design.jpg"
						/>
					</div>
				</div>
				<p className="relative z-50 mt-36 md:mt-52">
					Focused on growth, built for performance.
				</p>
				<div className="absolute bottom-0 left-0 z-20 h-1/3 w-full bg-linear-to-t from-brand-secondary to-[#B362FF]/0" />
			</div>
		</section>
	);
};
