import Header from './components/Header/index.js';
import Map from './components/Map.js';
import IpInfo from './components/IpInfo/index.js';

export default function IpAddressTracker() {
	return (
		<section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[hsl(0,0%,98%)] font-['Rubik']">
			<Header />
			<Map />
			<div className="pointer-events-none absolute inset-x-0 top-[138px] z-[1000] px-6 md:top-[188px] md:px-10">
				<IpInfo />
			</div>
		</section>
	);
}
