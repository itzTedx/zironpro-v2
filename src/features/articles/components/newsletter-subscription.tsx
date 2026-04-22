"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { toastManager } from "@/components/ui/toast";

import { subscribeToNewsletter } from "../actions/newsletter";
import {
	type NewsletterSubscriptionType,
	newsletterSubscriptionSchema,
} from "../actions/newsletter-schema";

export function NewsletterSubscription() {
	const [isPending, startTransition] = useTransition();
	const form = useForm<NewsletterSubscriptionType>({
		resolver: zodResolver(newsletterSubscriptionSchema),
		defaultValues: {
			email: "",
		},
	});

	const emailError = form.formState.errors.email?.message;

	function onSubmit(data: NewsletterSubscriptionType) {
		startTransition(async () => {
			const response = await subscribeToNewsletter(data);

			if (response.error) {
				toastManager.add({
					type: "error",
					title: "Subscription failed",
					description: response.error,
				});
				return;
			}

			toastManager.add({
				type: "success",
				title: "You're subscribed",
				description:
					"Thanks for joining. New articles will land in your inbox.",
			});
			form.reset();
		});
	}

	return (
		<form
			className="flex flex-col gap-3 sm:flex-row sm:items-start"
			id="newsletter-subscription-form"
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<FieldGroup className="gap-3" orientation="horizontal">
				<Input
					{...form.register("email")}
					aria-invalid={Boolean(emailError)}
					autoComplete="email"
					className="h-11 border-none bg-muted-foreground/50"
					disabled={isPending}
					id="newsletter-email"
					placeholder="Enter email"
					type="email"
				/>

				<Button
					className="w-full sm:w-auto"
					data-label="Subscribe newsletter"
					data-location="blogs_newsletter"
					data-track="cta_click"
					disabled={isPending}
					form="newsletter-subscription-form"
					size="xl"
					type="submit"
				>
					<LoadingSwap
						className="flex items-center gap-2"
						isLoading={isPending}
					>
						<span>Subscribe</span>
					</LoadingSwap>
				</Button>
			</FieldGroup>
		</form>
	);
}
