"use client";

import { ToastProvider } from "@/components/ui/toast";

import { LenisProvider } from "./lenis";
import OpenPanelProvider from "./open-panel";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		// <BProgressProvider>
		<OpenPanelProvider>
			<LenisProvider>
				<ToastProvider>{children}</ToastProvider>
			</LenisProvider>
		</OpenPanelProvider>
		// </BProgressProvider>
	);
};
