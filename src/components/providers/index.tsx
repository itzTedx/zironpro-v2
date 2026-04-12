"use client";

import { MotionConfig } from "motion/react";

import { ToastProvider } from "@/components/ui/toast";

import { GtmDataTrackListener } from "./gtm-data-track-listener";
import { LenisProvider } from "./lenis";
import OpenPanelProvider from "./open-panel";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		// <BProgressProvider>
		<OpenPanelProvider>
			<GtmDataTrackListener />
			<MotionConfig reducedMotion="user">
				<LenisProvider>
					<ToastProvider>{children}</ToastProvider>
				</LenisProvider>
			</MotionConfig>
		</OpenPanelProvider>
		// </BProgressProvider>
	);
};
