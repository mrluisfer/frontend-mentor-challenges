import AgeInputs from "./lib/AgeInputs/index";
import Separator from "./lib/Separator/index";
import AgePreview from "./lib/AgePreview/AgePreview/index";
import { type FormEvent, useState } from "react";
import type { TDate, TDateErrors, TDateField, TDatePlurals } from "./types/index.ts";
import { maxValues, minValues } from "./contants/index";
import clsx from "clsx";

const INITIAL_DATE: TDate = {
	day: "",
	month: "",
	year: "",
};

const EMPTY_AGE: TDatePlurals = {
	years: undefined,
	months: undefined,
	days: undefined,
};

function validateDate(date: TDate) {
	const errors: TDateErrors = {};
	const currentDate = new Date();
	const day = Number(date.day);
	const month = Number(date.month);
	const year = Number(date.year);

	if (!date.day) errors.day = "This field is required";
	if (!date.month) errors.month = "This field is required";
	if (!date.year) errors.year = "This field is required";

	if (Object.keys(errors).length > 0) {
		return errors;
	}

	if (day < minValues.day || day > maxValues.day) {
		errors.day = "Must be a valid day";
	}

	if (month < minValues.month || month > maxValues.month) {
		errors.month = "Must be a valid month";
	}

	if (year < minValues.year || year > currentDate.getFullYear()) {
		errors.year = "Must be in the past";
	}

	if (Object.keys(errors).length > 0) {
		return errors;
	}

	const candidateDate = new Date(year, month - 1, day);
	const isRealDate =
		candidateDate.getFullYear() === year &&
		candidateDate.getMonth() === month - 1 &&
		candidateDate.getDate() === day;

	if (!isRealDate) {
		errors.day = "Must be a valid date";
		return errors;
	}

	if (candidateDate > currentDate) {
		errors.year = "Must be in the past";
	}

	return errors;
}

function calculateAge(date: TDate): TDatePlurals {
	const currentDate = new Date();
	const birthDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));

	let years = currentDate.getFullYear() - birthDate.getFullYear();
	let months = currentDate.getMonth() - birthDate.getMonth();
	let days = currentDate.getDate() - birthDate.getDate();

	if (days < 0) {
		const previousMonthDays = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0
		).getDate();
		days += previousMonthDays;
		months -= 1;
	}

	if (months < 0) {
		months += 12;
		years -= 1;
	}

	return { years, months, days };
}

export default function AgeCalculator() {
	const [date, setDate] = useState<TDate>(INITIAL_DATE);
	const [errors, setErrors] = useState<TDateErrors>({});
	const [showAge, setShowAge] = useState<boolean>(false);
	const [newDate, setNewDate] = useState<TDatePlurals>(EMPTY_AGE);

	const handleFieldChange = (field: TDateField, value: string) => {
		setDate((prevDate) => ({
			...prevDate,
			[field]: value,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			[field]: undefined,
		}));
		setShowAge(false);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validationErrors = validateDate(date);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			setNewDate(EMPTY_AGE);
			setShowAge(false);
			return;
		}

		setNewDate(calculateAge(date));
		setShowAge(true);
	};

	return (
		<div className="flex min-h-[calc(100vh-5.5rem)] items-start justify-center bg-[var(--age-off-white)] px-4 py-8 md:items-center md:py-12">
			<main className="flex w-full max-w-[840px] flex-col gap-8 rounded-[24px] rounded-br-[110px] bg-white px-6 py-12 font-[var(--age-font-family)] md:rounded-br-[180px] md:px-14 md:py-14">
				<form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
					<AgeInputs date={date} errors={errors} onFieldChange={handleFieldChange} />
					<Separator showAge={showAge} type="submit" />
				</form>
				<AgePreview newDate={newDate} />
				<p
					className={clsx(
						"m-0 max-w-52 self-start text-xs font-normal lowercase italic text-[var(--age-smokey-grey)] transition",
						{
							"opacity-0": showAge,
							"opacity-30": !showAge,
						}
					)}
				>
					change the values and press the button to calculate your age
				</p>
			</main>
		</div>
	);
}
