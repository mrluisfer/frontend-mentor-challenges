import { useMemo } from "react";
import { sanitizeText } from "@/utils/sanitizeText.js";
import { useCountriesStore } from "../../context/useCountriesStore.js";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.js";
import Country from "./Country/index.js";
import CountrySkeleton from "./CountrySkeleton.js";

const INITIAL_EAGER = 8;
const PAGE_SIZE = 20;

export default function Countries() {
	const { allCountries, query, region } = useCountriesStore();
	const debouncedQuery = useDebouncedValue(query, 200);

	const filtered = useMemo(() => {
		if (!allCountries) return [];
		const normalized = sanitizeText(debouncedQuery.trim());
		return allCountries.filter((country) => {
			const matchesRegion = !region || country.region === region;
			if (!matchesRegion) return false;
			if (!normalized) return true;
			return sanitizeText(country.name).includes(normalized);
		});
	}, [allCountries, debouncedQuery, region]);

	const { sentinelRef, visibleCount, hasMore } = useInfiniteScroll({
		total: filtered.length,
		pageSize: PAGE_SIZE,
	});

	const visible = filtered.slice(0, visibleCount);
	const isLoading = !allCountries || allCountries.length === 0;

	if (isLoading) {
		return (
			<div
				role="status"
				aria-label="Loading countries"
				className="grid grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-14"
			>
				{Array.from({ length: 8 }).map((_, i) => (
					<CountrySkeleton key={`sk-${i}`} />
				))}
			</div>
		);
	}

	if (filtered.length === 0) {
		return (
			<div
				role="status"
				className="mx-auto mt-10 max-w-md px-4 text-center text-[var(--rest-very-dark-blue)] dark:text-[var(--rest-white)]"
			>
				<p className="text-lg font-semibold">No countries found</p>
				<p className="text-sm opacity-80">
					Try adjusting your search {region ? `or clearing the "${region}" region filter` : ""}.
				</p>
			</div>
		);
	}

	return (
		<>
			<p
				aria-live="polite"
				className="px-4 text-xs text-[var(--rest-dark-gray)] md:px-14 dark:text-[var(--rest-very-light-gray)]/80"
			>
				Showing {visible.length} of {filtered.length}
			</p>

			<ul className="grid list-none grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-14">
				{visible.map((country, i) => (
					<li key={country.alpha3Code ?? country.name}>
						<Country country={country} eager={i < INITIAL_EAGER} />
					</li>
				))}
			</ul>

			{hasMore && (
				<div
					ref={sentinelRef}
					aria-hidden="true"
					className="grid grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-14"
				>
					{Array.from({ length: 4 }).map((_, i) => (
						<CountrySkeleton key={`sk-more-${i}`} />
					))}
				</div>
			)}
		</>
	);
}
