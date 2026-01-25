"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const FADE_DURATION = 800;

export function useRainMixer() {
	// TWO RAIN SOUNDS YOU CAN CROSSFADE BETWEEN
	const lightRain = useRef<Howl | null>(null);
	const heavyRain = useRef<Howl | null>(null);

	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [intensity, setIntensity] = useState(0.2);

	const getLightVolume = () => (1 - intensity) * volume;
	const getHeavyVolume = () => intensity * volume;

	/* ---------------- INIT ---------------- */

	useEffect(() => {
		lightRain.current = new Howl({
			src: ["/audio/rain_light.mp3"],
			loop: true,
			volume: 0,
		});

		heavyRain.current = new Howl({
			src: ["/audio/rain_heavy.mp3"],
			loop: true,
			volume: 0,
		});

		return () => {
			lightRain.current?.unload();
			heavyRain.current?.unload();
		};
	}, []);

	/* ---------------- PLAY / PAUSE WITH FADE ---------------- */

	const togglePlay = () => {
		if (!lightRain.current || !heavyRain.current) return;

		if (playing) {
			// FADE OUT
			lightRain.current.fade(lightRain.current.volume(), 0, FADE_DURATION);
			heavyRain.current.fade(heavyRain.current.volume(), 0, FADE_DURATION);

			setTimeout(() => {
				lightRain.current?.pause();
				heavyRain.current?.pause();
			}, FADE_DURATION);
		} else {
			// PLAY FIRST
			if (!lightRain.current.playing()) lightRain.current.play();
			if (!heavyRain.current.playing()) heavyRain.current.play();

			// FADE IN
			lightRain.current.fade(0, getLightVolume(), FADE_DURATION);
			heavyRain.current.fade(0, getHeavyVolume(), FADE_DURATION);
		}

		setPlaying((p) => !p);
	};

	/* ---------------- VOLUME / CROSSFADE ---------------- */

	useEffect(() => {
		if (!lightRain.current || !heavyRain.current) return;
		if (!playing) return;

		lightRain.current.fade(lightRain.current.volume(), getLightVolume(), 300);

		heavyRain.current.fade(heavyRain.current.volume(), getHeavyVolume(), 300);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [volume, intensity, playing]);

	return {
		playing,
		volume,
		intensity,
		setVolume,
		setIntensity,
		togglePlay,
	};
}
