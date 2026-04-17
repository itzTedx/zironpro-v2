import type { IndustrySocialProof as SocialProofData } from "@/lib/industry-seo";

interface IndustrySocialProofProps {
	data: SocialProofData;
}

export function IndustrySocialProof({ data }: IndustrySocialProofProps) {
	if (!data.quote && !data.stat) return null;

	return (
		<section className="dashed dashed-y">
			<div className="dashed dashed-x container mx-auto max-w-7xl">
				<div className="flex flex-col items-center gap-4 px-6 py-12 text-center md:px-0">
					{data.stat && (
						<p className="font-display font-bold text-3xl text-brand-600 tracking-tight md:text-4xl">
							{data.stat}
						</p>
					)}
					{data.quote && (
						<blockquote className="max-w-2xl text-balance text-lg text-muted-foreground italic">
							&ldquo;{data.quote}&rdquo;
						</blockquote>
					)}
					{data.clientName && (
						<p className="font-medium text-primary text-sm">
							&mdash; {data.clientName}
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
