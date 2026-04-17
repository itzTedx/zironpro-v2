import { Header } from "@/components/shared/header";

import { IndustryIcon } from "./industry-icon";

interface Capability {
	text: string;
	icon?: string;
}

interface IndustryCapabilityGridProps {
	capabilities: Capability[];
}

export function IndustryCapabilityGrid({
	capabilities,
}: IndustryCapabilityGridProps) {
	if (!capabilities.length) return null;

	return (
		<section className="dashed dashed-y">
			<Header
				description="Capabilities refined for your market and audience."
				title="What Sets Us Apart"
			/>
			<div className="dashed dashed-x container mx-auto max-w-7xl">
				<div className="grid gap-6 px-6 py-12 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
					{capabilities.map((cap) => (
						<div
							className="flex items-start gap-4 rounded-xl border bg-card p-5"
							key={cap.text}
						>
							{cap.icon && (
								<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
									<IndustryIcon className="size-5" name={cap.icon} />
								</div>
							)}
							<p className="font-medium text-primary text-sm leading-relaxed">
								{cap.text}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
