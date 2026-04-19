type Props = {
	label: string | undefined;
	value: string | number | string[] | undefined;
};

export default function CountryLabel({ label, value }: Props) {
	if (!label) return null;
	const isEmpty =
		value === undefined || value === null || (Array.isArray(value) && value.length === 0);
	if (isEmpty) return null;

	const displayed = Array.isArray(value) ? value.join(", ") : value;

	return (
		<p className="flex flex-wrap items-baseline gap-1">
			<span className="font-semibold">{label}:</span>
			<span className="font-light opacity-90 dark:text-[var(--rest-very-light-gray)]">
				{displayed}
			</span>
		</p>
	);
}
