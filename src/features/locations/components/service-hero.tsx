interface ServiceHeroProps {
	title: string;
	description: string;
	service: string;
	location: string;
	isFallback?: boolean;
}

export function ServiceHero({
	title,
	description,
	service,
	location,
	isFallback = false,
}: ServiceHeroProps) {
	return (
		<header className="dashed dashed-b bg-card">
			<div className="container max-w-7xl py-16 md:py-20">
				<p className="text-muted-foreground text-sm uppercase tracking-wide">
					{service} in {location}
				</p>
				<h1 className="mt-3 font-semibold text-4xl text-primary tracking-tight md:text-6xl">
					{title}
				</h1>
				<p className="mt-4 max-w-3xl text-lg text-muted-foreground">
					{description}
				</p>
				{isFallback ? (
					<p className="mt-3 text-muted-foreground text-sm">
						This page uses our generic service details for this location.
					</p>
				) : null}
			</div>
		</header>
	);
}
