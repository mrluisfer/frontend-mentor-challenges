import { create } from 'zustand';
import type { MapStore } from '../../types/MapStore.js';
import type { Location } from '../../types/Location.js';

const userLocationExample: Location = {
	isp: 'UNINET',
	ip: '189.146.0.1',
	location: {
		region: 'CDMX',
		timezone: 'UTC -06:00',
		city: 'Mexico City',
		postalCode: '06060',
		lat: 19.4326077,
		lng: -99.133208,
	},
};

export const useMapStore = create<MapStore>()((set) => ({
	map: null,
	setMap: (map) => {
		if (!map) return;
		set(() => ({ map }));
	},
	userLocation: userLocationExample,
	setUserLocation: (data) => {
		if (!data) return;
		set(() => ({ userLocation: data }));
	},
}));
