import { useEffect, useRef, useState } from "react";

type UseOneTimeHintOptions = {
	when: boolean;
	duration?: number;
};

export function useOneTimeHint({ when, duration = 3000 }: UseOneTimeHintOptions) {
	const hasShownRef = useRef(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!when) return;
		if (hasShownRef.current) return;

		hasShownRef.current = true;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setVisible(true);

		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [when, duration]);

	return visible;
}
