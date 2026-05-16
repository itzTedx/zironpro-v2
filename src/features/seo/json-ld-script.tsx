type JsonLdScriptProps = {
	id: string;
	data: unknown;
};

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
	return (
		<script id={id} type="application/ld+json">
			{JSON.stringify(data)}
		</script>
	);
}
