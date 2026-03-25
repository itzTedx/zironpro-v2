import { cn } from "@/lib/utils";

interface HeaderProps {
	title: string;
	description: string;
	className?: string;
	children?: React.ReactNode;
	isBorderless?: boolean;
}

export const Header = ({
	title,
	description,
	className,
	children,
	isBorderless = false,
}: HeaderProps) => {
	return (
		<header
			className={cn(
				"flex w-full flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center md:px-0",
				!isBorderless && "dashed dashed-x container max-w-7xl",
				className
			)}
		>
			<div
				className={cn(
					"container flex flex-col sm:flex-row sm:items-center",
					children ? "sm:justify-between" : "sm:justify-center"
				)}
			>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
					<h2 className="font-display font-semibold text-4xl text-gray-1000 leading-[0.9] tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl">
						{title}
					</h2>
					<span
						aria-hidden="true"
						className="hidden h-10 w-px bg-gray-300 sm:block"
					/>
					<p className="max-w-2xs text-balance text-base text-muted-foreground">
						{description}
					</p>
				</div>
				{children}
			</div>
		</header>
	);
};
