"use client";

import { RiPauseFill, RiPlayFill } from "@remixicon/react";

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
		<div className="flex flex-col gap-4">
			<h3 className="uppercase text-lg  text-rain-200 tracking-wide">Rain ambience</h3>

			{/* PLAY / PAUSE */}
			<div className="flex items-center justify-between">
				<span className="text-lg text-rain-200">Background rain</span>
				<button onClick={togglePlay} className="btn--icon">
					{playing ? <RiPauseFill /> : <RiPlayFill />}
				</button>
			</div>

			{/* VOLUME */}
			<div className="flex flex-col gap-1">
				<label className="text-xs text-rain-400">Volume</label>
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					className="w-full"
				/>
			</div>

			{/* INTENSITY / CROSSFADE */}
			<div className="flex flex-col gap-1">
				<label className="text-xs text-rain-400">Rain intensity</label>
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={intensity}
					onChange={(e) => setIntensity(Number(e.target.value))}
					className="w-full"
				/>
				<div className="flex justify-between text-[10px] text-rain-500">
					<span>Light</span>
					<span>Heavy</span>
				</div>
			</div>
		</div>
	);
}
