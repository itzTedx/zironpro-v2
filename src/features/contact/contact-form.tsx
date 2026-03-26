"use client";

import { useTransition } from "react";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Textarea } from "@/components/ui/textarea";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { submitContactForm } from "./actions";
import { ContactType, contactFormSchema } from "./actions/schema";
import { ContactFormField } from "./components/controller";

export function ContactForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<ContactType>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
		},
	});

	async function onSubmit(data: ContactType) {
		startTransition(async () => {
			await submitContactForm(data);

			// Identify session and track event with Umami
			type Umami = {
				identify: (id: string, data?: Record<string, string | number>) => void;
				track: (e: string, d?: Record<string, string | number>) => void;
			};
			const umami =
				typeof window !== "undefined"
					? (window as Window & { umami?: Umami }).umami
					: undefined;
			if (umami) {
				umami.identify(data.email, { name: data.name, subject: data.subject });
				umami.track("Signup button", {
					email: data.email,
					id:
						typeof crypto !== "undefined" && crypto.randomUUID
							? crypto.randomUUID()
							: Date.now().toString(36),
				});
			}
		});
	}

	return (
		<form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<ContactFormField
					control={form.control}
					disabled={isPending}
					id="contact-form-name"
					isRequired
					label="Full Name"
					name="name"
					renderControl={({ field, fieldState, disabled, id }) => (
						<Input
							{...field}
							aria-invalid={fieldState.invalid}
							autoComplete="name"
							disabled={disabled}
							id={id}
							placeholder="John Doe"
						/>
					)}
				/>
				<ContactFormField
					control={form.control}
					disabled={isPending}
					id="contact-form-email"
					isRequired
					label="Email Address"
					name="email"
					renderControl={({ field, fieldState, disabled, id }) => (
						<Input
							{...field}
							aria-invalid={fieldState.invalid}
							autoComplete="email"
							disabled={disabled}
							id={id}
							placeholder="john@example.com"
							type="email"
						/>
					)}
				/>
				<ContactFormField
					control={form.control}
					disabled={isPending}
					id="contact-form-phone"
					label="Phone Number"
					name="phone"
					renderControl={({ field, fieldState, disabled, id }) => (
						<Input
							{...field}
							aria-invalid={fieldState.invalid}
							autoComplete="tel"
							disabled={disabled}
							id={id}
							placeholder="+971 58 171 1486"
							type="tel"
						/>
					)}
				/>
				<ContactFormField
					control={form.control}
					disabled={isPending}
					id="contact-form-subject"
					isRequired
					label="Subject"
					name="subject"
					renderControl={({ field, fieldState, disabled, id }) => (
						<Input
							{...field}
							aria-invalid={fieldState.invalid}
							disabled={disabled}
							id={id}
							placeholder="How can we help you?"
						/>
					)}
				/>
				<ContactFormField
					control={form.control}
					disabled={isPending}
					id="contact-form-message"
					isRequired
					label="Message"
					name="message"
					renderControl={({ field, fieldState, disabled, id }) => (
						<Textarea
							{...field}
							aria-invalid={fieldState.invalid}
							className="min-h-[120px]"
							disabled={disabled}
							id={id}
							placeholder="Tell us about your project or inquiry..."
						/>
					)}
				/>

				<div className="flex items-center gap-12 pt-2">
					<p className="shrink text-balance text-2xs text-muted-foreground">
						By submitting you agree to our
						<br />{" "}
						<Link
							className="text-primary hover:underline"
							href="/terms-of-service"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							className="text-primary hover:underline"
							href="/privacy-policy"
						>
							Privacy Policy.
						</Link>
					</p>
					<Button
						className="w-full flex-1"
						disabled={isPending}
						form="contact-form"
						type="submit"
					>
						<LoadingSwap
							className="flex w-full items-center justify-between"
							isLoading={isPending}
						>
							<span>
								Send Message{" "}
								<span className="hidden font-normal text-primary-secondary md:inline">
									- it’s free
								</span>
							</span>
							<IconArrowRightTag />
						</LoadingSwap>
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
}
