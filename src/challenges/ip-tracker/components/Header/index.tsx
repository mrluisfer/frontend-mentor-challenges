import patternBgDesktop from '../../images/pattern-bg-desktop.png?url';
import patternBgMobile from '../../images/pattern-bg-mobile.png?url';
import Form from './Form';

export default function Header() {
	return (
		<header className="relative flex h-[300px] items-start justify-center overflow-hidden pt-7 md:items-start md:pt-8">
			<img
				src={patternBgDesktop}
				alt="pattern bg desktop"
				className="absolute inset-0 hidden h-full w-full object-cover md:block"
			/>
			<img
				src={patternBgMobile}
				alt="pattern bg mobile"
				className="absolute inset-0 block h-full w-full object-cover md:hidden"
			/>
			<div className="relative z-10 flex w-full max-w-[555px] flex-col items-center gap-7 px-6">
				<h1 className="text-center text-[32px] font-medium leading-none tracking-[-0.02em] text-white md:text-[36px]">
					IP Address Tracker
				</h1>
				<Form />
			</div>
		</header>
	);
}
