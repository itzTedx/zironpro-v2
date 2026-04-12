import Script from "next/script";

type JsonLdScriptProps = {
	id: string;
	data: unknown;
};

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
	return (
		<Script id={id} type="application/ld+json">
			{JSON.stringify(data)}
		</Script>
	);
}
