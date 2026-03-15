export default function Item({ label, value }: { label: string; value?: string }) {
	return (
		<div className="flex min-w-0 flex-col items-center gap-2 text-center md:flex-1 md:items-start md:px-5 md:text-left first:md:pl-0 last:md:pr-0">
			<span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ip-dark-gray)]">
				{label}
			</span>
			<p className="max-w-[16ch] text-[20px] font-medium leading-[1.15] text-[var(--ip-very-dark-gray)] md:max-w-[13ch] md:text-[26px]">
				{value}
			</p>
		</div>
	);
}
