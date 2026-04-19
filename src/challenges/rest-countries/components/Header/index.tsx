import { useDarkModeStore } from "@/stores/darkModeStore";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

export default function Header() {
	const darkMode = useDarkModeStore((s) => s.darkMode);
	const toggleDarkMode = useDarkModeStore((s) => s.toggleDarkMode);

	return (
		<header className="flex items-center justify-between bg-[var(--rest-white)] px-4 py-6 shadow-md md:px-14 dark:bg-[var(--rest-dark-blue)] dark:text-[var(--rest-white)]">
			<h1 className="text-lg font-bold sm:text-xl">Where in the world?</h1>
			<button
				type="button"
				role="switch"
				aria-checked={darkMode}
				aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
				onClick={() => toggleDarkMode(!darkMode)}
				className="flex transform items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold transition hover:bg-[var(--rest-very-light-gray)] focus-visible:ring-2 focus-visible:ring-[var(--rest-dark-gray)] focus-visible:outline-none active:scale-95 dark:hover:bg-[var(--rest-very-dark-value)]"
			>
				{darkMode ? (
					<>
						<FiSun aria-hidden="true" />
						<span>Light Mode</span>
					</>
				) : (
					<>
						<IoMoonOutline aria-hidden="true" />
						<span>Dark Mode</span>
					</>
				)}
			</button>
		</header>
	);
}
