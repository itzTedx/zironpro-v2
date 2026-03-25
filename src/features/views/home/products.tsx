import { PRODUCTS } from "@/components/layout/data/constants";
import { Header } from "@/components/shared/header";
import { Badge } from "@/components/ui/badge";

export const Products = () => {
	return (
		<section className="dashed dashed-t overflow-hidden">
			<div className="dashed dashed-x container max-w-7xl flex-col items-center justify-center">
				<Header
					description="Get access to our products designed to connect, manage + scale your business from one ecosystem."
					isBorderless
					title="Products"
				/>
				{/* <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3">
                    <h2 className="font-bold text-6xl text-primary">
                        Smart tools built to help your business grow faster.
                    </h2>
                    <p className="mt-3 text-balance text-xl">
                        Get access to our products designed to connect, manage + scale
                        your business from one ecosystem.
                    </p>
                </div> */}

				<div className="flex items-end justify-center gap-4">
					{PRODUCTS.map((product) => {
						const Icon = product.icon!;
						return (
							<div
								className="relative flex translate-y-10 flex-col items-center rounded-t-xl px-9 pt-6 pb-12 text-card transition-transform hover:translate-y-0 data-[product=crm]:bg-yellow-300/80 data-[product=tap]:bg-blue-500 data-[product=crm]:text-foreground md:min-w-3xs"
								data-product={product.id}
								key={product.id}
							>
								{product.id === "crm" && (
									<Badge
										className="absolute -top-2 -right-3"
										size="sm"
										variant="secondary"
									>
										{product.badge}
									</Badge>
								)}
								<Icon />
								<h3 className="font-bold text-2xl">{product.title}</h3>

								<p className="text-sm">{product.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
