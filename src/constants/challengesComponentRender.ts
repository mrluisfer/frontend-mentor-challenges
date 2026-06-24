import { AllRoutes } from "@/enums/AllRoutes";
import { clearChallengeRoute } from "@/utils/clearChallengeRoute";
import AgeCalculator from "@/challenges/age-calculator";
import InteractiveComments from "@/challenges/interactive-comments";
import QrCard from "@/challenges/qr-card";
import IpAddress from "@/challenges/ip-tracker";
import RestCountries from "@/challenges/rest-countries";
import WeatherApp from "@/challenges/weather-app-main";

export const challengesComponentRender = {
	[clearChallengeRoute(AllRoutes.ageCalculator)]: AgeCalculator,
	[clearChallengeRoute(AllRoutes.interactiveComments)]: InteractiveComments,
	[clearChallengeRoute(AllRoutes.qrCard)]: QrCard,
	[clearChallengeRoute(AllRoutes.ipAddress)]: IpAddress,
	[clearChallengeRoute(AllRoutes.restCountries)]: RestCountries,
	[clearChallengeRoute(AllRoutes.weatherApp)]: WeatherApp,
};
