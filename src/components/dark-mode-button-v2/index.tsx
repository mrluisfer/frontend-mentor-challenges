import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkModeStore } from "@/stores/darkModeStore";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function DarkModeButtonV2() {
	// False is dark mode, true is light mode
	const [checked, setChecked] = useState<boolean>(true);
	const { toggleDarkMode } = useDarkModeStore();

	const handleCheckedChange = (isChecked: boolean) => {
		setChecked(isChecked);
		toggleDarkMode(!isChecked);
	};

	return (
		<div>
			<div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
				<Switch
					id="switch-12"
					checked={checked}
					onCheckedChange={handleCheckedChange}
					className="peer absolute inset-0 h-[inherit] w-auto data-[checked]:bg-input/50 data-[unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[checked]:[&_span]:translate-x-full rtl:data-[checked]:[&_span]:-translate-x-full"
				/>
				<span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[checked]:text-muted-foreground/70">
					<Moon size={16} strokeWidth={2} aria-hidden="true" />
				</span>
				<span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[unchecked]:text-muted-foreground/70">
					<Sun size={16} strokeWidth={2} aria-hidden="true" />
				</span>
			</div>
			<Label htmlFor="switch-12" className="sr-only">
				Labeled switch
			</Label>
		</div>
	);
}
