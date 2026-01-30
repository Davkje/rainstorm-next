"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useRef } from "react";

type AnimatedImageProps = Omit<ImageProps, "alt"> & {
	alt?: string;
	opacity?: number;
	parallax?: number;
	duration?: number;
	amount?: number;
	wrapperClassName?: string;
};

export default function AnimatedImage({
	alt = "",
	opacity = 0.15,
	parallax = 24,
	duration = 0.8,
	amount = 0.3,
	wrapperClassName,
	className,
	...imageProps
}: AnimatedImageProps) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// PARALAX
	const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

	// FADE OUT ON SCROLL
	const opacityValue = useTransform(
		scrollYProgress,
		[0, amount, 1 - amount, 1],
		[0, opacity, opacity, 0],
	);

	return (
		<motion.div
			ref={ref}
			className={`${wrapperClassName} bg-rain-800`}
			style={{ y, opacity: opacityValue }}
			transition={{ duration, ease: "easeOut" }}
		>
			<Image {...imageProps} alt={alt} className={className} />
		</motion.div>
	);
}
