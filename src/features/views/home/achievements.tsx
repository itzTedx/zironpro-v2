import { Header } from "@/components/shared/header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Dock, DockIcon } from "./components/dock";
import { ACHIEVEMENTS, CLIENTS } from "./data/constants";

export const Achievements = () => {
	return (
		<section className="dashed dashed-y">
			<Header
				description="Curious about what we've accomplished? Let our track record speak for
					itself."
				title="Our Achievements"
			/>
			{/* <header className="dashed dashed-t-0 mx-auto max-w-7xl p-6 text-center md:p-14">
				<h2 className="font-display font-semibold text-4xl text-primary tracking-tight md:text-6xl">
					Our Achievements
				</h2>
				<p className="text-">
					Curious about what we've accomplished? Let our track record speak for
					itself.
				</p>
			</header> */}
			<div className="dashed mx-auto grid max-w-7xl grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:p-14 lg:grid-cols-3">
				{ACHIEVEMENTS.map((ach) => {
					const AchievementCard = ach.card;
					return (
						<Card
							className="squircle rounded-[calc(var(--radius-5xl)+--spacing(1))] transition-transform hover:-translate-y-3"
							key={`card-${ach.id}`}
						>
							<CardContent>
								<AchievementCard />
								<CardHeader>
									<CardTitle>{ach.title}</CardTitle>
									<CardDescription>{ach.description}</CardDescription>
								</CardHeader>
							</CardContent>
						</Card>
					);
				})}
			</div>
			<div className="dashed dashed-t-0 mx-auto flex max-w-7xl flex-col items-center gap-4 p-6 md:p-14">
				<Dock className="w-fit">
					{CLIENTS.map((item) => (
						<DockIcon key={item.name} name={item.name} src={item.src} />
					))}
				</Dock>
				<h3 className="text-center text-accent-foreground text-xl">
					Trusted by clients to deliver their{" "}
					<span className="font-medium">
						vision <br /> from kickoff to launch
					</span>
				</h3>
			</div>
			<div className="dashed dashed-t-0 mx-auto max-w-7xl p-6 md:p-9" />
		</section>
	);
};
