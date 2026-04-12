import { Faq, FaqContent } from "@/features/services/components/faq";

export const ContactFaqs = () => {
	return (
		<section className="dashed dashed-x container mx-auto max-w-7xl py-12 md:py-16">
			<Faq compact>
				<FaqContent title="How long does it take to build a website?">
					Typically 4–12 weeks, depending on the scope and complexity. A simple
					business website takes 4–6 weeks, while complex e-commerce or web
					applications may take 8–12 weeks. We provide detailed timelines during
					project planning.
				</FaqContent>
				<FaqContent title="What technologies do you use for website development?">
					We use the latest modern TypeScript stack including Next.js 16, React
					19, TypeScript 5, Tailwind CSS 4, and Shadcn UI. Our stack includes
					type-safe APIs (tRPC, Hono), state management (TanStack Query,
					Zustand), databases (Prisma, Drizzle ORM), testing (Vitest,
					Playwright), and modern build tools (Turbopack, Vite). We also
					leverage GSAP for animations, React Hook Form for forms, and MDX for
					content management.
				</FaqContent>
				<FaqContent title="Do you provide website hosting and maintenance?">
					We can recommend hosting solutions and assist with deployment. We also
					offer ongoing maintenance, security updates, and support packages to
					keep your website secure and performing optimally.
				</FaqContent>
				<FaqContent title="Will my website be mobile-responsive?">
					Absolutely. All our websites are built mobile-first and fully
					responsive, ensuring excellent experiences across all devices —
					desktop, tablet, and mobile. We test on multiple devices and screen
					sizes.
				</FaqContent>
				<FaqContent title="Do you handle SEO optimization?">
					Yes. SEO best practices are integrated throughout development,
					including semantic HTML, meta tags, structured data, fast performance,
					and SEO-friendly architecture. We can also provide ongoing SEO
					services.
				</FaqContent>
				<FaqContent title="Can you integrate with third-party services?">
					Absolutely. We integrate with payment processors, CRM systems, email
					marketing platforms, analytics tools, and other third-party services
					your business needs.
				</FaqContent>
				<FaqContent title="What's included in a website development project?">
					Our projects include custom design, development, responsive
					implementation, SEO optimization, content integration, testing,
					deployment, and documentation. Additional services like hosting setup
					and training are available.
				</FaqContent>
				<FaqContent title="Do you build e-commerce websites?">
					Yes. We build complete e-commerce solutions with shopping carts,
					payment processing, product management, inventory systems, and order
					fulfillment. We can integrate with platforms like Stripe, Shopify, or
					custom solutions.
				</FaqContent>
				<FaqContent title="Can you redesign an existing website?">
					Absolutely. We can redesign and rebuild existing websites, improving
					design, performance, and user experience while maintaining SEO value
					and migrating existing content.
				</FaqContent>
				<FaqContent title="How do you ensure website performance?">
					We optimize for Core Web Vitals, implement code splitting, optimize
					images, use efficient caching strategies, and leverage Next.js
					performance features. We test and monitor performance throughout
					development.
				</FaqContent>
				<FaqContent title="Do you provide website training and documentation?">
					Yes. We provide comprehensive documentation and training on how to
					update content, manage your website, and use any custom features or
					admin panels we've built for you.
				</FaqContent>
				<FaqContent title="Do you use type-safe APIs and databases?">
					Absolutely. We use type-safe solutions like tRPC for end-to-end type
					safety, Prisma or Drizzle ORM for type-safe database access, and
					ensure full TypeScript inference throughout the entire stack for
					better developer experience and fewer runtime errors.
				</FaqContent>
				<FaqContent title="What testing frameworks do you use?">
					We use Vitest for fast unit testing, Playwright for end-to-end
					testing, and Testing Library for component testing. All testing is
					done with full TypeScript support for type-safe test suites.
				</FaqContent>
			</Faq>
		</section>
	);
};
