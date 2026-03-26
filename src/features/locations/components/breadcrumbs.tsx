import type { Route } from "next";
import Link from "next/link";

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav aria-label="Breadcrumb" className="container max-w-7xl py-4 text-sm">
			<ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
				{items.map((item, index) => (
					<li className="flex items-center gap-2" key={item.href}>
						{index > 0 ? <span>/</span> : null}
						<Link className="hover:text-foreground" href={item.href as Route}>
							{item.label}
						</Link>
					</li>
				))}
			</ol>
		</nav>
	);
}
