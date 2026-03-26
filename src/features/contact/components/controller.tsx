import { ReactNode } from "react";

import {
	Control,
	Controller,
	ControllerFieldState,
	ControllerRenderProps,
} from "react-hook-form";

import {
	Field,
	FieldAsterisk,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";

import { ContactType } from "../actions/schema";

interface BaseFieldConfig {
	name: keyof ContactType;
	id: string;
	label: string;
	isRequired?: boolean;
}

interface ContactFormFieldProps extends BaseFieldConfig {
	control: Control<ContactType>;
	disabled: boolean;
	renderControl: (props: {
		field: ControllerRenderProps<ContactType, keyof ContactType>;
		fieldState: ControllerFieldState;
		disabled: boolean;
		id: string;
	}) => ReactNode;
}

export function ContactFormField({
	control,
	disabled,
	name,
	id,
	label,
	isRequired = false,
	renderControl,
}: ContactFormFieldProps) {
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
