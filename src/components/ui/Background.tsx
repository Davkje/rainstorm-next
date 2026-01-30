"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { DitheredParticles } from "../DitheredParticles";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Background() {
	const pathname = usePathname();
	const shouldReduceMotion = useReducedMotion();

	let opacity = 0.1;
	if (pathname === "/") opacity = 0.4;
	if (pathname.startsWith("/ideas/")) opacity = 0.03;

	const showParticles = !shouldReduceMotion && pathname === "/";

	return (
		<div className="relative col-start-1 row-start-1 w-full h-screen overflow-hidden">
			<AnimatePresence>
				{showParticles && (
					<motion.div
						className="absolute inset-0"
						initial={{ opacity: 0 }}
						animate={{ opacity }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						style={{ pointerEvents: "none" }}
					>
						<DitheredParticles />
					</motion.div>
				)}
			</AnimatePresence>

			<Image
				src="/images/image7.svg"
				alt="background"
				fill
				priority
				className="object-cover mix-blend-color-dodge transition-opacity duration-1000 ease-in-out"
				style={{ opacity }}
			/>

			{/* OVERLAYS */}
			<div className="absolute inset-0 bg-linear-to-b from-rain-800 to-transparent h-50" />
			<div className="absolute inset-0 bg-linear-to-b from-transparent to-rain-800" />
		</div>
	);
}
