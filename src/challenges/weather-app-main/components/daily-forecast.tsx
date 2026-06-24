import { formatTemp, formatWeekdayShort } from "../lib/format";
import type { DailyEntry } from "../lib/types";
import { weatherFromCode } from "../lib/weather-codes";

type DailyForecastProps = {
	daily: DailyEntry[];
	loading: boolean;
};

export default function DailyForecast({ daily, loading }: DailyForecastProps) {
	return (
		<section>
			<h2 className="mb-5 text-xl font-semibold text-[hsl(0,0%,100%)]">
				Daily forecast
			</h2>
			<div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
				{loading || daily.length === 0
					? Array.from({ length: 7 }).map((_, i) => (
							<div
								key={i}
								className="h-[170px] rounded-xl border border-[hsl(243,23%,30%)] bg-[hsl(243,27%,20%)]"
							/>
						))
					: daily.map((day) => {
							const weather = weatherFromCode(day.code);
							return (
								<div
									key={day.time}
									className="flex flex-col items-center gap-4 rounded-xl border border-[hsl(243,23%,30%)] bg-[hsl(243,27%,20%)] px-2.5 py-4"
								>
									<p className="text-lg text-[hsl(0,0%,100%)]">
										{formatWeekdayShort(day.time)}
									</p>
									<img
										src={weather.icon}
										alt={weather.label}
										className="size-14"
									/>
									<div className="flex w-full justify-between text-base text-[hsl(0,0%,100%)]">
										<span>{formatTemp(day.max)}</span>
										<span className="text-[hsl(240,6%,70%)]">
											{formatTemp(day.min)}
										</span>
									</div>
								</div>
							);
						})}
			</div>
		</section>
	);
}
