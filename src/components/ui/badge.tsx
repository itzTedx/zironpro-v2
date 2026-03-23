import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-medium outline-none transition-color focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3.5 sm:[&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [button,a&]:cursor-pointer [button,a&]:pointer-coarse:after:absolute [button,a&]:pointer-coarse:after:size-full [button,a&]:pointer-coarse:after:min-h-11 [button,a&]:pointer-coarse:after:min-w-11",
	{
		defaultVariants: {
			size: "default",
			variant: "default",
		},
		variants: {
			size: {
				default:
					"h-7 min-w-6 px-[calc(--spacing(3.5)-1px)] text-xs shadow-sm sm:h-8 sm:min-w-9 sm:text-sm",
				lg: "h-8 min-w-8 px-[calc(--spacing(4)-1px)] text-base sm:h-9 sm:min-w-9 sm:text-base",
				sm: "h-5 w-fit min-w-5 px-[calc(--spacing(2)-1px)] text-xs sm:text-[.625rem]",
			},
			variant: {
				default: "bg-gray-1500 text-card [button,a&]:hover:bg-primary/90",
				destructive:
					"bg-destructive text-white [button,a&]:hover:bg-destructive/90",
				error:
					"bg-destructive/8 text-destructive-foreground dark:bg-destructive/16",
				info: "bg-info/8 text-info-foreground dark:bg-info/16",
				outline:
					"border-primary text-primary [button,a&]:hover:bg-accent/50 dark:[button,a&]:hover:bg-input/48",
				ghost:
					"bg-gray-300 text-muted-foreground shadow-none [button,a&]:hover:bg-gray-400/80 [button,a&]:hover:text-foreground",
				secondary:
					"bg-secondary text-secondary-foreground [button,a&]:hover:bg-secondary/90",
				success: "bg-success/8 text-success-foreground dark:bg-success/16",
				warning: "bg-warning/8 text-warning-foreground dark:bg-warning/16",
			},
		},
	}
);

interface BadgeProps extends useRender.ComponentProps<"span"> {
	variant?: VariantProps<typeof badgeVariants>["variant"];
	size?: VariantProps<typeof badgeVariants>["size"];
}

function Badge({ className, variant, size, render, ...props }: BadgeProps) {
	const defaultProps = {
		className: cn(badgeVariants({ className, size, variant })),
		"data-slot": "badge",
	};

	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(defaultProps, props),
		render,
	});
}

export { Badge, badgeVariants };
