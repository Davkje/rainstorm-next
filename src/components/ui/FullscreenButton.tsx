import { useFullscreen } from "@/utils/useFullscreen";
import { RiFullscreenLine, RiFullscreenExitLine } from "@remixicon/react";

export function FullscreenButton() {
	const { isFullscreen, enter, exit } = useFullscreen();

	return (
		<button
			onClick={isFullscreen ? exit : enter}
			className="btn--icon"
			aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
		>
			{isFullscreen ? <RiFullscreenExitLine size={20} /> : <RiFullscreenLine size={20} />}
		</button>
	);
}
