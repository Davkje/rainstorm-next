"use client";

import { useClickOutside } from "@/utils/useClickOutside";
import { RiPauseFill, RiPlayFill } from "@remixicon/react";
import { FocusTrap } from "focus-trap-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Slider } from "radix-ui";
import { useGlobalKeys } from "@/utils/useGlobalKeys";

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
	onClose: () => void;
};

export default function RainMixerDropdown({ rain, onClose }: Props) {
	const { playing, volume, intensity, setVolume, setIntensity, togglePlay } = rain;

	//CLOSE ON OUTSIDE CLICK
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, onClose);

	// CLOSE ON ESCAPE
	useGlobalKeys("Escape", () => onClose(), { ignoreInputs: true });

	return (
		<FocusTrap>
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.2 }}
				className="absolute right-0 top-full mt-2 w-72 bg-rain-800 border border-rain-600 rounded-2xl p-4 shadow-2xl flex flex-col gap-4 z-50"
			>
				<h3 className="uppercase text-sm  text-rain-200 tracking-wide text-center">
					Rain ambience
				</h3>

				{/* PLAY / PAUSE */}
				<div className="flex items-center justify-between">
					<span className="text-sm text-rain-200">Background rain</span>
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
			</motion.div>
		</FocusTrap>
	);
}
