"use client";

import type { ComponentType } from "react";
import { useCallback } from "react";

import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toastManager } from "@/components/ui/toast";
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

import {
	buildShareUrl,
	copyShareLink,
	openShareWindow,
	type SocialSharePlatform,
} from "@/lib/social-share";

const tooltipHandle = TooltipCreateHandle<ComponentType>();

interface SocialShareActionsProps {
	url: string;
	title: string;
}

type ShareItemId = SocialSharePlatform | "copy-link";

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
		id: "linkedin" as const,
		label: "Share on LinkedIn",
		icon: IconSocialLinkedIn,
		payload: LinkedInContent,
	},
	{
		id: "facebook" as const,
		label: "Share on Facebook",
		icon: IconSocialFacebook,
		payload: FacebookContent,
	},
	{
		id: "whatsapp" as const,
		label: "Share on WhatsApp",
		icon: IconSocialWhatsapp,
		payload: WhatsappContent,
	},
	{
		id: "copy-link" as const,
		label: "Copy link",
		icon: Share2,
		payload: CopyLinkContent,
	},
] as const;

export function SocialShareActions({ url, title }: SocialShareActionsProps) {
	const handleShare = useCallback(
		(platform: SocialSharePlatform) => {
			const shareUrl = buildShareUrl({ url, title, platform });
			const didOpen = openShareWindow(shareUrl);

			if (!didOpen) {
				toastManager.add({
					type: "error",
					title: "Could not open share window",
					description: "Allow pop-ups for this site, or copy the link instead.",
				});
			}
		},
		[title, url]
	);

	const handleCopyLink = useCallback(async () => {
		const didCopy = await copyShareLink(url);

		if (didCopy) {
			toastManager.add({
				type: "success",
				title: "Link copied",
				description: "The article link is ready to paste.",
			});
			return;
		}

		toastManager.add({
			type: "error",
			title: "Could not copy link",
			description: "Copy the URL from your browser address bar instead.",
		});
	}, [url]);

	const handleItemClick = useCallback(
		(itemId: ShareItemId) => {
			if (itemId === "copy-link") {
				void handleCopyLink();
				return;
			}

			handleShare(itemId);
		},
		[handleCopyLink, handleShare]
	);

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
								onClick={() => handleItemClick(item.id)}
								payload={item.payload}
								render={
									<Button
										aria-label={item.label}
										size="icon-xs"
										type="button"
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
