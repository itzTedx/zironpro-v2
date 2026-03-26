import { Button } from "@/components/ui/button";
import { Map, MapControls, MapPopup } from "@/components/ui/map";

export const LocationMap = () => {
	return (
		<div
			className="h-[400px] overflow-hidden bg-gray-1200 p-0"
			data-scroll-locked
		>
			<Map
				center={[54.391418, 24.447265]}
				projection={{ type: "globe" }}
				zoom={11}
			>
				<MapPopup
					className="w-62"
					closeOnClick={false}
					focusAfterOpen={false}
					latitude={40.7128}
					longitude={-74.006}
				>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">New York City</h3>
						<p className="text-muted-foreground text-sm">
							The city that never sleeps. Population: 8.3 million
						</p>
						<Button className="w-full" size="sm" variant="outline">
							Close
						</Button>
					</div>
				</MapPopup>

				<MapControls showFullscreen />
			</Map>
		</div>
	);
};
