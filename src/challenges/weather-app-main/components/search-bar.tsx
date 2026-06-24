import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { searchLocations } from "../lib/api";
import { locationLabel } from "../lib/format";
import type { GeoResult } from "../lib/types";

import iconSearch from "../assets/images/icon-search.svg?url";
import iconLoading from "../assets/images/icon-loading.svg?url";

type SearchBarProps = {
	// eslint-disable-next-line no-unused-vars
	onSelect: (location: GeoResult) => void;
};

export default function SearchBar({ onSelect }: SearchBarProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<GeoResult[]>([]);
	const [searching, setSearching] = useState(false);
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const skipNextSearch = useRef(false);

	// Debounced geocoding lookup as the user types.
	useEffect(() => {
		// Skip the lookup triggered by programmatically filling the input on pick.
		if (skipNextSearch.current) {
			skipNextSearch.current = false;
			return;
		}

		const trimmed = query.trim();
		if (trimmed.length < 2) {
			setResults([]);
			setSearching(false);
			setOpen(false);
			return;
		}

		setSearching(true);
		setOpen(true);
		let active = true;
		const timer = setTimeout(async () => {
			try {
				const found = await searchLocations(trimmed);
				if (active) setResults(found);
			} catch {
				if (active) setResults([]);
			} finally {
				if (active) setSearching(false);
			}
		}, 350);

		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [query]);

	// Close the suggestions when clicking outside.
	useEffect(() => {
		function onClickOutside(event: MouseEvent) {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, []);

	const pick = (location: GeoResult) => {
		skipNextSearch.current = true;
		setQuery(locationLabel(location.name, location.country));
		setResults([]);
		setOpen(false);
		onSelect(location);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (results.length > 0) {
			pick(results[0]);
		} else if (query.trim().length >= 2) {
			setOpen(true);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto flex w-full max-w-[656px] flex-col gap-3 sm:flex-row"
		>
			<div ref={containerRef} className="relative flex-1">
				<div className="relative">
					<img
						src={iconSearch}
						alt=""
						aria-hidden
						className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
					/>
					<input
						type="text"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						onFocus={() => results.length > 0 && setOpen(true)}
						placeholder="Search for a place..."
						aria-label="Search for a place"
						className={cn(
							"w-full rounded-xl bg-[hsl(243,27%,20%)] py-3.5 pr-4 pl-12 text-base text-[hsl(0,0%,100%)]",
							"placeholder:text-[hsl(240,6%,70%)] transition-colors",
							"hover:bg-[hsl(243,23%,24%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(248,70%,36%)]",
						)}
					/>
				</div>

				{open && (
					<div className="absolute top-[calc(100%+0.5rem)] z-20 w-full rounded-xl border border-[hsl(243,23%,30%)] bg-[hsl(243,27%,20%)] p-2 shadow-lg">
						{searching ? (
							<div className="flex items-center gap-2.5 px-2 py-2.5 text-base text-[hsl(0,0%,100%)]">
								<img
									src={iconLoading}
									alt=""
									aria-hidden
									className="size-4 animate-spin"
								/>
								Search in progress
							</div>
						) : results.length > 0 ? (
							<ul>
								{results.map((result) => (
									<li key={result.id}>
										<button
											type="button"
											onClick={() => pick(result)}
											className="w-full rounded-lg px-2 py-2.5 text-left text-base text-[hsl(0,0%,100%)] transition-colors hover:bg-[hsl(243,23%,30%)]"
										>
											{locationLabel(result.name, result.country)}
										</button>
									</li>
								))}
							</ul>
						) : (
							<p className="px-2 py-2.5 text-base text-[hsl(240,6%,70%)]">
								No results found
							</p>
						)}
					</div>
				)}
			</div>

			<button
				type="submit"
				className={cn(
					"rounded-xl bg-[hsl(233,67%,56%)] px-6 py-3.5 text-base font-medium text-[hsl(0,0%,100%)]",
					"transition-colors hover:bg-[hsl(248,70%,36%)]",
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(248,70%,36%)]",
				)}
			>
				Search
			</button>
		</form>
	);
}
