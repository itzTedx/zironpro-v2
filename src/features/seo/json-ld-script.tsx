import { headers } from "next/headers";
import Script from "next/script";

type JsonLdScriptProps = {
	id: string;
	data: unknown;
};

export async function JsonLdScript({ id, data }: JsonLdScriptProps) {
	const nonce = (await headers()).get("x-nonce") ?? undefined;
	return (
		<Script id={id} nonce={nonce} type="application/ld+json">
			{JSON.stringify(data)}
		</Script>
	);
}
