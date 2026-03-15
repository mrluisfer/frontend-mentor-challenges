export default function AgeLabel({
	value = "--",
	label = "",
}: {
	value?: number | string;
	label: string;
}) {
	return (
		<section className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-4">
			<p className="m-0 text-[3.5rem] font-extrabold italic leading-[0.9] tracking-[-0.04em] text-[var(--age-purple)] sm:text-[6.25rem]">
				{value !== undefined ? value : "--"}
			</p>
			<p className="m-0 text-[3.5rem] font-extrabold italic leading-[0.9] tracking-[-0.04em] text-[var(--age-off-black)] sm:text-[6.25rem]">
				{label}
			</p>
		</section>
	);
}
