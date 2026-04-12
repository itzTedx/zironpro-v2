"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getMediaQueryList(): MediaQueryList | null {
	if (typeof window === "undefined") return null;
	return window.matchMedia(QUERY);
}

function subscribe(onStoreChange: () => void) {
	const mq = getMediaQueryList();
	if (!mq) return () => {};
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
	return getMediaQueryList()?.matches ?? false;
}

function getServerSnapshot() {
	return false;
}

/** Matches `prefers-reduced-motion: reduce` (stable for SSR + hydration). */
export function usePrefersReducedMotion(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
