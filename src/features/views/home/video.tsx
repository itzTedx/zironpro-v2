import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { IconCaretRight } from "@/assets/icons/caret";

export const Video = () => {
	return (
		<Dialog>
			<DialogTrigger className="group fixed bottom-9 left-6 z-990 aspect-video h-32 cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-out hover:scale-105">
				<div>
					<div className="-translate-1/2 absolute top-1/2 left-1/2">
						<div className="flex size-9 items-center justify-center gap-1.5 overflow-hidden rounded-md bg-card/20 px-3 backdrop-blur-lg transition-[width] group-hover:w-auto">
							<span className="hidden font-medium text-sm group-hover:flex">
								Play
							</span>
							<span>
								<IconCaretRight className="size-4 text-primary" />
							</span>
						</div>
					</div>
					<video
						autoPlay
						crossOrigin="anonymous"
						loop
						muted
						playsInline
						slot="media"
						src="/videos/landing-intro-low.webm"
						title="Intro Video"
					>
						<track
							className="hidden"
							kind="captions"
							label="English"
							src="/videos/subtitle.vtt"
							srcLang="en"
						/>
					</video>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-7xl">
				<video
					autoPlay
					crossOrigin="anonymous"
					loop
					playsInline
					slot="media"
					src="/videos/landing-intro.webm"
					title="Intro Video"
				>
					<track
						className="hidden"
						kind="captions"
						label="English"
						src="/videos/subtitle.vtt"
						srcLang="en"
					/>
				</video>
			</DialogContent>
		</Dialog>
	);
};
