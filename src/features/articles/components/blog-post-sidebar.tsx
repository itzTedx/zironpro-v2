import { Route } from "next";
import Link from "next/link";

import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";
import { Item } from "@/components/ui/item";

import { IconArrowLeft } from "@/assets/icons/arrow";

import type {
	RelatedBlog,
	RelatedService,
} from "@/features/articles/actions/types";
import { SocialShareActions } from "@/features/articles/components/social-share-actions";

interface BlogPostSidebarProps {
	shareTitle: string;
	shareUrl: string;
	relatedBlogs: RelatedBlog[];
	relatedServices: RelatedService[];
}

export function BlogPostSidebar({
	shareTitle,
	shareUrl,
	relatedBlogs,
	relatedServices,
}: BlogPostSidebarProps) {
	return (
		<aside className="sticky top-24 h-fit flex-1 space-y-6 md:max-w-[302px]">
			<Item className="flex justify-between gap-2" variant="muted">
				<Link className="group inline-flex items-center gap-2" href="/blogs">
					<div className="pointer-events-none relative flex-none rotate-180 transition-colors duration-500">
						<IconArrowLeft className="size-4 translate-x-0 rotate-180 scale-100 transform-gpu opacity-100 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-2 group-hover:scale-0 group-hover:opacity-0" />
						<IconArrowLeft className="absolute inset-0 size-4 -translate-x-2 rotate-180 scale-0 transform-gpu opacity-0 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
					</div>
					Back
				</Link>
				<SocialShareActions title={shareTitle} url={shareUrl} />
			</Item>
			<Frame>
				<FrameHeader className="px-2 py-0.5">
					<FrameTitle className="text-base">Reading stack</FrameTitle>
				</FrameHeader>
				<FramePanel>
					<ul className="space-y-2 text-muted-foreground text-sm">
						{relatedBlogs.map((item) => (
							<li className="flex items-center gap-2" key={item.slug}>
								<span className="inline-block size-2 shrink-0 rounded-[2px] bg-primary" />
								<Link
									className="line-clamp-1 transition-colors hover:text-foreground"
									href={`/blogs/${item.slug}`}
									title={item.title}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</FramePanel>
			</Frame>
			<Frame>
				<FrameHeader className="px-2 py-0.5">
					<FrameTitle className="text-base">Service stack</FrameTitle>
				</FrameHeader>
				<FramePanel>
					<ul className="space-y-2 text-muted-foreground text-sm">
						{relatedServices.map((item) => (
							<li className="flex items-center gap-2" key={item.href}>
								<span className="inline-block size-2 shrink-0 rounded-[2px] bg-primary" />
								<Link
									className="line-clamp-1 transition-colors hover:text-foreground"
									href={item.href as Route}
									title={item.title}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</FramePanel>
			</Frame>
		</aside>
	);
}
