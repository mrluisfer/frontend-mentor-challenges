import { AllRoutes } from "@/enums/AllRoutes.ts";
import { sanitizeText } from "@/utils/sanitizeText.ts";
import { useMemo } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { api } from "../api.js";
import CountryLabel from "../components/CountryLabel.js";
import Header from "../components/Header/index.js";
import { useNumberFormat } from "../hooks/useNumberFormat.js";

type Props = {
	countrySlug?: string;
};

export default function DetailView({ countrySlug }: Props) {
	const slug = useMemo(() => {
		if (countrySlug) return countrySlug;
		if (typeof window === "undefined") return "";
		return window.location.pathname.split("/").filter(Boolean).pop() ?? "";
	}, [countrySlug]);

	const country = useMemo(() => {
		if (!slug) return undefined;
		return api?.find(({ name }) => {
			const countryName = sanitizeText(name);
			return countryName === slug || countryName.includes(slug);
		});
	}, [slug]);

	const codeToCountry = useMemo(() => {
		const map = new Map<string, { name: string; slug: string }>();
		api?.forEach((c) => {
			if (c.alpha3Code) map.set(c.alpha3Code, { name: c.name, slug: sanitizeText(c.name) });
		});
		return map;
	}, []);

	const population = useNumberFormat(country?.population ?? 0);
	const currencies = country?.currencies?.map((c) => c.name).join(", ") ?? "";
	const languages = country?.languages?.map((l) => l.name).join(", ") ?? "";

	const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			e.preventDefault();
			window.history.back();
		}
	};

	return (
		<div>
			<Header />
			<main className="min-h-screen bg-[var(--rest-very-light-gray)] px-4 py-10 lg:px-14 dark:bg-[var(--rest-very-dark-value)]">
				<a
					href={AllRoutes.restCountries}
					onClick={handleBack}
					className="inline-flex w-fit transform items-center gap-2 rounded-md bg-[var(--rest-white)] px-6 py-2 text-sm shadow-md transition active:scale-95 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--rest-dark-gray)] focus-visible:outline-none dark:bg-[var(--rest-dark-blue)] dark:text-[var(--rest-white)]"
				>
					<IoIosArrowRoundBack size="22px" />
					<span>Back</span>
				</a>

				{!country ? (
					<div className="mt-20 text-center dark:text-[var(--rest-white)]">
						<p className="text-xl font-semibold">Country not found</p>
						<p className="mt-2 text-sm opacity-80">
							We couldn&apos;t find details for &quot;{slug}&quot;.
						</p>
					</div>
				) : (
					<article className="flex flex-col gap-10 pt-14 lg:flex-row lg:items-start lg:gap-20 xl:justify-center xl:gap-28 dark:text-[var(--rest-white)]">
						<div className="aspect-[5/3] w-full overflow-hidden rounded-md shadow-lg lg:max-w-[560px] lg:flex-1">
							<img
								src={country.flags?.svg ?? country.flag}
								alt={`Flag of ${country.name}`}
								loading="eager"
								decoding="async"
								fetchPriority="high"
								className="h-full w-full object-cover"
							/>
						</div>

						<div className="flex flex-col lg:flex-1 lg:pt-4">
							<h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">{country.name}</h1>
							<div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-0 lg:gap-16">
								<div className="flex flex-col gap-2 text-sm">
									<CountryLabel label="Native Name" value={country.nativeName} />
									<CountryLabel label="Population" value={population} />
									<CountryLabel label="Region" value={country.region} />
									<CountryLabel label="Sub Region" value={country.subregion} />
									<CountryLabel label="Capital" value={country.capital} />
								</div>
								<div className="flex flex-col gap-2 text-sm">
									<CountryLabel label="Top Level Domain" value={country.topLevelDomain} />
									<CountryLabel label="Currencies" value={currencies} />
									<CountryLabel label="Languages" value={languages} />
								</div>
							</div>

							{country.borders && country.borders.length > 0 ? (
								<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
									<h2 className="shrink-0 font-semibold">Border Countries:</h2>
									<ul className="flex flex-wrap gap-2.5">
										{country.borders.map((code) => {
											const target = codeToCountry.get(code);
											const label = target?.name ?? code;
											const href = target
												? `${AllRoutes.restCountries}/${target.slug}`
												: undefined;
											return (
												<li key={code}>
													{href ? (
														<a
															href={href}
															className="inline-block rounded bg-[var(--rest-white)] px-6 py-1 text-xs shadow-sm transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--rest-dark-gray)] focus-visible:outline-none sm:text-sm dark:bg-[var(--rest-dark-blue)] dark:shadow-md dark:hover:shadow-lg"
														>
															{label}
														</a>
													) : (
														<span className="inline-block rounded bg-[var(--rest-white)] px-6 py-1 text-xs opacity-70 shadow-sm sm:text-sm dark:bg-[var(--rest-dark-blue)]">
															{label}
														</span>
													)}
												</li>
											);
										})}
									</ul>
								</div>
							) : null}
						</div>
					</article>
				)}
			</main>
		</div>
	);
}
