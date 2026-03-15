import Input from "../Input";
import type { TDate, TDateErrors, TDateField } from "../../types/index.ts";

type AgeInputsProps = {
	date: TDate;
	errors: TDateErrors;
	// eslint-disable-next-line no-unused-vars
	onFieldChange: (...args: [TDateField, string]) => void;
};

export default function AgeInputs({ date, errors, onFieldChange }: AgeInputsProps) {
	return (
		<section className="grid w-full grid-cols-3 gap-4 md:max-w-[460px] md:gap-8">
			<Input
				label="day"
				setValue={(value) => onFieldChange("day", value)}
				value={date?.day}
				error={errors.day}
			/>
			<Input
				label="month"
				setValue={(value) => onFieldChange("month", value)}
				value={date?.month}
				error={errors.month}
			/>
			<Input
				label="year"
				setValue={(value) => onFieldChange("year", value)}
				value={date?.year}
				error={errors.year}
			/>
		</section>
	);
}
