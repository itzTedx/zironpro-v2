import Link from "next/link";

import { Button } from "@/components/ui/button";

import { IconArrowRightTag } from "@/assets/icons/arrow";

import { getBlogs } from "../actions/query";
import { BlogCard } from "../components/blog-card";

export const Blogs = () => {
	const blogs = getBlogs(8);

	return (
		<section className="dashed dashed-y relative py-9 md:py-14">
			<header className="mx-auto mb-6 flex max-w-7xl flex-col gap-3 px-6 md:mb-14 md:flex-row md:items-center md:justify-between md:px-0">
				<h2 className="font-display font-semibold text-3xl tracking-tight md:text-5xl">
					Marketing Insights & Resources
				</h2>
				<Button
					className="group w-40 justify-between"
					render={<Link href="/blogs" />}
					variant="secondary"
				>
					More blogs{" "}
					<IconArrowRightTag className="size-5 transition-transform duration-300 ease-in group-hover:translate-x-1" />
				</Button>
			</header>

			<div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-4 md:px-0">
				{blogs.map((article) => (
					<BlogCard blog={article} key={article.slug} />
				))}
			</div>

			<div className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-linear-180 from-white" />
			<div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-linear-0 from-white" />
		</section>
	);
};
