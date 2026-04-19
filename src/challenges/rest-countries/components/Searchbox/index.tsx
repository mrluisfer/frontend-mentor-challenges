import { useId, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useCountriesStore } from "../../context/useCountriesStore.js";

export default function Searchbox() {
	const inputRef = useRef<HTMLInputElement>(null);
	const inputId = useId();
	const { query, setQuery } = useCountriesStore();

	const handleClear = () => {
		setQuery("");
		inputRef.current?.focus();
	};

	return (
		<form
			role="search"
			onSubmit={(e) => e.preventDefault()}
			className="flex min-h-12 w-full items-center gap-5 rounded-md bg-[var(--rest-white)] px-6 shadow-md transition-shadow focus-within:shadow-lg md:max-w-lg dark:bg-[var(--rest-dark-blue)]"
			onClick={() => inputRef.current?.focus()}
		>
			<label htmlFor={inputId} className="sr-only">
				Search for a country
			</label>
			<IoMdSearch className="text-xl text-[var(--rest-dark-gray)] dark:text-[var(--rest-very-light-gray)]" />
			<input
				id={inputId}
				ref={inputRef}
				type="search"
				autoComplete="off"
				placeholder="Search for a country..."
				className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[var(--rest-dark-gray)] dark:text-[var(--rest-white)] dark:placeholder:text-[var(--rest-very-light-gray)]/80"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{query.length > 0 && (
				<button
					type="button"
					aria-label="Clear search"
					onClick={handleClear}
					className="rounded-full p-1 text-[var(--rest-dark-gray)] transition hover:bg-[var(--rest-very-light-gray)] dark:text-[var(--rest-very-light-gray)] dark:hover:bg-[var(--rest-very-dark-value)]"
				>
					<MdClose />
				</button>
			)}
		</form>
	);
}
