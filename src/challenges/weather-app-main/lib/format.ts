import type { Units } from "./types";

// Date-only strings ("2026-06-25") are parsed as UTC midnight by the Date
// constructor, which shifts the weekday in negative-offset timezones. Append a
// time component so they are parsed in the local timezone instead.
function parseLocal(iso: string): Date {
	return new Date(iso.length === 10 ? `${iso}T00:00` : iso);
}

export const windUnitLabel: Record<Units["windSpeed"], string> = {
	kmh: "km/h",
	mph: "mph",
};

export const precipitationUnitLabel: Record<Units["precipitation"], string> = {
	mm: "mm",
	in: "in",
};

export function formatTemp(value: number): string {
	return `${Math.round(value)}°`;
}

export function formatFullDate(iso: string): string {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(parseLocal(iso));
}

export function formatHour(iso: string): string {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		hour12: true,
	}).format(parseLocal(iso));
}

export function formatWeekdayLong(iso: string): string {
	return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
		parseLocal(iso),
	);
}

export function formatWeekdayShort(iso: string): string {
	return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
		parseLocal(iso),
	);
}

export function locationLabel(name: string, country?: string): string {
	return country ? `${name}, ${country}` : name;
}
