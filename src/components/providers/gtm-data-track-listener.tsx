"use client";

import { useEffect } from "react";

import { pushGtmEvent } from "@/lib/gtm";

export function GtmDataTrackListener() {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			const target = event.target;
			if (!(target instanceof Element)) {
				return;
			}

			const tracked = target.closest("[data-track]");
			if (!tracked) {
				return;
			}

			const name = tracked.getAttribute("data-track");
			if (!name) {
				return;
			}

			const label = tracked.getAttribute("data-label");
			const location = tracked.getAttribute("data-location");
			const anchor = tracked.closest("a");
			const linkUrl = anchor?.href;

			pushGtmEvent({
				event: name,
				...(label ? { label } : {}),
				...(location ? { location } : {}),
				...(linkUrl ? { link_url: linkUrl } : {}),
			});
		}

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, []);

	return null;
}
