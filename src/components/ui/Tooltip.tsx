import { ReactNode, useState, useRef } from "react";

type TooltipProps = {
	text: string;
	children: ReactNode;
	position?:
		| "top"
		| "topright"
		| "topleft"
		| "bottom"
		| "bottomleft"
		| "bottomright"
		| "left"
		| "right";
};

export default function Tooltip({ text, children, position = "top" }: TooltipProps) {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const posClass = {
		top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
		topright: "bottom-full mb-4 -right-2",
		topleft: "bottom-full mb-4 -left-2",
		bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
		left: "right-full mr-2 top-1/2 -translate-y-1/2",
		right: "left-full ml-2 top-1/2 -translate-y-1/2",
		bottomright: "top-full mb-4 -right-2",
		bottomleft: "top-full mb-4 -left-2",
	};

	const handleMouseEnter = () => {
		timeoutRef.current = setTimeout(() => {
			setVisible(true);
		}, 1000);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setVisible(false);
	};

	return (
		<div
			className="relative flex justify-center items-center cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			<div
				className={`
          absolute whitespace-nowrap
          ${posClass[position]}
          bg-rain-600 text-rain-200 text-md tracking-wide font-normal normal-case px-4 py-1 rounded-md
          opacity-${visible ? "100" : "0"} transition-opacity duration-300
          pointer-events-none
          z-50 shadow-lg shadow-black/30
        `}
			>
				{text}
			</div>
		</div>
	);
}
