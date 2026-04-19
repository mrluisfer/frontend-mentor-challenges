import { useDarkModeStore } from "@/stores/darkModeStore";
import { Moon, Sun } from "lucide-react";

export default function DarkModeButton() {
	const darkMode = useDarkModeStore((s) => s.darkMode);
	const toggleDarkMode = useDarkModeStore((s) => s.toggleDarkMode);

	return (
		<>
			<input
				type="checkbox"
				name="theme-checkbox"
				id="theme-checkbox"
				className="peer sr-only"
				checked={darkMode}
				onChange={({ target: { checked } }) => toggleDarkMode(checked)}
				aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
			/>
			<label
				htmlFor="theme-checkbox"
				className="group border-input bg-background peer-focus-visible:outline-ring/70 relative inline-flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg border shadow-sm shadow-black/5 transition-all duration-300 peer-focus-visible:outline-2 hover:border-amber-300/60 hover:shadow-md hover:shadow-amber-200/40 motion-reduce:transition-none dark:hover:border-indigo-400/50 dark:hover:shadow-indigo-500/30"
			>
				<Moon
					size={16}
					strokeWidth={2}
					className={`shrink-0 text-indigo-400 transition-all duration-300 motion-reduce:transition-none ${darkMode ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}
					aria-hidden="true"
				/>
				<Sun
					size={16}
					strokeWidth={2}
					className={`absolute shrink-0 text-amber-500 transition-all duration-300 motion-reduce:transition-none ${darkMode ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
					aria-hidden="true"
				/>
			</label>
		</>
	);
}
