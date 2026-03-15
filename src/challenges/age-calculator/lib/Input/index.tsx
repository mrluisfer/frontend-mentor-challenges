import { type ChangeEvent } from "react";
import { maxLengths, placeholders } from "../../contants/index.js";
import clsx from "clsx";
import type { TDateField } from "../../types";

type InputProps = {
	label: TDateField;
	error?: string;
	// eslint-disable-next-line no-unused-vars
	setValue: (value: string) => void;
	value: string;
};

export default function Input({ setValue, label, error, value }: InputProps) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>, fieldType: TDateField) => {
		const sanitizedValue = event.target.value.replace(/\D/g, "");
		const nextValue = sanitizedValue.slice(0, maxLengths[fieldType]);
		setValue(nextValue);
	};

	return (
		<div className="flex w-full flex-col gap-2">
			<label
				htmlFor={`${label}-input`}
				className={clsx("text-xs font-bold uppercase tracking-[0.22rem]", {
					"text-[var(--age-light-red)]": error,
					"text-[var(--age-smokey-grey)]": !error,
				})}
			>
				{label}
			</label>
			<input
				id={`${label}-input`}
				type="text"
				inputMode="numeric"
				onChange={(event) => handleChange(event, label)}
				placeholder={placeholders[label]}
				value={value}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? `${label}-error` : undefined}
				className={clsx(
					"placeholder:text-[var(--age-smokey-grey)]/70 w-full rounded-lg border border-[var(--age-light-grey)] px-4 py-3 text-[1.25rem] font-bold tracking-[0.01em] text-[var(--age-off-black)] caret-[var(--age-purple)] outline-none transition-colors selection:bg-[var(--age-purple)] selection:text-white focus:border-[var(--age-purple)] sm:text-[2rem]",
					{
						"border-[var(--age-light-red)] focus:border-[var(--age-light-red)]": error,
					}
				)}
			/>
			<span
				id={`${label}-error`}
				className="min-h-4 text-[0.7rem] font-normal italic leading-none text-[var(--age-light-red)] sm:text-xs"
			>
				{error}
			</span>
		</div>
	);
}
