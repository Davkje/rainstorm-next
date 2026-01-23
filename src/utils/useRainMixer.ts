"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export function useRainMixer() {
	const lightRain = useRef<Howl | null>(null);
	const heavyRain = useRef<Howl | null>(null);

	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [intensity, setIntensity] = useState(0.2);

	// INIT SOUNDS
	useEffect(() => {
		lightRain.current = new Howl({
			src: ["/audio/rain_light.mp3"],
			loop: true,
			volume: volume,
		});

		heavyRain.current = new Howl({
			src: ["/audio/rain_heavy.mp3"],
			loop: true,
		});

		return () => {
			lightRain.current?.unload();
			heavyRain.current?.unload();
		};
	}, []);

	// PLAY / PAUSE
	const togglePlay = () => {
		if (!lightRain.current || !heavyRain.current) return;

		if (playing) {
			lightRain.current.pause();
			heavyRain.current.pause();
		} else {
			lightRain.current.play();
			heavyRain.current.play();
		}

		setPlaying((p) => !p);
	};

	// MASTER VOLUME
	useEffect(() => {
		if (!lightRain.current || !heavyRain.current) return;

		lightRain.current.volume((1 - intensity) * volume);
		heavyRain.current.volume(intensity * volume);
	}, [volume, intensity]);

	return {
		playing,
		volume,
		intensity,
		setVolume,
		setIntensity,
		togglePlay,
	};
}
