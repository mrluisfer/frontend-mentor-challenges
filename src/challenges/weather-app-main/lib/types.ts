export type Temperature = "celsius" | "fahrenheit";
export type WindSpeed = "kmh" | "mph";
export type Precipitation = "mm" | "in";

export type Units = {
	temperature: Temperature;
	windSpeed: WindSpeed;
	precipitation: Precipitation;
};

export type GeoResult = {
	id: number;
	name: string;
	country?: string;
	admin1?: string;
	latitude: number;
	longitude: number;
};

export type HourlyEntry = {
	time: string;
	temperature: number;
	code: number;
};

export type DailyEntry = {
	time: string;
	code: number;
	max: number;
	min: number;
};

export type WeatherData = {
	current: {
		time: string;
		temperature: number;
		apparentTemperature: number;
		humidity: number;
		windSpeed: number;
		precipitation: number;
		code: number;
	};
	hourly: HourlyEntry[];
	daily: DailyEntry[];
};

export type Status = "idle" | "loading" | "success" | "error" | "no-results";
