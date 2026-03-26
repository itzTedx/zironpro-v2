"use client";

import { LenisProvider } from "./lenis";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		// <BProgressProvider>
		<LenisProvider>{children}</LenisProvider>
		// </BProgressProvider>
	);
};
