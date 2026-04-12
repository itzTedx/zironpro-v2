"use client";

import { OpenPanelComponent } from "@openpanel/nextjs";

export default function OpenPanelProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const apiUrl = process.env.NEXT_PUBLIC_OPENPANEL_API_URL ?? "";
	const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? "";

	// Avoid rendering analytics when not configured (e.g. local env without keys)
	const isConfigured = apiUrl !== "" && clientId !== "";

	return (
		<>
			{isConfigured ? (
				<OpenPanelComponent
					apiUrl={apiUrl}
					clientId={clientId}
					globalProperties={{
						environment: process.env.NODE_ENV,
					}}
					scriptUrl="https://analytics.zironpro.ae/op1.js"
					sessionReplay={{
						enabled: true,
						maskAllInputs: true,
					}}
					trackAttributes={true}
					trackOutgoingLinks={true}
					trackScreenViews={true}
				/>
			) : null}
			{children}
		</>
	);
}
