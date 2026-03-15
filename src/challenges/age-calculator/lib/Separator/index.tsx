import { type ButtonHTMLAttributes } from "react";
import iconArrow from "../../assets/images/icon-arrow.svg?url";
import "./styles/separator.css";
import clsx from "clsx";

type SeparatorProps = {
	showAge: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Separator(props: SeparatorProps) {
	const { showAge, className, ...buttonProps } = props;

	return (
		<div className="after-line relative flex w-full select-none items-center justify-center md:justify-end">
			<button
				data-calculated={showAge || undefined}
				className={clsx(
					"relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--age-purple)] outline-none transition duration-150 ease-linear hover:bg-[var(--age-off-black)] active:scale-95 md:h-24 md:w-24",
					className
				)}
				title="Get your age"
				aria-label="Calculate age"
				{...buttonProps}
			>
				<img
					src={iconArrow}
					alt=""
					aria-hidden="true"
					loading="lazy"
					draggable="false"
					className="w-6 md:w-11"
				/>
			</button>
		</div>
	);
}
