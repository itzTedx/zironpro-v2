import { IconClock } from "@/assets/icons/clock";

export const HeroFeatures = () => {
	return (
		<ul className="dashed dashed-t flex flex-col items-center text-lg md:flex-row">
			<li className="dashed dashed-b md:dashed-b-0 flex w-full items-center justify-center gap-2 p-6">
				<div className="flex size-12 items-center justify-center rounded-lg bg-muted/20">
					<IconClock className="size-7 text-card" />
				</div>
				<p>48 Hours Delivery</p>
			</li>
			<li className="dashed dashed-b md:dashed-b-0 md:dashed-x flex w-full items-center justify-center gap-2 p-6">
				<div className="flex size-12 items-center justify-center rounded-lg bg-muted/20">
					<IconClock className="size-7 text-card" />
				</div>
				<p>One Partner for Digital & Print</p>
			</li>
			<li className="flex w-full items-center justify-center gap-2 p-6">
				<div className="flex size-12 items-center justify-center rounded-lg bg-muted/20">
					<IconClock className="size-7 text-card" />
				</div>
				<p>Scalable Creative Support</p>
			</li>
		</ul>
	);
};
