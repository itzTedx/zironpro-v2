"use client";

import { ToastProvider } from "@/components/ui/toast";

import { LenisProvider } from "./lenis";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		// <BProgressProvider>
		<LenisProvider>
			<ToastProvider>{children}</ToastProvider>
		</LenisProvider>
		// </BProgressProvider>
	);
};
