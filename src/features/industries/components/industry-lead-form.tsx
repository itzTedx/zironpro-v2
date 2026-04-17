"use client";

import { useTransition } from "react";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useOpenPanel } from "@openpanel/nextjs";
import {
	Controller,
	type ControllerFieldState,
	type ControllerRenderProps,
	useForm,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldAsterisk,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PhoneInput } from "@/components/ui/phone-input";
import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { SERVICES } from "@/features/services/constant";
import { pushGtmEvent } from "@/lib/gtm";
import { OP_EVENTS } from "@/lib/op-events";

import { submitIndustryLeadForm } from "../actions";
import { type IndustryLeadType, industryLeadSchema } from "../actions/schema";

const SERVICE_ITEMS: { label: string; value: string }[] = [
	...SERVICES.map((service) => ({
		label: service.title,
		value: service.title,
	})),
	{ label: "Not sure yet, let's talk", value: "Not sure yet, let's talk" },
];

type FieldName = "name" | "email" | "phone" | "service" | "message";

interface IndustryLeadFormProps {
	formId: string;
	industrySlug: string;
	industryTitle: string;
	placement: "hero_modal" | "page_footer";
}

function FormField({
	control,
	disabled,
	name,
	id,
	label,
	isRequired = false,
	renderControl,
}: {
	control: ReturnType<typeof useForm<IndustryLeadType>>["control"];
	disabled: boolean;
	name: FieldName;
	id: string;
	label: string;
	isRequired?: boolean;
	renderControl: (props: {
		field: ControllerRenderProps<IndustryLeadType, FieldName>;
		fieldState: ControllerFieldState;
		disabled: boolean;
		id: string;
	}) => React.ReactNode;
}) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={id}>
						{label}
						{isRequired ? <FieldAsterisk /> : null}
					</FieldLabel>
					{renderControl({ field, fieldState, disabled, id })}
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}

export function IndustryLeadForm({
	formId,
	industrySlug,
	industryTitle,
	placement,
}: IndustryLeadFormProps) {
	const [isPending, startTransition] = useTransition();
	const openPanel = useOpenPanel();

	const form = useForm<IndustryLeadType>({
		resolver: zodResolver(industryLeadSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			service: "",
			message: "",
			industrySlug,
			industryTitle,
			placement,
		},
	});

	async function onSubmit(data: IndustryLeadType) {
		startTransition(async () => {
			const response = await submitIndustryLeadForm(data);
			if (response.error) {
				openPanel.track(OP_EVENTS.contactFormError, {
					source: `industry_${placement}`,
					industry: industrySlug,
				});
				pushGtmEvent({
					event: OP_EVENTS.contactFormError,
					source: `industry_${placement}`,
					industry: industrySlug,
				});
				toastManager.add({
					type: "error",
					title: "Message not sent",
					description: response.error,
				});
				return;
			}

			toastManager.add({
				type: "success",
				title: "Message sent",
				description: "Thanks for reaching out. We'll get back to you soon.",
			});
			form.reset();
			openPanel.track(OP_EVENTS.contactFormSubmitted, {
				source: `industry_${placement}`,
				industry: industrySlug,
				service: data.service || "unspecified",
			});
			pushGtmEvent({
				event: OP_EVENTS.contactFormSubmitted,
				source: `industry_${placement}`,
				industry: industrySlug,
				service: data.service || "unspecified",
			});
		});
	}

	return (
		<form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<FormField
					control={form.control}
					disabled={isPending}
					id={`${formId}-name`}
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
							placeholder="Ahmed Rashid"
						/>
					)}
				/>
				<FieldGroup orientation="horizontal">
					<FormField
						control={form.control}
						disabled={isPending}
						id={`${formId}-email`}
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
								placeholder="your@company.com"
								type="email"
							/>
						)}
					/>
					<FormField
						control={form.control}
						disabled={isPending}
						id={`${formId}-phone`}
						label="Phone Number"
						name="phone"
						renderControl={({ field, fieldState, disabled, id }) => (
							<PhoneInput
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
				</FieldGroup>
				<FormField
					control={form.control}
					disabled={isPending}
					id={`${formId}-service`}
					isRequired
					label="What service are you interested in?"
					name="service"
					renderControl={({ field, fieldState, disabled, id }) => (
						<Select
							aria-label="Select a service"
							items={SERVICE_ITEMS}
							onValueChange={(value) => field.onChange(value ?? "")}
							value={field.value}
						>
							<SelectTrigger
								aria-invalid={fieldState.invalid}
								disabled={disabled}
								id={id}
							>
								<SelectValue>How can we help you?</SelectValue>
							</SelectTrigger>
							<SelectPopup>
								{SERVICE_ITEMS.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectPopup>
						</Select>
					)}
				/>
				<FormField
					control={form.control}
					disabled={isPending}
					id={`${formId}-message`}
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
						data-label={`Industry - Send message (${placement})`}
						data-location={`industry_${placement}`}
						data-track="cta_click"
						disabled={isPending}
						form={formId}
						type="submit"
					>
						<LoadingSwap
							className="flex w-full items-center justify-between"
							isLoading={isPending}
						>
							<span>
								Send Message{" "}
								<span className="hidden font-normal text-primary-secondary md:inline">
									- it&apos;s free
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
