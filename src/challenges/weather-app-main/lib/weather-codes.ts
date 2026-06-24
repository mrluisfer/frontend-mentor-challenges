import iconDrizzle from "../assets/images/icon-drizzle.webp?url";
import iconFog from "../assets/images/icon-fog.webp?url";
import iconOvercast from "../assets/images/icon-overcast.webp?url";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp?url";
import iconRain from "../assets/images/icon-rain.webp?url";
import iconSnow from "../assets/images/icon-snow.webp?url";
import iconStorm from "../assets/images/icon-storm.webp?url";
import iconSunny from "../assets/images/icon-sunny.webp?url";

type WeatherInfo = { icon: string; label: string };

// Maps WMO weather interpretation codes to the challenge's icon set + a label.
// https://open-meteo.com/en/docs#weathervariables
export function weatherFromCode(code: number): WeatherInfo {
	if (code === 0) return { icon: iconSunny, label: "Clear sky" };
	if (code === 1) return { icon: iconSunny, label: "Mainly clear" };
	if (code === 2) return { icon: iconPartlyCloudy, label: "Partly cloudy" };
	if (code === 3) return { icon: iconOvercast, label: "Overcast" };
	if (code === 45 || code === 48) return { icon: iconFog, label: "Fog" };
	if (code >= 51 && code <= 57) return { icon: iconDrizzle, label: "Drizzle" };
	if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
		return { icon: iconRain, label: "Rain" };
	if ((code >= 71 && code <= 77) || code === 85 || code === 86)
		return { icon: iconSnow, label: "Snow" };
	if (code >= 95) return { icon: iconStorm, label: "Thunderstorm" };
	return { icon: iconOvercast, label: "Unknown" };
}
