"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
	question: string;
	answer: string;
}

interface IndustryFaqProps {
	items: FaqItem[];
}

export function IndustryFaq({ items }: IndustryFaqProps) {
	if (!items.length) return null;

	return (
		<Accordion>
			{items.map((item, index) => (
				<AccordionItem key={item.question} value={`faq-${index}`}>
					<AccordionTrigger>{item.question}</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
