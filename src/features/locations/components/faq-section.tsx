interface FaqItem {
	question: string;
	answer: string;
}

interface FAQSectionProps {
	items?: FaqItem[];
}

export function FAQSection({ items = [] }: FAQSectionProps) {
	if (!items.length) return null;

	return (
		<section className="dashed dashed-y">
			<div className="container max-w-5xl py-12 md:py-16">
				<h2 className="font-semibold text-2xl text-primary md:text-3xl">
					FAQs
				</h2>
				<div className="mt-6 space-y-4">
					{items.map((item) => (
						<details className="rounded-lg border p-4" key={item.question}>
							<summary className="cursor-pointer font-medium">
								{item.question}
							</summary>
							<p className="mt-3 text-muted-foreground">{item.answer}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
