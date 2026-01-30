import { useEffect, useRef, useState } from "react";

export function useAutosave<T>(value: T | null, onSave: (value: T) => void, delay = 800) {
	const timeoutRef = useRef<number | null>(null);
	const lastSavedRef = useRef<string | null>(null);
	const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

	useEffect(() => {
		if (!value) return;

		// SAME = DONT SAVE
		const serialized = JSON.stringify(value);
		if (serialized === lastSavedRef.current) return;

		setTimeout(() => {
			setStatus("saving");
		}, 0);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = window.setTimeout(() => {
			onSave(value);
			lastSavedRef.current = serialized;
			setStatus("saved");
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [value, onSave, delay]);

	return status;
}
