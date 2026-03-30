import Image from "next/image";

import { Noise } from "@/components/shared/noise";
import { Button } from "@/components/ui/button";

import { IconCaretRight } from "@/assets/icons/caret";
import { IconChevronRight } from "@/assets/icons/chevrons";
import { LogoMono } from "@/assets/logo";

export const VideoReel = () => {
	return (
		<section className="dashed dashed-t">
			<div className="dashed dashed-x mx-auto flex max-w-7xl items-center justify-center p-6 md:p-20">
				<div className="squircle relative max-w-5xl overflow-hidden rounded-5xl shadow-lg">
					<Noise />
					<Image
						alt="Social media reel previews by Ziron Media in Dubai"
						height={576}
						src="/images/reel.png"
						width={1024}
					/>
					<div className="absolute top-0 z-10 flex size-full flex-col justify-between p-6 md:p-12">
						<LogoMono className="h-8 w-fit text-white md:h-10" />

						<div className="max-w-sm space-y-4 md:space-y-8">
							<h3 className="hidden text-balance font-medium text-background text-xl md:block md:text-3xl">
								Why every modern Business needs a strong digital presence?
							</h3>
							<div className="flex items-center gap-3">
								<Button
									className="border-white/60 bg-card/30 text-white backdrop-blur-lg hover:text-foreground"
									data-label="Video reel - Watch video"
									data-location="home_video_reel"
									data-track="cta_click"
									variant="outline"
								>
									Watch video <IconCaretRight />
								</Button>
								<Button
									className="group hidden px-0 text-white hover:text-card sm:pr-4 sm:pl-2 md:inline-flex"
									data-label="Video reel - Read case study"
									data-location="home_video_reel"
									data-track="cta_click"
									variant="ghost"
								>
									<div className="flex size-6 items-center justify-center rounded-md bg-white/20">
										<IconChevronRight />
									</div>
									Read case study
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
