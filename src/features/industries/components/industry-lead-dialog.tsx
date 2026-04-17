"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { IndustryLeadForm } from "./industry-lead-form";

interface IndustryLeadDialogProps {
	ctaLabel: string;
	modalTitle: string;
	modalDescription: string;
	industrySlug: string;
	industryTitle: string;
}

export function IndustryLeadDialog({
	ctaLabel,
	modalTitle,
	modalDescription,
	industrySlug,
	industryTitle,
}: IndustryLeadDialogProps) {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button
						className="group w-full flex-1 justify-between gap-2 md:w-48"
						data-label="Industry - Get growth plan"
						data-location="industry_hero"
						data-track="cta_click"
						size="xl"
					/>
				}
			>
				<span>{ctaLabel}</span>
				<IconArrowRightTag className="size-5 transition-transform duration-300 ease-in group-hover:translate-x-1" />
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] overflow-y-auto p-6">
				<DialogHeader>
					<DialogTitle className="font-semibold text-xl">
						{modalTitle}
					</DialogTitle>
					<DialogDescription>{modalDescription}</DialogDescription>
				</DialogHeader>
				<IndustryLeadForm
					formId="industry-lead-hero"
					industrySlug={industrySlug}
					industryTitle={industryTitle}
					placement="hero_modal"
				/>
			</DialogContent>
		</Dialog>
	);
}
