import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export default function Input({
	value: inputValue,
	setValue: setInputValue,
}: {
	value?: string;
	setValue?: Dispatch<SetStateAction<string | undefined>>;
}) {
	return (
		<input
			type="text"
			height="h-full"
			className="h-full w-full rounded-l-[15px] border-none px-6 text-[18px] font-normal text-[var(--ip-very-dark-gray)] outline-none placeholder:text-[var(--ip-dark-gray)]"
			placeholder="Search for any IP address or domain"
			value={inputValue}
			role="combobox"
			onChange={(event: ChangeEvent<HTMLInputElement>) => {
				const value = event.target.value;
				setInputValue?.(value);
			}}
		/>
	);
}
