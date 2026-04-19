import { useEffect } from "react";
import { api } from "./api.js";
import Countries from "./components/Countries/index.js";
import Header from "./components/Header/index.js";
import RegionFilter from "./components/RegionFilter/index.js";
import Searchbox from "./components/Searchbox/index.js";
import { useCountriesStore } from "./context/useCountriesStore.js";

export default function RestCountriesApi() {
	const setAllCountries = useCountriesStore((s) => s.setAllCountries);

	useEffect(() => {
		setAllCountries(api);
	}, [setAllCountries]);

	return (
		<section>
			<Header />
			<main className="min-h-screen bg-[var(--rest-very-light-gray)] py-7 dark:bg-[var(--rest-very-dark-value)]">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between md:px-14">
						<Searchbox />
						<RegionFilter />
					</div>
					<Countries />
				</div>
			</main>
		</section>
	);
}
