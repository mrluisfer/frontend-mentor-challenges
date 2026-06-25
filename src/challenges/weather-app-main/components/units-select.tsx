import { useState } from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { Precipitation, Temperature, Units, WindSpeed } from "../lib/types";

import iconCheckmark from "../assets/images/icon-checkmark.svg?url";
import iconDropdown from "../assets/images/icon-dropdown.svg?url";
import iconUnits from "../assets/images/icon-units.svg?url";

const METRIC: Units = {
	temperature: "celsius",
	windSpeed: "kmh",
	precipitation: "mm",
};

const IMPERIAL: Units = {
	temperature: "fahrenheit",
	windSpeed: "mph",
	precipitation: "in",
};

type Group<T extends string> = {
	label: string;
	options: { label: string; value: T }[];
};

const temperatureGroup: Group<Temperature> = {
	label: "Temperature",
	options: [
		{ label: "Celsius (°C)", value: "celsius" },
		{ label: "Fahrenheit (°F)", value: "fahrenheit" },
	],
};

const windSpeedGroup: Group<WindSpeed> = {
	label: "Wind Speed",
	options: [
		{ label: "km/h", value: "kmh" },
		{ label: "mph", value: "mph" },
	],
};

const precipitationGroup: Group<Precipitation> = {
	label: "Precipitation",
	options: [
		{ label: "Millimeters (mm)", value: "mm" },
		{ label: "Inches (in)", value: "in" },
	],
};

type OptionRowProps = {
	label: string;
	selected: boolean;
	onSelect: () => void;
};

function OptionRow({ label, selected, onSelect }: OptionRowProps) {
	return (
		<button
			type="button"
			role="menuitemradio"
			aria-checked={selected}
			onClick={onSelect}
			className={cn(
				"flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-base text-[hsl(0,0%,100%)] transition-colors",
				selected ? "bg-[hsl(243,23%,24%)]" : "hover:bg-[hsl(243,23%,24%)]/60"
			)}
		>
			<span>{label}</span>
			{selected && <img src={iconCheckmark} alt="" aria-hidden className="size-4" />}
		</button>
	);
}

type UnitsSelectProps = {
	value?: Units;
	// eslint-disable-next-line no-unused-vars
	onChange?: (units: Units) => void;
};

export default function UnitsSelect({ value, onChange }: UnitsSelectProps) {
	const [internal, setInternal] = useState<Units>(METRIC);
	const units = value ?? internal;

	const update = (next: Units) => {
		setInternal(next);
		onChange?.(next);
	};

	const isImperial =
		units.temperature === "fahrenheit" && units.windSpeed === "mph" && units.precipitation === "in";

	const toggleSystem = () => update(isImperial ? METRIC : IMPERIAL);

	return (
		<Popover>
			<PopoverTrigger
				className={cn(
					"group flex items-center gap-2 rounded-lg bg-[hsl(243,27%,20%)] px-3.5 py-2.5",
					"text-base font-medium text-[hsl(0,0%,100%)] transition-colors",
					"hover:bg-[hsl(243,23%,30%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(0,0%,100%)]"
				)}
			>
				<img src={iconUnits} alt="" aria-hidden className="size-4" />
				<span>Units</span>
				<img
					src={iconDropdown}
					alt=""
					aria-hidden
					className="size-3 transition-transform group-data-[popup-open]:rotate-180"
				/>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				sideOffset={10}
				role="menu"
				aria-label="Units settings"
				className="w-[214px] gap-0 rounded-xl bg-[hsl(243,27%,20%)] p-2 ring-1 ring-[hsl(243,23%,30%)]"
			>
				<button
					type="button"
					role="menuitem"
					onClick={toggleSystem}
					className="mb-1 w-full rounded-lg px-2 py-2.5 text-left text-base text-[hsl(0,0%,100%)] transition-colors hover:bg-[hsl(243,23%,24%)]"
				>
					Switch to {isImperial ? "Metric" : "Imperial"}
				</button>

				<UnitsGroup
					group={temperatureGroup}
					selected={units.temperature}
					onSelect={(temperature) => update({ ...units, temperature })}
				/>
				<Divider />
				<UnitsGroup
					group={windSpeedGroup}
					selected={units.windSpeed}
					onSelect={(windSpeed) => update({ ...units, windSpeed })}
				/>
				<Divider />
				<UnitsGroup
					group={precipitationGroup}
					selected={units.precipitation}
					onSelect={(precipitation) => update({ ...units, precipitation })}
				/>
			</PopoverContent>
		</Popover>
	);
}

function Divider() {
	return <div className="my-1 h-px bg-[hsl(243,23%,30%)]" />;
}

type UnitsGroupProps<T extends string> = {
	group: Group<T>;
	selected: T;
	// eslint-disable-next-line no-unused-vars
	onSelect: (value: T) => void;
};

function UnitsGroup<T extends string>({ group, selected, onSelect }: UnitsGroupProps<T>) {
	return (
		<div role="group" aria-label={group.label}>
			<p className="px-2 pt-1 pb-1.5 text-sm text-[hsl(240,6%,70%)]">{group.label}</p>
			{group.options.map((option) => (
				<OptionRow
					key={option.value}
					label={option.label}
					selected={option.value === selected}
					onSelect={() => onSelect(option.value)}
				/>
			))}
		</div>
	);
}
