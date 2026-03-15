import type { KeyOfDates } from "../types";

export const maxValues: KeyOfDates = {
	day: 31,
	month: 12,
	year: new Date().getFullYear(),
};

export const minValues: KeyOfDates = {
	day: 1,
	month: 1,
	year: 1,
};

export const labels = {
	day: "day",
	month: "month",
	year: "year",
};

export const placeholders = {
	day: "DD",
	month: "MM",
	year: "YYYY",
};

export const maxLengths = {
	day: 2,
	month: 2,
	year: 4,
};
