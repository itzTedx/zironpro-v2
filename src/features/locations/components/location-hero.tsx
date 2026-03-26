interface LocationHeroProps {
	title: string;
	description: string;
	location: string;
}

export function LocationHero({
	title,
	description,
	location,
}: LocationHeroProps) {
	return (
		<header className="dashed dashed-b bg-card">
			<div className="container max-w-7xl py-16 md:py-20">
				<p className="text-muted-foreground text-sm uppercase tracking-wide">
					Serving {location}
				</p>
				<h1 className="mt-3 font-semibold text-4xl text-primary tracking-tight md:text-6xl">
					{title}
				</h1>
				<p className="mt-4 max-w-3xl text-lg text-muted-foreground">
					{description}
				</p>
			</div>
		</header>
	);
}
