"use client";

import type { ComponentType } from "react";

import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipCreateHandle,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import {
	IconSocialFacebook,
	IconSocialLinkedIn,
	IconSocialWhatsapp,
} from "@/assets/icons/socials";

const tooltipHandle = TooltipCreateHandle<ComponentType>();

function LinkedInContent() {
	return <span>Share on LinkedIn</span>;
}

function FacebookContent() {
	return <span>Share on Facebook</span>;
}

function WhatsappContent() {
	return <span>Share on WhatsApp</span>;
}

function CopyLinkContent() {
	return <span>Copy link</span>;
}

const shareItems = [
	{
		id: "linkedin",
		label: "Share on LinkedIn",
		icon: IconSocialLinkedIn,
		payload: LinkedInContent,
	},
	{
		id: "facebook",
		label: "Share on Facebook",
		icon: IconSocialFacebook,
		payload: FacebookContent,
	},
	{
		id: "whatsapp",
		label: "Share on WhatsApp",
		icon: IconSocialWhatsapp,
		payload: WhatsappContent,
	},
	{
		id: "copy-link",
		label: "Copy link",
		icon: Share2,
		payload: CopyLinkContent,
	},
] as const;

export function SocialShareActions() {
	return (
		<TooltipProvider>
			<ul className="flex items-center gap-1">
				{shareItems.map((item) => {
					const Icon = item.icon;
					return (
						<li key={item.id}>
							<TooltipTrigger
								className="after:absolute after:left-full after:h-full after:w-1"
								handle={tooltipHandle}
								payload={item.payload}
								render={
									<Button
										aria-label={item.label}
										size="icon-xs"
										variant="ghost"
									/>
								}
							>
								<Icon className="text-muted-foreground" />
							</TooltipTrigger>
						</li>
					);
				})}
			</ul>

			<Tooltip handle={tooltipHandle}>
				{({ payload: Payload }) => (
					<TooltipPopup>{Payload !== undefined && <Payload />}</TooltipPopup>
				)}
			</Tooltip>
		</TooltipProvider>
	);
}
