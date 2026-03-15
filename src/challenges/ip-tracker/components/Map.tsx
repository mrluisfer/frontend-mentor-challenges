import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapTiler } from '../mapTiler.js';
import { useMapStore } from '../lib/store/useMapStore.js';
import { type LatLngExpression, icon } from 'leaflet';
import { useMemo } from 'react';
import iconLocation from '../images/icon-location.svg?url';

export default function Map() {
	const { setMap, userLocation } = useMapStore();
	const zoomLevel = 13;

	const center: LatLngExpression = useMemo(() => {
		return {
			lat: userLocation?.location.lat ?? 0,
			lng: userLocation?.location.lng ?? 0,
		};
	}, [userLocation?.location.lat, userLocation?.location.lng]);

	const locationMarker = useMemo(
		() =>
			icon({
				iconUrl: iconLocation,
				iconSize: [46, 56],
				iconAnchor: [23, 56],
			}),
		[]
	);

	return (
		<MapContainer
			center={center}
			zoom={zoomLevel}
			ref={setMap}
			zoomControl={false}
			attributionControl={false}
			className="h-[620px] md:h-[calc(100vh-330px)] md:min-h-[560px]"
		>
			<TileLayer url={mapTiler.url} attribution={mapTiler.attribution} />
			<Marker position={center} icon={locationMarker} />
		</MapContainer>
	);
}
