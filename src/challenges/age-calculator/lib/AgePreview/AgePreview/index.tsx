import type { TDatePlurals } from "../../../types/index.ts";
import AgeLabel from "../AgeLabel";

export default function AgePreview({ newDate }: { newDate: TDatePlurals }) {
	return (
		<section className="flex w-full flex-col items-start" aria-live="polite">
			<AgeLabel label="years" value={newDate.years} />
			<AgeLabel label="months" value={newDate.months} />
			<AgeLabel label="days" value={newDate.days} />
		</section>
	);
}
