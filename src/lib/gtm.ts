"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export function pushGtmEvent(payload: Record<string, unknown>): void {
	if (typeof window === "undefined") {
		return;
	}
	sendGTMEvent(payload);
}
