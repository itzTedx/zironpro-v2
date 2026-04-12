import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/data/site-config";
import {
	GOOGLE_TAG_MANAGER_CONTAINER_ID,
	OPENPANEL_SCRIPT_ORIGIN,
} from "@/data/site-tracking";
import { JsonLdScript } from "@/features/seo/json-ld-script";
import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Privacy Policy | ZironPro Dubai, UAE",
	description:
		"Read the ZironPro privacy policy for how we collect, use, and protect client data for marketing and website projects in Dubai and across the UAE.",
	path: "/privacy-policy",
	keywords: [
		"privacy policy agency UAE",
		"data policy Dubai",
		"ZironPro privacy",
	],
});

export default function PrivacyPage() {
	const companyName = siteConfig.companyName;
	const webPageSchema = buildWebPageSchema(
		"Privacy Policy | ZironPro Dubai, UAE",
		"Read the ZironPro privacy policy for how we collect, use, and protect client data for marketing and website projects in Dubai and across the UAE.",
		"/privacy-policy"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Privacy Policy", path: "/privacy-policy" },
	]);

	return (
		<main className="container max-w-4xl space-y-8 py-12 md:py-16">
			<JsonLdScript data={webPageSchema} id="schema-privacy-webpage" />
			<JsonLdScript data={breadcrumbSchema} id="schema-privacy-breadcrumb" />
			<header className="space-y-3">
				<h1 className="font-display font-semibold text-4xl text-primary md:text-5xl">
					Privacy Policy
				</h1>
				<p className="text-muted-foreground">
					This Privacy Policy explains how {companyName} collects, uses, shares,
					and protects personal information when you visit our website or engage
					us for digital services in the UAE.
				</p>
				<p className="text-muted-foreground text-sm">
					Last updated: April 12, 2026
				</p>
			</header>
			<section className="space-y-8 text-muted-foreground">
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Who we are and how to contact us
					</h2>
					<p>
						{companyName} is a UAE-focused digital agency providing branding,
						website development, and marketing services. If you have questions
						about this Privacy Policy or your personal information, please
						contact us through our{" "}
						<Link className="text-primary underline" href="/contact">
							contact page
						</Link>
						.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Data we collect</h2>
					<p>
						Depending on your interaction with us, we may collect: contact data
						(such as name, email, phone, and company name), project data
						(requirements, feedback, and files you provide), billing data
						(invoicing and payment-related details), and technical usage data
						(such as IP address, browser/device information, and on-site
						behavior analytics).
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						How we collect data
					</h2>
					<p>
						We collect information directly from you when you submit forms,
						request a proposal, communicate with our team, or share project
						content. We also collect limited technical information through
						cookies, similar storage, and the analytics and tag tools described
						under “Website technologies and third-party services” below.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Website technologies and third-party services
					</h2>
					<p>
						The list below reflects tools wired into this website today. Public
						identifiers and script hosts are defined in our codebase alongside
						the implementation so they stay aligned with this page; when we
						change containers, hosts, or materially add tracking, we update this
						policy and the last updated date above.
					</p>
					<ul className="list-disc space-y-3 pl-6">
						<li>
							<span className="font-medium text-foreground">
								Google Tag Manager
							</span>{" "}
							(container ID{" "}
							<span className="font-mono text-foreground">
								{GOOGLE_TAG_MANAGER_CONTAINER_ID}
							</span>
							): used to load and manage measurement and marketing tags. Tags
							inside the container can change over time without a code deploy.
							GTM and any third-party tags it fires may use cookies or similar
							technologies and are subject to their providers’ policies. We also
							send selected on-site events to the data layer (for example
							tracked interactions, contact funnel events, and high-level AI
							chat activity) according to configuration in the container.
						</li>
						<li>
							<span className="font-medium text-foreground">OpenPanel</span>:
							when the deployment is configured with OpenPanel, the browser
							loads analytics from{" "}
							<span className="font-mono text-foreground">
								{OPENPANEL_SCRIPT_ORIGIN}
							</span>{" "}
							and sends data to the API endpoint set for that environment.
							Depending on configuration, this can include page and screen
							views, outbound link clicks, element attributes, and session
							replay; replay is set up to mask form inputs. Some server-side
							events (such as contact form outcomes or AI chat request success
							and failure) may be recorded in OpenPanel without storing your
							full chat transcript as analytics metadata.
						</li>
						<li>
							<span className="font-medium text-foreground">WhatsApp</span>: the
							site offers links and a QR code that open WhatsApp, which is
							provided by Meta. Chatting happens on Meta’s services, not inside
							our pages; Meta’s terms and privacy notices apply there.
						</li>
						<li>
							<span className="font-medium text-foreground">AI assistant</span>:
							the on-site assistant sends your messages to our servers, which
							use{" "}
							<span className="font-medium text-foreground">Google Gemini</span>{" "}
							models to generate replies. Do not submit highly sensitive
							personal data, financial details, passwords, or confidential
							business secrets in the chat. If you choose to share contact
							details for follow-up, we use them to respond to your request in
							line with this policy. We may record operational or aggregated
							telemetry about the feature (such as whether a request succeeded)
							in our analytics tools.
						</li>
						<li>
							<span className="font-medium text-foreground">
								Future tags and integrations
							</span>
							: we may add or replace measurement through Google Tag Manager or
							other vendors. When that materially changes what we collect, we
							will revise this section and the last updated date.
						</li>
					</ul>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">How we use data</h2>
					<p>We use personal information to:</p>
					<ul className="list-disc space-y-1 pl-6">
						<li>respond to inquiries and provide client support;</li>
						<li>prepare proposals and deliver contracted services;</li>
						<li>manage invoicing, payments, and service operations;</li>
						<li>
							improve website functionality, security, and user experience;
						</li>
						<li>comply with legal, regulatory, and contractual obligations.</li>
					</ul>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Legal basis and lawful processing
					</h2>
					<p>
						Where applicable, we process personal information based on your
						consent, the need to take steps before entering into a contract or
						to perform a contract with you, our legitimate business purposes,
						and compliance with legal obligations.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Sharing and disclosure
					</h2>
					<p>
						We do not sell personal data. We may share information with trusted
						service providers that support hosting, analytics, communication,
						payments, and business operations, as well as with professional
						advisors or authorities when required by law.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Cross-border data transfers
					</h2>
					<p>
						Some of our technology providers may process information outside the
						UAE. When this occurs, we take reasonable steps to ensure
						appropriate safeguards are in place for transferred data.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Data retention</h2>
					<p>
						We keep personal information only for as long as needed for the
						purposes described in this policy, including legal, accounting, and
						reporting requirements. Retention periods vary based on the type of
						data and service relationship.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Your rights and choices
					</h2>
					<p>
						Subject to applicable law, you may request access to, correction of,
						or deletion of your personal information, and may object to or limit
						certain processing activities. To make a request, contact us via our{" "}
						<Link className="text-primary underline" href="/contact">
							contact page
						</Link>
						.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Cookies and analytics
					</h2>
					<p>
						We use cookies and similar technologies to support core website
						functions, measure performance, and (where configured) support
						advertising or remarketing tags loaded through Google Tag Manager.
						OpenPanel may use its own storage or payloads as described above.
						You can manage cookie and site data settings through your browser
						(and any consent tools we enable in GTM, if present).
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Security of information
					</h2>
					<p>
						We apply reasonable technical and organizational measures to protect
						information against unauthorized access, loss, misuse, or
						alteration. No security method is fully guaranteed, but we
						continuously work to improve our safeguards.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Children&apos;s privacy
					</h2>
					<p>
						Our services are intended for business users and are not directed to
						children. We do not knowingly collect personal information from
						children through our website.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Changes to this Privacy Policy
					</h2>
					<p>
						We may update this Privacy Policy from time to time to reflect
						business, legal, or technical changes. The latest version is always
						published on this page with the updated effective date.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Contact</h2>
					<p>
						If you need clarification about this policy or how we handle
						personal data, please{" "}
						<Link className="text-primary underline" href="/contact">
							contact us
						</Link>
						.
					</p>
				</div>
			</section>
		</main>
	);
}
