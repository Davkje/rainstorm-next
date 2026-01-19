import { useEffect, useRef } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

type UseGlobalKeysOptions = {
	ignoreInputs?: boolean;
	preventDefault?: boolean;
};

export function useGlobalKeys(
	keys: string | string[],
	handler: KeyHandler,
	options: UseGlobalKeysOptions = {}
) {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const keyList = Array.isArray(keys) ? keys.map((k) => k.toLowerCase()) : [keys.toLowerCase()];

		const onKeyDown = (e: KeyboardEvent) => {
			if (!keyList.includes(e.key.toLowerCase())) return;
			if (e.repeat) return;

			if (options.ignoreInputs) {
				const target = e.target as HTMLElement | null;
				if (
					target &&
					(target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
				) {
					return;
				}
			}

			if (options.preventDefault !== false) {
				e.preventDefault();
			}

			handlerRef.current(e);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [keys, options.ignoreInputs, options.preventDefault]);
}
