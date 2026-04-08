import { Header } from "@/components/shared/header";
import { Frame } from "@/components/ui/frame";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { IconCheck } from "@/assets/icons/check";
import { IconX } from "@/assets/icons/x";
import { Logo } from "@/assets/logo";

import { cn } from "@/lib/utils";

const features = [
	{
		feature: "Cost",
		us: "$ (Fixed monthly pricing)",
		team: "$$$$",
		other: "$$$",
		teamLevel: "error",
		otherLevel: "warn",
	},
	{
		feature: "Skill Coverage",
		us: "Design, Developer, Marketing & Print",
		team: "Limited to hires",
		other: "Depends on agency",
		teamLevel: "error",
		otherLevel: "error",
	},
	{
		feature: "Senior-Level Expertise",
		us: "Guaranteed",
		team: "Hopefully",
		other: "Maybe",
		teamLevel: "warn",
		otherLevel: "warn",
	},
	{
		feature: "Turnaround Time",
		us: "48 hours for most requests",
		team: "Can take  weeks due to other tasks",
		other: "Weeks, depending on workload",
		teamLevel: "error",
		otherLevel: "error",
	},
	{
		feature: "Start Time",
		us: "Same day",
		team: "Weeks to onboard and train",
		other: "Days to set up agreements",
		teamLevel: "error",
		otherLevel: "error",
	},
	{
		feature: "Client Portal",
		us: "Yes, track progress easily",
		team: "Internal systems may vary, often less accessible",
		other: "No consistent system",
		teamLevel: "warn",
		otherLevel: "error",
	},
	{
		feature: "Scalability",
		us: "Scale up or down with ease.",
		team: "Possible",
		other: "Limited by freelancer's capacity",
		teamLevel: "success",
		otherLevel: "error",
	},
	{
		feature: "Flexibility",
		us: "Pause or adjust your subscription anytime",
		team: "Locked into salaries and benefits",
		other: "Contract-locked",
		teamLevel: "error",
		otherLevel: "error",
	},
];

export const WhyUs = () => {
	return (
		<section className="dashed dashed-b-0 mx-auto max-w-7xl p-px">
			<Header
				description="Check out what Ziron pro offers vs employees and other agencies. It’s quite a lot!"
				title="Why choose us"
			/>
			{/* <header className="dashed dashed-b space-y-1.5 p-9 text-center md:space-y-3 md:p-14">
				<h2 className="font-display font-semibold text-3xl text-primary tracking-tight md:text-6xl">
					Why Choose Ziron pro
				</h2>
				<p className="mx-auto max-w-md text-balance">
					Check out what Ziron pro offers vs employees and other agencies.
					It’s quite a lot!
				</p>
			</header> */}
			<div className="mx-auto max-w-6xl px-4 py-9 md:px-0 md:py-14">
				<div className="sr-only mb-3 grid grid-cols-4 gap-6 md:not-sr-only">
					<div />
					<div>
						<Logo className="h-5 w-auto" />
					</div>
					<p className="text-muted-foreground text-xs sm:text-base">
						In-House Team
					</p>
					<p className="text-muted-foreground text-xs sm:text-base">
						Other Agencies
					</p>
				</div>

				<Frame className="mt-3">
					<Table>
						<TableHeader className="md:sr-only">
							<TableRow className="pb-6">
								<TableHead className="w-[290px] opacity-0">Feature</TableHead>
								<TableHead className="flex w-[180px] items-center justify-center">
									<Logo className="h-4 w-auto" />
								</TableHead>
								<TableHead className="w-[180px]">In-House Team</TableHead>
								<TableHead className="w-[180px]">Other Agencies</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{features.map((feature) => (
								<TableRow className="border-0" key={feature.feature}>
									<TableCell className="whitespace-nowrap font-medium text-xs md:text-lg">
										{feature.feature}
									</TableCell>
									<TableCell className="w-[290px] bg-card leading-snug">
										<div className="flex items-center gap-2">
											<IconCheck className="size-4 shrink-0 text-success" />
											{feature.us}
										</div>
									</TableCell>
									<TableCell className="w-[290px] bg-card leading-snug">
										<div className="flex items-center gap-2 text-muted-foreground">
											{feature.teamLevel === "success" ? (
												<IconCheck className="size-4 shrink-0 text-success" />
											) : (
												<IconX
													className={cn(
														"size-4 shrink-0",
														feature.teamLevel === "warn"
															? "text-warning"
															: "text-destructive"
													)}
												/>
											)}
											{feature.team}
										</div>
									</TableCell>
									<TableCell className="w-[290px] bg-card leading-snug">
										<div className="flex items-center gap-2 text-muted-foreground">
											{feature.otherLevel === "success" ? (
												<IconCheck className="size-4 shrink-0 text-success" />
											) : (
												<IconX
													className={cn(
														"size-4 shrink-0",
														feature.otherLevel === "warn"
															? "text-warning"
															: "text-destructive"
													)}
												/>
											)}
											{feature.other}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Frame>
			</div>
		</section>
	);
};
