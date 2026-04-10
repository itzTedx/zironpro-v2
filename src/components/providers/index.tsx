"use client";

import { ToastProvider } from "@/components/ui/toast";

import { GtmDataTrackListener } from "./gtm-data-track-listener";
import { LenisProvider } from "./lenis";
import OpenPanelProvider from "./open-panel";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		// <BProgressProvider>
		<OpenPanelProvider>
			<GtmDataTrackListener />
			<LenisProvider>
				<ToastProvider>{children}</ToastProvider>
			</LenisProvider>
		</OpenPanelProvider>
		// </BProgressProvider>
	);
};
