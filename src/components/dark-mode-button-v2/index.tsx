import { useDarkModeStore } from "@/stores/darkModeStore";
import { Moon, Sun } from "lucide-react";

export default function DarkModeButtonV2() {
	const darkMode = useDarkModeStore((s) => s.darkMode);
	const toggleDarkMode = useDarkModeStore((s) => s.toggleDarkMode);

	return (
		<button
			type="button"
			role="switch"
			aria-checked={darkMode}
			aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
			onClick={() => toggleDarkMode(!darkMode)}
			className="border-input focus-visible:outline-ring/70 relative inline-flex h-9 w-[72px] items-center rounded-full border bg-neutral-100 p-1 shadow-inner transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-neutral-800"
		>
			<span className="pointer-events-none absolute inset-0 flex items-center justify-between px-[10px] text-neutral-400 dark:text-neutral-500">
				<Sun size={14} strokeWidth={2} aria-hidden="true" />
				<Moon size={14} strokeWidth={2} aria-hidden="true" />
			</span>
			<span
				className={`relative z-10 flex size-7 items-center justify-center rounded-full bg-gradient-to-br shadow-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
					darkMode
						? "translate-x-9 from-indigo-500 to-indigo-700"
						: "translate-x-0 from-amber-300 to-amber-500"
				}`}
			>
				{darkMode ? (
					<Moon size={14} strokeWidth={2.5} className="text-white" aria-hidden="true" />
				) : (
					<Sun size={14} strokeWidth={2.5} className="text-white" aria-hidden="true" />
				)}
			</span>
		</button>
	);
}
