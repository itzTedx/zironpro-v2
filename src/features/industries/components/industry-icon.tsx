import {
	Building2,
	CalendarCheck,
	Factory,
	GraduationCap,
	Landmark,
	type LucideIcon,
	Rocket,
	Scale,
	ShoppingCart,
	Sparkles,
	Stethoscope,
	Truck,
	UtensilsCrossed,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
	Building2,
	Stethoscope,
	ShoppingCart,
	Truck,
	Landmark,
	UtensilsCrossed,
	GraduationCap,
	Rocket,
	Sparkles,
	Scale,
	Factory,
	CalendarCheck,
};

interface IndustryIconProps {
	name: string;
	className?: string;
}

export function IndustryIcon({ name, className }: IndustryIconProps) {
	const Icon = ICON_MAP[name];
	if (!Icon) return null;
	return <Icon className={className} />;
}

export function getIndustryIcon(name: string): LucideIcon | null {
	return ICON_MAP[name] ?? null;
}
