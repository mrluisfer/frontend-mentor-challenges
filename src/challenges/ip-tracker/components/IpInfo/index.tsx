import { useMapStore } from '../../lib/store/useMapStore.js';
import Item from './Item.js';
import Separator from './Separator.js';

export default function IpInfo() {
	const { userLocation } = useMapStore();
	const locationValue = userLocation?.location.region
		? `${userLocation.location.city}, ${userLocation.location.region} ${userLocation.location.postalCode}`
		: `${userLocation?.location.city} ${userLocation?.location.postalCode}`;

	return (
		<div className="pointer-events-auto mx-auto flex w-full max-w-[1110px] flex-col items-center gap-6 rounded-[15px] bg-white px-6 py-7 shadow-[0_26px_45px_-18px_rgba(0,0,0,0.28)] md:flex-row md:items-start md:justify-between md:gap-0 md:px-8 md:py-9">
			<Item label="IP Address" value={userLocation?.ip} />
			<Separator />
			<Item label="Location" value={locationValue} />
			<Separator />
			<Item label="Timezone" value={userLocation?.location.timezone} />
			<Separator />
			<Item label="ISP" value={userLocation?.isp} />
		</div>
	);
}
