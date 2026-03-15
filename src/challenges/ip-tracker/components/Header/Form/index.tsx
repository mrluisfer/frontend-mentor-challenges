import { type FormEvent, useState } from 'react';
import iconArrow from '../../../images/icon-arrow.svg?url';
import { validateIsIpAddress } from '../../utils/isIpAddress';
import { useMapStore } from '../../../lib/store/useMapStore';
import type { LatLngExpression } from 'leaflet';
import { getIpAddress } from '../../../lib/api/getIpAddress';
import Input from './Input';
import { logger } from '@/utils/Logger.ts';

export default function Form() {
	const [inputValue, setInputValue] = useState<string | undefined>('');
	const { map, setUserLocation } = useMapStore();

	const handleSubmitIp = async (e: FormEvent) => {
		e.preventDefault();
		if (!inputValue || !inputValue.length) return;
		const isIpAddress = validateIsIpAddress(inputValue);

		try {
			if (isIpAddress) {
				const { data, status } = await getIpAddress(inputValue);
				if (status !== 200 || !Object.keys(data).length) return;
				const mapData: LatLngExpression = {
					lat: data?.location?.lat,
					lng: data?.location?.lng,
				};
				setUserLocation(data);
				map?.setView(mapData, 13);
			}
		} catch (error) {
			logger.error(error);
		}
	};

	return (
		<form className="mx-auto flex h-[58px] w-full max-w-[555px]" onSubmit={handleSubmitIp}>
			<Input value={inputValue} setValue={setInputValue} />
			<button
				type="submit"
				className="flex w-[58px] shrink-0 items-center justify-center rounded-r-[15px] bg-[var(--ip-very-dark-gray)] transition duration-200 hover:bg-black active:scale-[0.98]"
			>
				<img src={iconArrow} alt="Search" />
			</button>
		</form>
	);
}
