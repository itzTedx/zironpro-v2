import { Route } from "next";

import { IconNfc } from "@/assets/icons/nfc";

export type NavLink = {
	label: string;
	href?: Route;
	submenu?: Submenu[];
};

export type Submenu = {
	id: string;
	icon?: typeof IconNfc;
	title: string;
	description: string;
	href: Route;
	image?: string;
	badge?: string;
	lists?: {
		title: string;
		slug: string;
		image: string;
		description: string;
	}[];
};

export type ServiceType = {
	id: string;
	icon: typeof IconNfc;
	title: string;
	description: string;
	href: Route;
};

export type Social = {
	icon: typeof IconNfc;
	label: string;
	href: Route;
};

export type FooterMeta = {
	label: string;
	href: Route;
};
