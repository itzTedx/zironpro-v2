"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { LocateFixed } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Map,
	MapControls,
	MapMarker,
	MapRoute,
	MarkerContent,
	MarkerLabel,
	MarkerPopup,
	MarkerTooltip,
	useMap,
} from "@/components/ui/map";

const COMPANY_LOCATION = {
	longitude: 54.391418,
	latitude: 24.447265,
};

const INITIAL_VIEWPORT = {
	zoom: 14,
	bearing: 0,
	pitch: 0,
};

interface OsrmRouteData {
	coordinates: [number, number][];
}

function ResetCenterButton() {
	const { map } = useMap();
	const [canReset, setCanReset] = useState(false);

	const isViewportChanged = useCallback(() => {
		if (!map) return false;
		const center = map.getCenter();
		const centerChanged =
			Math.abs(center.lng - COMPANY_LOCATION.longitude) > 0.0001 ||
			Math.abs(center.lat - COMPANY_LOCATION.latitude) > 0.0001;
		const zoomChanged = Math.abs(map.getZoom() - INITIAL_VIEWPORT.zoom) > 0.01;
		const bearingChanged = Math.abs(map.getBearing()) > 0.01;
		const pitchChanged = Math.abs(map.getPitch()) > 0.01;

		return centerChanged || zoomChanged || bearingChanged || pitchChanged;
	}, [map]);

	useEffect(() => {
		if (!map) return;

		const syncResetState = () => {
			setCanReset(isViewportChanged());
		};

		syncResetState();
		map.on("moveend", syncResetState);
		map.on("rotateend", syncResetState);
		map.on("pitchend", syncResetState);

		return () => {
			map.off("moveend", syncResetState);
			map.off("rotateend", syncResetState);
			map.off("pitchend", syncResetState);
		};
	}, [map, isViewportChanged]);

	const handleReset = useCallback(() => {
		if (!map) return;
		map.easeTo({
			center: [COMPANY_LOCATION.longitude, COMPANY_LOCATION.latitude],
			zoom: INITIAL_VIEWPORT.zoom,
			bearing: INITIAL_VIEWPORT.bearing,
			pitch: INITIAL_VIEWPORT.pitch,
			duration: 600,
		});
	}, [map]);

	return (
		<div className="absolute right-12 bottom-10 z-10">
			<Button
				className="bg-card text-card-foreground/80 hover:bg-gray-300"
				disabled={!canReset}
				onClick={handleReset}
				size="icon"
				type="button"
				variant="secondary"
			>
				<LocateFixed />
				<span className="sr-only">Reset map center</span>
			</Button>
		</div>
	);
}

export const LocationMap = () => {
	const popupDescription = useMemo(
		() =>
			"Visit our office in Abu Dhabi. We build and scale digital products for modern brands.",
		[]
	);
	const [directionCoordinates, setDirectionCoordinates] = useState<
		[number, number][]
	>([]);

	const handleLocate = useCallback(
		async (coords: { longitude: number; latitude: number }) => {
			try {
				const response = await fetch(
					`https://router.project-osrm.org/route/v1/driving/${coords.longitude},${coords.latitude};${COMPANY_LOCATION.longitude},${COMPANY_LOCATION.latitude}?overview=full&geometries=geojson`
				);

				if (!response.ok) {
					setDirectionCoordinates([]);
					return;
				}

				const data = (await response.json()) as {
					routes?: Array<{ geometry?: OsrmRouteData }>;
				};
				const routeCoordinates = data?.routes?.[0]?.geometry?.coordinates ?? [];

				setDirectionCoordinates(routeCoordinates);
			} catch {
				setDirectionCoordinates([]);
			}
		},
		[]
	);

	return (
		<div
			className="squircle container h-[400px] max-w-7xl overflow-hidden rounded-2xl bg-gray-1200 p-0"
			data-scroll-locked
		>
			<Map
				center={[COMPANY_LOCATION.longitude, COMPANY_LOCATION.latitude]}
				cooperativeGestures
				projection={{ type: "globe" }}
				zoom={INITIAL_VIEWPORT.zoom}
			>
				<MapRoute
					color="#3b82f6"
					coordinates={directionCoordinates}
					id="contact-user-route"
					interactive={false}
					opacity={0.95}
					width={5}
				/>

				<MapMarker
					latitude={COMPANY_LOCATION.latitude}
					longitude={COMPANY_LOCATION.longitude}
				>
					<MarkerContent>
						<div className="relative size-4 rounded-full border-2 border-white bg-primary shadow-lg" />
						<MarkerLabel className="text-card">Ziron Pro</MarkerLabel>
					</MarkerContent>
					<MarkerPopup
						className="w-62"
						closeOnClick={false}
						focusAfterOpen={false}
					>
						<div className="space-y-2">
							<h3 className="font-semibold text-foreground">Ziron Pro</h3>
							<p className="text-muted-foreground text-sm">
								{popupDescription}
							</p>
						</div>
					</MarkerPopup>
					<MarkerTooltip>Our office location</MarkerTooltip>
				</MapMarker>

				<ResetCenterButton />

				<MapControls onLocate={handleLocate} showFullscreen showLocate />
			</Map>
		</div>
	);
};
