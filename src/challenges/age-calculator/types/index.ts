export type TDate = {
	day: string;
	month: string;
	year: string;
};

export type TDatePlurals = {
	years?: number;
	months?: number;
	days?: number;
};

export type TDateField = keyof TDate;

export type TDateErrors = Partial<Record<TDateField, string>>;

export type KeyOfDates = Record<TDateField, number>;
