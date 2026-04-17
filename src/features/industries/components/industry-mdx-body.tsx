import MDXContent from "@/components/markdown/mdx-component";

interface IndustryMdxBodyProps {
	source: string;
}

export function IndustryMdxBody({ source }: IndustryMdxBodyProps) {
	if (!source.trim()) return null;

	return (
		<section className="dashed dashed-y">
			<div className="dashed dashed-x container mx-auto max-w-7xl">
				<div className="prose prose-lg mx-auto max-w-3xl px-6 py-12 md:px-0">
					<MDXContent source={source} />
				</div>
			</div>
		</section>
	);
}
