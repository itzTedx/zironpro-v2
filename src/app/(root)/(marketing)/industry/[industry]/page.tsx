export const dynamicParams = false;

export async function generateStaticParams() {
	return [{ industry: "general" }];
}

export default function IndustryBasedPage() {
	return <div>IndustryBasedPage</div>;
}
