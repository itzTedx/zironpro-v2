import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { siteConfig } from "@/data/site-config";
import {
	buildBreadcrumbSchema,
	buildWebPageSchema,
	createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Terms of Service | ZironPro Dubai, UAE",
	description:
		"Read ZironPro terms of service for website, branding, and marketing engagements across Dubai, Abu Dhabi, Sharjah, and the UAE.",
	path: "/terms-of-service",
	keywords: ["terms of service UAE", "agency terms Dubai", "ZironPro terms"],
});

export default function TermsOfServicePage() {
	const companyName = siteConfig.companyName;
	const webPageSchema = buildWebPageSchema(
		"Terms of Service | ZironPro Dubai, UAE",
		"Read ZironPro terms of service for website, branding, and marketing engagements across Dubai, Abu Dhabi, Sharjah, and the UAE.",
		"/terms-of-service"
	);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", path: "/" },
		{ name: "Terms of Service", path: "/terms-of-service" },
	]);

	return (
		<main className="container max-w-4xl space-y-8 py-12 md:py-16">
			<Script id="schema-terms-webpage" type="application/ld+json">
				{JSON.stringify(webPageSchema)}
			</Script>
			<Script id="schema-terms-breadcrumb" type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</Script>
			<header className="space-y-3">
				<h1 className="font-display font-semibold text-4xl text-primary md:text-5xl">
					Terms of Service
				</h1>
				<p className="text-muted-foreground">
					These Terms of Service govern your use of our website and the
					provision of branding, website, and marketing services by{" "}
					{companyName} for clients in the UAE.
				</p>
				<p className="text-muted-foreground text-sm">
					Last updated: March 26, 2026
				</p>
			</header>
			<section className="space-y-8 text-muted-foreground">
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Acceptance and eligibility
					</h2>
					<p>
						By accessing our website or engaging our services, you agree to
						these Terms of Service. If you engage us on behalf of a company or
						organization, you confirm that you have authority to bind that
						entity.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Definitions</h2>
					<p>
						In these terms, &quot;Services&quot; means the digital services we
						provide, including strategy, design, development, and marketing
						work. &quot;Deliverables&quot; means agreed outputs under a
						proposal, statement of work, or project agreement. &quot;Client
						Materials&quot; means any content, assets, credentials, or
						instructions supplied by you.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Service scope</h2>
					<p>
						Project scope, milestones, timelines, and deliverables are defined
						in writing. If there is any conflict between these terms and a
						signed project agreement, the signed project agreement will control
						for that project.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Change requests</h2>
					<p>
						Requests outside the agreed scope may require a change order,
						including revised fees or timelines. We will not begin out-of-scope
						work until changes are confirmed in writing.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Fees, invoicing, and taxes
					</h2>
					<p>
						Fees, payment schedules, and deposit requirements are specified in
						your proposal or agreement. Unless stated otherwise, invoices are
						due within the time period shown on the invoice. You are responsible
						for any applicable taxes, duties, and government charges.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Late payment and suspension
					</h2>
					<p>
						If payment is overdue, we may pause work, withhold deliverables, or
						suspend access to services until outstanding amounts are settled.
						Delays caused by payment issues may affect project timelines.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Client responsibilities
					</h2>
					<p>To support successful delivery, you agree to:</p>
					<ul className="list-disc space-y-1 pl-6">
						<li>provide timely approvals, feedback, and required materials;</li>
						<li>
							ensure that Client Materials are lawful and properly licensed;
						</li>
						<li>provide accurate account, billing, and project information;</li>
						<li>
							cooperate with reasonable technical and operational requirements.
						</li>
					</ul>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Intellectual property
					</h2>
					<p>
						Each party retains ownership of its pre-existing intellectual
						property. Subject to full payment of applicable fees, you receive
						rights to use final deliverables as defined in your agreement.
						Third-party assets (such as fonts, stock media, plugins, and
						software) remain subject to their own license terms.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Confidentiality</h2>
					<p>
						Each party agrees to protect confidential information received from
						the other and use it only for project-related purposes, except where
						disclosure is required by law.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Third-party platforms and services
					</h2>
					<p>
						Some deliverables rely on third-party platforms or tools. We are not
						responsible for outages, policy changes, or actions of third-party
						providers outside our control.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Warranties disclaimer
					</h2>
					<p>
						Services are provided on an &quot;as available&quot; and &quot;as
						is&quot; basis, except as expressly agreed in writing. We do not
						guarantee specific commercial outcomes, rankings, or uninterrupted
						availability.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Limitation of liability
					</h2>
					<p>
						To the maximum extent permitted by applicable law, {companyName} is
						not liable for indirect, incidental, special, consequential, or
						punitive damages, including loss of profit, revenue, data, or
						goodwill.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Indemnity</h2>
					<p>
						You agree to indemnify and hold harmless {companyName} from claims,
						losses, and costs arising from Client Materials, your breach of
						these terms, or your violation of applicable law or third-party
						rights.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Termination and effects
					</h2>
					<p>
						Either party may terminate services as set out in the governing
						proposal or agreement. On termination, you must pay for work
						performed and approved costs incurred up to the termination date.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Governing law and disputes
					</h2>
					<p>
						These terms are governed by applicable laws of the UAE. Any dispute
						related to these terms or our services is subject to the competent
						courts in the UAE, unless otherwise agreed in writing.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Force majeure</h2>
					<p>
						Neither party is liable for delay or failure caused by events beyond
						reasonable control, including outages, natural events, labor
						disruptions, governmental actions, or telecommunications failures.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">
						Changes to these terms
					</h2>
					<p>
						We may update these Terms of Service from time to time. Updated
						versions are published on this page with the latest effective date.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-medium text-2xl text-primary">Contact</h2>
					<p>
						For contractual notices or questions about these terms, please{" "}
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
