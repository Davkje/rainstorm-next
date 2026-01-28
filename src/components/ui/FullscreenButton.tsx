import { useFullscreen } from "@/utils/useFullscreen";
import { useGlobalKeys } from "@/utils/useGlobalKeys";
import { RiFullscreenLine, RiFullscreenExitLine } from "@remixicon/react";
import Tooltip from "./Tooltip";

export function FullscreenButton() {
	const { isFullscreen, enter, exit } = useFullscreen();

	useGlobalKeys(
		"f",
		() => {
			if (isFullscreen) {
				exit();
			} else {
				enter();
			}
		},
		{ ignoreInputs: true },
	);

	return (
		<Tooltip text="Toggle Fullscreen [F]" position="bottomright">
			<button
				onClick={isFullscreen ? exit : enter}
				className="btn--icon text-rain-400 hover:text-rain-300"
				aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
			>
				{isFullscreen ? <RiFullscreenExitLine size={20} /> : <RiFullscreenLine size={20} />}
			</button>
		</Tooltip>
	);
}
