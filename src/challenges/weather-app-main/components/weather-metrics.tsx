import { formatTemp, precipitationUnitLabel, windUnitLabel } from "../lib/format";
import type { Units, WeatherData } from "../lib/types";

type WeatherMetricsProps = {
	current?: WeatherData["current"];
	units: Units;
	loading: boolean;
};

export default function WeatherMetrics({ current, units, loading }: WeatherMetricsProps) {
	const metrics = [
		{
			label: "Feels Like",
			value: current && !loading ? formatTemp(current.apparentTemperature) : "–",
		},
		{
			label: "Humidity",
			value: current && !loading ? `${Math.round(current.humidity)}%` : "–",
		},
		{
			label: "Wind",
			value:
				current && !loading
					? `${Math.round(current.windSpeed)} ${windUnitLabel[units.windSpeed]}`
					: "–",
		},
		{
			label: "Precipitation",
			value:
				current && !loading
					? `${current.precipitation} ${precipitationUnitLabel[units.precipitation]}`
					: "–",
		},
	];

	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
			{metrics.map((metric) => (
				<div
					key={metric.label}
					className="rounded-xl border border-[hsl(243,23%,30%)] bg-[hsl(243,27%,20%)] p-5"
				>
					<p className="text-base text-[hsl(240,6%,70%)]">{metric.label}</p>
					<p className="mt-6 text-3xl font-light text-[hsl(0,0%,100%)]">{metric.value}</p>
				</div>
			))}
		</div>
	);
}
