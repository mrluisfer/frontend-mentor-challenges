import { useOutsideClick } from "@/hooks/useOutsideClick";
import { atom, useAtom } from "jotai";
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { api } from "../../api.js";
import { useCountriesStore } from "../../context/useCountriesStore.js";

const defaultOpenRegionsOptions = atom(false);

export default function RegionFilter() {
	const [isOpen, setIsOpen] = useAtom(defaultOpenRegionsOptions);
	const { region, setRegion } = useCountriesStore();
	const listboxId = useId();
	const [activeIndex, setActiveIndex] = useState(0);

	const popoverRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
	const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

	const regions = useMemo(
		() => [...new Set(api?.map((c) => c.region).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
		[],
	);

	const hasRegionSelected = Boolean(region);

	const handleSelect = (value: string) => {
		setRegion(value);
		setIsOpen(false);
	};

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		setRegion(undefined);
	};

	useEffect(() => {
		if (!isOpen) return;
		const idx = region ? Math.max(0, regions.indexOf(region)) : 0;
		setActiveIndex(idx);
		optionRefs.current[idx]?.focus();
	}, [isOpen, region, regions]);

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!isOpen) {
			if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				setIsOpen(true);
			}
			return;
		}
		if (e.key === "Escape") {
			e.preventDefault();
			setIsOpen(false);
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = (activeIndex + 1) % regions.length;
			setActiveIndex(next);
			optionRefs.current[next]?.focus();
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			const next = (activeIndex - 1 + regions.length) % regions.length;
			setActiveIndex(next);
			optionRefs.current[next]?.focus();
		}
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleSelect(regions[activeIndex]);
		}
	};

	return (
		<div className="relative" ref={popoverRef} onKeyDown={handleKeyDown}>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-controls={listboxId}
				className={`flex w-56 items-center justify-between gap-4 rounded-md bg-[var(--rest-white)] px-5 py-3 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rest-dark-gray)] dark:bg-[var(--rest-dark-blue)] dark:text-[var(--rest-white)] ${
					isOpen ? "shadow-lg" : "shadow-md hover:shadow-lg"
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="flex-1 text-left">{hasRegionSelected ? region : "Filter by Region"}</span>
				{hasRegionSelected ? (
					<span
						role="button"
						tabIndex={0}
						aria-label={`Clear ${region} filter`}
						onClick={handleClear}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								setRegion(undefined);
							}
						}}
						className="rounded-full p-1 transition hover:bg-[var(--rest-very-light-gray)] dark:hover:bg-[var(--rest-very-dark-value)]"
					>
						<MdClose />
					</span>
				) : (
					<span
						className={`transform transition ${isOpen ? "-rotate-180" : "rotate-0"}`}
						aria-hidden="true"
					>
						<FiChevronDown />
					</span>
				)}
			</button>

			<ul
				id={listboxId}
				role="listbox"
				aria-label="Regions"
				className={`absolute top-14 z-20 w-56 overflow-hidden rounded-md bg-[var(--rest-white)] py-2 text-sm shadow-lg transition dark:bg-[var(--rest-dark-blue)] ${
					isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
				}`}
			>
				{regions.map((r, idx) => {
					const selected = r === region;
					return (
						<li
							ref={(el) => {
								optionRefs.current[idx] = el;
							}}
							key={r}
							role="option"
							tabIndex={-1}
							aria-selected={selected}
							onClick={() => handleSelect(r)}
							className={`cursor-pointer px-5 py-1.5 outline-none transition hover:bg-[var(--rest-very-light-gray)] focus:bg-[var(--rest-very-light-gray)] dark:text-[var(--rest-very-light-gray)] dark:hover:bg-[var(--rest-very-dark-value)] dark:focus:bg-[var(--rest-very-dark-value)] ${
								selected ? "font-semibold" : ""
							}`}
						>
							{r}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
