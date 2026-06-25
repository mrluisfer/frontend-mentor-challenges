import { useCallback, useEffect, useRef, useState } from "react";

import "./weather-app.css";

import WeatherHeader from "./components/header";
import SearchBar from "./components/search-bar";
import CurrentWeather from "./components/current-weather";
import WeatherMetrics from "./components/weather-metrics";
import DailyForecast from "./components/daily-forecast";
import HourlyForecast from "./components/hourly-forecast";
import ErrorState from "./components/error-state";

import { fetchWeather, reverseGeocode } from "./lib/api";
import { locationLabel } from "./lib/format";
import type { GeoResult, Status, Units, WeatherData } from "./lib/types";

const DEFAULT_UNITS: Units = {
	temperature: "celsius",
	windSpeed: "kmh",
	precipitation: "mm",
};

const DEFAULT_LOCATION: GeoResult = {
	id: 2950159,
	name: "Berlin",
	country: "Germany",
	latitude: 52.52,
	longitude: 13.41,
};

export default function WeatherApp() {
	const [units, setUnits] = useState<Units>(DEFAULT_UNITS);
	const [location, setLocation] = useState<GeoResult | null>(null);
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [status, setStatus] = useState<Status>("loading");
	const [selectedDay, setSelectedDay] = useState("");

	// Always read the latest location/units inside the loader without making it
	// a dependency that would retrigger fetches it shouldn't.
	const locationRef = useRef(location);
	const unitsRef = useRef(units);
	locationRef.current = location;
	unitsRef.current = units;

	const load = useCallback(async () => {
		const current = locationRef.current;
		if (!current) return;
		setStatus("loading");
		try {
			const data = await fetchWeather(current, unitsRef.current);
			setWeather(data);
			setSelectedDay(data.daily[0]?.time ?? "");
			setStatus("success");
		} catch {
			setStatus("error");
		}
	}, []);

	// Resolves the user's location from the browser's geolocation, or null if it
	// is unavailable, denied, or times out.
	const detectLocation = useCallback(() => {
		return new Promise<GeoResult | null>((resolve) => {
			if (!navigator.geolocation) {
				resolve(null);
				return;
			}
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					try {
						resolve(await reverseGeocode(position.coords.latitude, position.coords.longitude));
					} catch {
						resolve(null);
					}
				},
				() => resolve(null),
				{ timeout: 10000, maximumAge: 600000 }
			);
		});
	}, []);

	// On mount, try geolocation and fall back to a default location. Also watch
	// the permission state so that if the user denies first and grants access
	// later, we pick up their location automatically without a page reload.
	useEffect(() => {
		let cancelled = false;

		detectLocation().then((detected) => {
			if (!cancelled) setLocation(detected ?? DEFAULT_LOCATION);
		});

		let permission: PermissionStatus | undefined;
		const onPermissionChange = () => {
			if (permission?.state !== "granted") return;
			detectLocation().then((detected) => {
				if (!cancelled && detected) setLocation(detected);
			});
		};

		navigator.permissions
			?.query({ name: "geolocation" as PermissionName })
			.then((status) => {
				if (cancelled) return;
				permission = status;
				status.addEventListener("change", onPermissionChange);
			})
			.catch(() => {});

		return () => {
			cancelled = true;
			permission?.removeEventListener("change", onPermissionChange);
		};
	}, [detectLocation]);

	// Reload whenever the location or units change.
	useEffect(() => {
		if (location) load();
	}, [location, units, load]);

	const handleSelectLocation = (next: GeoResult) => setLocation(next);

	const loading = status === "loading";
	const label = location ? locationLabel(location.name, location.country) : "";

	return (
		<div className="weather-app min-h-screen bg-[hsl(243,96%,9%)] px-4 py-5 text-[hsl(0,0%,100%)] md:px-8 md:py-8">
			<div className="mx-auto max-w-[1216px]">
				<WeatherHeader units={units} onUnitsChange={setUnits} />

				<main>
					{status === "error" ? (
						<ErrorState onRetry={load} />
					) : (
						<>
							<h1 className="mx-auto mt-12 max-w-2xl text-center text-5xl leading-tight font-bold md:mt-16">
								How&apos;s the sky looking today?
							</h1>

							<div className="mt-12">
								<SearchBar onSelect={handleSelectLocation} />
							</div>

							<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_384px]">
								<div className="flex flex-col gap-8">
									<CurrentWeather
										location={label}
										current={
											weather?.current ?? {
												time: "",
												temperature: 0,
												apparentTemperature: 0,
												humidity: 0,
												windSpeed: 0,
												precipitation: 0,
												code: 0,
											}
										}
										loading={loading || !weather}
									/>
									<WeatherMetrics
										current={weather?.current}
										units={units}
										loading={loading || !weather}
									/>
									<DailyForecast daily={weather?.daily ?? []} loading={loading || !weather} />
								</div>

								{/* On desktop this cell's height is driven by the left
							    column; the panel fills it absolutely and scrolls. */}
								<div className="lg:relative">
									<HourlyForecast
										hourly={weather?.hourly ?? []}
										daily={weather?.daily ?? []}
										selectedDay={selectedDay}
										currentTime={weather?.current.time ?? ""}
										onSelectDay={setSelectedDay}
										loading={loading || !weather}
									/>
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
