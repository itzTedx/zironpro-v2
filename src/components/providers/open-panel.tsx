import { OpenPanelComponent } from "@openpanel/nextjs";
export default function OpenPanelProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<OpenPanelComponent
				apiUrl={process.env.NEXT_PUBLIC_OPENPANEL_API_URL ?? ""}
				clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? ""}
				scriptUrl="https://test.zironmedia.com/op1.js"
				trackAttributes={true}
				trackOutgoingLinks={true}
				trackScreenViews={true}
			/>
			{children}
		</>
	);
}
