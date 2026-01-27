"use client";

import { RiPauseFill, RiPlayFill } from "@remixicon/react";
import { HorizontalSlider } from "./ui/HorizontalSlider";

type RainMixer = {
	playing: boolean;
	volume: number;
	intensity: number;
	setVolume: (v: number) => void;
	setIntensity: (v: number) => void;
	togglePlay: () => void;
};

type Props = {
	rain: RainMixer;
};

export default function RainMixerDropdown({ rain }: Props) {
	const { playing, volume, intensity, setVolume, setIntensity, togglePlay } = rain;

	return (
		<div className="flex flex-col gap-4 mt-8">
			{/* PLAY / PAUSE */}
			<div className="flex items-center justify-between">
				<h3 className="uppercase text-lg text-rain-200 leading-normal tracking-wide text-center">
					Rain Sounds
				</h3>
				<button onClick={togglePlay} className="btn--icon">
					{playing ? <RiPauseFill /> : <RiPlayFill />}
				</button>
			</div>

			<div className="flex flex-col gap-4 place-content-center">
				{/* VOLUME */}
				<div className="flex flex-col items-center gap-4">
					<span className="text-lg text-center uppercase text-rain-300">Volume</span>
					<HorizontalSlider value={volume} onChange={setVolume} />
				</div>

				{/* INTENSITY / CROSSFADE */}
				<div className="flex flex-col items-center gap-4">
					<span className="text-lg text-center uppercase text-rain-300">Intensity</span>
					<HorizontalSlider value={intensity} onChange={setIntensity} />
				</div>
			</div>
		</div>
	);
}
