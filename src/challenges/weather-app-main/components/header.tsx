import type { Units } from "../lib/types";
import logo from "../assets/images/logo.svg?url";
import UnitsSelect from "./units-select";

type WeatherHeaderProps = {
	units: Units;
	// eslint-disable-next-line no-unused-vars
	onUnitsChange: (units: Units) => void;
};

export default function WeatherHeader({
	units,
	onUnitsChange,
}: WeatherHeaderProps) {
	return (
		<header className="flex items-center justify-between">
			<img src={logo} alt="Weather Now" className="h-8" />
			<UnitsSelect value={units} onChange={onUnitsChange} />
		</header>
	);
}
