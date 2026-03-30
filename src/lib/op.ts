import { OpenPanel } from "@openpanel/nextjs";

export const op = new OpenPanel({
	clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? "",
	clientSecret: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET ?? "",
});
