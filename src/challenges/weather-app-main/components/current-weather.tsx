import { formatFullDate, formatTemp } from "../lib/format";
import type { WeatherData } from "../lib/types";
import { weatherFromCode } from "../lib/weather-codes";

import bgLarge from "../assets/images/bg-today-large.svg?url";

type CurrentWeatherProps = {
	location: string;
	current: WeatherData["current"];
	loading: boolean;
};

export default function CurrentWeather({ location, current, loading }: CurrentWeatherProps) {
	if (loading) {
		return (
			<div
				role="status"
				aria-live="polite"
				className="flex min-h-[286px] flex-col items-center justify-center gap-3 rounded-2xl bg-[hsl(243,27%,20%)]"
			>
				<div className="flex gap-1.5" aria-hidden>
					<span className="size-2 animate-pulse rounded-full bg-[hsl(240,6%,70%)] [animation-delay:0ms]" />
					<span className="size-2 animate-pulse rounded-full bg-[hsl(240,6%,70%)] [animation-delay:150ms]" />
					<span className="size-2 animate-pulse rounded-full bg-[hsl(240,6%,70%)] [animation-delay:300ms]" />
				</div>
				<p className="text-base text-[hsl(0,0%,100%)]">Loading...</p>
			</div>
		);
	}

	const weather = weatherFromCode(current.code);

	return (
		<div
			className="flex min-h-[286px] flex-col items-center justify-center gap-4 rounded-2xl bg-[hsl(233,67%,56%)] bg-cover bg-center px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
			style={{ backgroundImage: `url(${bgLarge})` }}
		>
			<div>
				<h2 className="text-3xl font-bold text-[hsl(0,0%,100%)]">{location}</h2>
				<p className="mt-1 text-base font-medium text-[hsl(0,0%,100%)]/80">
					{formatFullDate(current.time)}
				</p>
			</div>
			<div className="flex items-center gap-3">
				<img src={weather.icon} alt={weather.label} className="size-24" />
				<span className="text-7xl font-semibold text-[hsl(0,0%,100%)] italic">
					{formatTemp(current.temperature)}
				</span>
			</div>
		</div>
	);
}
