import { cn } from "@/lib/utils";

interface HeaderProps {
	title: string;
	description: string;
	className?: string;
	children?: React.ReactNode;
}

export const Header = ({
	title,
	description,
	className,
	children,
}: HeaderProps) => {
	return (
		<header
			className={cn(
				"dashed dashed-x container flex w-full max-w-7xl items-center gap-4 px-6 py-12 md:px-0",
				className
			)}
		>
			<div
				className={cn(
					"container flex items-center",
					children ? "justify-between" : "justify-center"
				)}
			>
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
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
