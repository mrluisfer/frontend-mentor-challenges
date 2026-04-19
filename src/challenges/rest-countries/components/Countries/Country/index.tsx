import { AllRoutes } from "@/enums/AllRoutes";
import { sanitizeText } from "@/utils/sanitizeText.js";
import { memo } from "react";
import { useNumberFormat } from "../../../hooks/useNumberFormat.js";
import type { Country as CountryType } from "../../../types/Api.js";
import CountryLabel from "../../CountryLabel.js";

type Props = {
	country: CountryType;
	eager?: boolean;
};

function Country({ country, eager = false }: Props) {
	const sanitizedName = sanitizeText(country.name);
	const population = useNumberFormat(country.population);

	return (
		<a
			href={`${AllRoutes.restCountries}/${sanitizedName}`}
			className="group flex h-full flex-col overflow-hidden rounded-lg bg-[var(--rest-white)] shadow-md outline-none transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[var(--rest-dark-gray)] dark:bg-[var(--rest-dark-blue)] dark:text-[var(--rest-white)]"
			aria-label={`View details for ${country.name}`}
		>
			<div className="relative aspect-[5/3] w-full overflow-hidden bg-[var(--rest-very-light-gray)] dark:bg-[var(--rest-very-dark-value)]">
				<img
					src={country.flags?.png ?? country.flag}
					alt=""
					loading={eager ? "eager" : "lazy"}
					decoding="async"
					fetchPriority={eager ? "high" : "low"}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
				/>
			</div>
			<div className="flex flex-1 flex-col gap-3 p-6 pb-10">
				<h3 className="text-lg font-extrabold">{country.name}</h3>
				<div className="flex flex-col gap-1 text-sm">
					<CountryLabel label="Population" value={population} />
					<CountryLabel label="Region" value={country.region} />
					<CountryLabel label="Capital" value={country.capital} />
				</div>
			</div>
		</a>
	);
}

export default memo(Country);
