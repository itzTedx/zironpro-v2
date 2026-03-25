"use client";

import { LenisProvider } from "./lenis";
import { BProgressProvider } from "./progress";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<BProgressProvider>
			<LenisProvider>{children}</LenisProvider>
		</BProgressProvider>
	);
};
