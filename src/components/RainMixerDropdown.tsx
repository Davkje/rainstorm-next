"use client";

import { useClickOutside } from "@/utils/useClickOutside";
import { RiPauseFill, RiPlayFill } from "@remixicon/react";
import { FocusTrap } from "focus-trap-react";
import { motion } from "framer-motion";
import { useRef } from "react";

import { useGlobalKeys } from "@/utils/useGlobalKeys";
import { VerticalSlider } from "./ui/VerticalSlider";

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
				className="absolute right-0 top-full mt-2 w-max border-2 border-rain-700 bg-rain-800 rounded-2xl p-4 flex flex-col gap-2 z-50 shadow-lg shadow-black/50"
			>
				{/* PLAY / PAUSE */}
				<div className="flex items-center justify-between">
					<h3 className="uppercase text-sm text-rain-200 leading-normal tracking-wide text-center h-full">
						Rain Sounds
					</h3>
					<button onClick={togglePlay} className="btn--icon">
						{playing ? <RiPauseFill /> : <RiPlayFill />}
					</button>
				</div>

				<div className="grid grid-cols-2 gap-1 place-content-center">
					{/* VOLUME */}
					<div className="flex flex-col items-center gap-2">
						<span className="text-xs text-center uppercase text-rain-400">Volume</span>
						<VerticalSlider value={volume} onChange={setVolume} />
					</div>

					{/* INTENSITY / CROSSFADE */}
					<div className="flex flex-col items-center gap-2">
						<span className="text-xs text-center uppercase text-rain-400">Intensity</span>
						<VerticalSlider value={intensity} onChange={setIntensity} />
					</div>
				</div>
			</motion.div>
		</FocusTrap>
	);
}
