import type { GeoResult, Units, WeatherData } from "./types";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

type GeoResponse = {
	results?: {
		id: number;
		name: string;
		country?: string;
		admin1?: string;
		latitude: number;
		longitude: number;
	}[];
};

export async function searchLocations(query: string): Promise<GeoResult[]> {
	const params = new URLSearchParams({
		name: query,
		count: "5",
		language: "en",
		format: "json",
	});
	const res = await fetch(`${GEO_URL}?${params}`);
	if (!res.ok) throw new Error("Geocoding request failed");
	const data: GeoResponse = await res.json();
	return data.results ?? [];
}

const REVERSE_URL =
	"https://api.bigdatacloud.net/data/reverse-geocode-client";

type ReverseResponse = {
	city?: string;
	locality?: string;
	principalSubdivision?: string;
	countryName?: string;
};

// Resolves a latitude/longitude pair into a place name + country. Used with the
// browser Geolocation API, which only gives coordinates. BigDataCloud's
// client endpoint is free and requires no API key.
export async function reverseGeocode(
	latitude: number,
	longitude: number,
): Promise<GeoResult> {
	const params = new URLSearchParams({
		latitude: String(latitude),
		longitude: String(longitude),
		localityLanguage: "en",
	});
	const res = await fetch(`${REVERSE_URL}?${params}`);
	if (!res.ok) throw new Error("Reverse geocoding failed");
	const data: ReverseResponse = await res.json();
	const name =
		data.city || data.locality || data.principalSubdivision || "Your location";
	return {
		id: 0,
		name,
		country: data.countryName,
		latitude,
		longitude,
	};
}

const precipitationParam: Record<Units["precipitation"], string> = {
	mm: "mm",
	in: "inch",
};

type ForecastResponse = {
	current: {
		time: string;
		temperature_2m: number;
		apparent_temperature: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		precipitation: number;
		weather_code: number;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
		weather_code: number[];
	};
	daily: {
		time: string[];
		weather_code: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
};

export async function fetchWeather(
	location: Pick<GeoResult, "latitude" | "longitude">,
	units: Units,
): Promise<WeatherData> {
	const params = new URLSearchParams({
		latitude: String(location.latitude),
		longitude: String(location.longitude),
		current:
			"temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation",
		hourly: "temperature_2m,weather_code",
		daily: "weather_code,temperature_2m_max,temperature_2m_min",
		timezone: "auto",
		forecast_days: "7",
		temperature_unit: units.temperature,
		wind_speed_unit: units.windSpeed,
		precipitation_unit: precipitationParam[units.precipitation],
	});

	const res = await fetch(`${FORECAST_URL}?${params}`);
	if (!res.ok) throw new Error("Forecast request failed");
	const data: ForecastResponse = await res.json();

	return {
		current: {
			time: data.current.time,
			temperature: data.current.temperature_2m,
			apparentTemperature: data.current.apparent_temperature,
			humidity: data.current.relative_humidity_2m,
			windSpeed: data.current.wind_speed_10m,
			precipitation: data.current.precipitation,
			code: data.current.weather_code,
		},
		hourly: data.hourly.time.map((time, i) => ({
			time,
			temperature: data.hourly.temperature_2m[i],
			code: data.hourly.weather_code[i],
		})),
		daily: data.daily.time.map((time, i) => ({
			time,
			code: data.daily.weather_code[i],
			max: data.daily.temperature_2m_max[i],
			min: data.daily.temperature_2m_min[i],
		})),
	};
}
