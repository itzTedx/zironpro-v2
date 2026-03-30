import { OpenPanelComponent } from "@openpanel/nextjs";
export default function OpenPanelProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<OpenPanelComponent
				apiUrl={process.env.OPENPANEL_API_URL ?? ""}
				clientId={process.env.OPENPANEL_CLIENT_ID ?? ""}
				trackAttributes={true}
				trackOutgoingLinks={true}
				trackScreenViews={true}
			/>
			{children}
		</>
	);
}
