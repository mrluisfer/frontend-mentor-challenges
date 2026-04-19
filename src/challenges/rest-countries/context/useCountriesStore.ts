import { create } from "zustand";
import type { Countries } from "../types/Api.js";

interface CountriesStore {
	allCountries: Countries;
	// eslint-disable-next-line no-unused-vars
	setAllCountries: (countries: Countries) => void;
	region: string | undefined;
	// eslint-disable-next-line no-unused-vars
	setRegion: (region: string | undefined) => void;
	query: string;
	// eslint-disable-next-line no-unused-vars
	setQuery: (query: string) => void;
}

export const useCountriesStore = create<CountriesStore>((set) => ({
	allCountries: [],
	setAllCountries: (allCountries) => set({ allCountries }),
	region: undefined,
	setRegion: (region) => set({ region }),
	query: "",
	setQuery: (query) => set({ query }),
}));
