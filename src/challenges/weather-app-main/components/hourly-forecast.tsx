import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { formatHour, formatTemp, formatWeekdayLong } from "../lib/format";
import type { DailyEntry, HourlyEntry } from "../lib/types";
import { weatherFromCode } from "../lib/weather-codes";

import iconDropdown from "../assets/images/icon-dropdown.svg?url";
import iconCheckmark from "../assets/images/icon-checkmark.svg?url";

type HourlyForecastProps = {
	hourly: HourlyEntry[];
	daily: DailyEntry[];
	selectedDay: string;
	// Current hour in the location's timezone (e.g. "2025-08-05T15:00").
	currentTime: string;
	// eslint-disable-next-line no-unused-vars
	onSelectDay: (day: string) => void;
	loading: boolean;
};

export default function HourlyForecast({
	hourly,
	daily,
	selectedDay,
	currentTime,
	onSelectDay,
	loading,
}: HourlyForecastProps) {
	// Show hours of the selected day from the current hour onwards. Comparing at
	// hour granularity ("YYYY-MM-DDTHH") keeps the in-progress hour included even
	// when the current time carries minutes. ISO strings in the same timezone
	// sort lexicographically, so a string compare is enough.
	const currentHour = currentTime.slice(0, 13);
	const hours = hourly.filter(
		(entry) =>
			entry.time.slice(0, 10) === selectedDay &&
			entry.time.slice(0, 13) >= currentHour,
	);
	const selectedLabel = selectedDay ? formatWeekdayLong(selectedDay) : "–";

	return (
		<section className="flex max-h-[44rem] flex-col rounded-2xl bg-[hsl(243,27%,20%)] p-5 lg:absolute lg:inset-0 lg:max-h-none">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-[hsl(0,0%,100%)]">
					Hourly forecast
				</h2>

				<Popover>
					<PopoverTrigger
						disabled={loading || daily.length === 0}
						className={cn(
							"group flex items-center gap-2 rounded-lg bg-[hsl(243,23%,24%)] px-3 py-1.5",
							"text-base font-medium text-[hsl(0,0%,100%)] transition-colors",
							"hover:bg-[hsl(243,23%,30%)] disabled:opacity-60",
							"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(0,0%,100%)]",
						)}
					>
						<span>{selectedLabel}</span>
						<img
							src={iconDropdown}
							alt=""
							aria-hidden
							className="size-3 transition-transform group-data-[popup-open]:rotate-180"
						/>
					</PopoverTrigger>
					<PopoverContent
						align="end"
						sideOffset={8}
						className="w-[214px] gap-0 rounded-xl bg-[hsl(243,27%,20%)] p-2 ring-1 ring-[hsl(243,23%,30%)]"
					>
						{daily.map((day) => {
							const selected = day.time === selectedDay;
							return (
								<button
									key={day.time}
									type="button"
									role="menuitemradio"
									aria-checked={selected}
									onClick={() => onSelectDay(day.time)}
									className={cn(
										"flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-base text-[hsl(0,0%,100%)] transition-colors",
										selected
											? "bg-[hsl(243,23%,24%)]"
											: "hover:bg-[hsl(243,23%,24%)]/60",
									)}
								>
									<span>{formatWeekdayLong(day.time)}</span>
									{selected && (
										<img
											src={iconCheckmark}
											alt=""
											aria-hidden
											className="size-4"
										/>
									)}
								</button>
							);
						})}
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
				{loading || hours.length === 0
					? Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="h-[60px] shrink-0 rounded-xl border border-[hsl(243,23%,30%)] bg-[hsl(243,23%,24%)]"
							/>
						))
					: hours.map((entry) => {
							const weather = weatherFromCode(entry.code);
							return (
								<div
									key={entry.time}
									className="flex shrink-0 items-center justify-between rounded-xl border border-[hsl(243,23%,30%)] bg-[hsl(243,23%,24%)] py-2.5 pr-4 pl-3"
								>
									<div className="flex items-center gap-2">
										<img
											src={weather.icon}
											alt={weather.label}
											className="size-10"
										/>
										<span className="text-xl text-[hsl(0,0%,100%)]">
											{formatHour(entry.time)}
										</span>
									</div>
									<span className="text-base text-[hsl(0,0%,100%)]">
										{formatTemp(entry.temperature)}
									</span>
								</div>
							);
						})}
			</div>
		</section>
	);
}
