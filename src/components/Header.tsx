"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line, RiCloseLargeLine, RiRainyFill, RiVolumeDownFill } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { FullscreenButton } from "./ui/FullscreenButton";
import { usePathname } from "next/navigation";
import { useRainMixer } from "@/utils/useRainMixer";
import RainMixerDropdown from "./RainMixerDropdown";
import { useGlobalKeys } from "@/utils/useGlobalKeys";
import Tooltip from "./ui/Tooltip";
import RainMixerMobile from "./RainMixerMobile";
import { useMediaQuery } from "@/utils/useMediaQuery";

export default function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	const [openMixer, setOpenMixer] = useState(false);

	// RAIN AUDIO LIVES HERE
	const rain = useRainMixer();

	const pathname = usePathname();
	const isDesktop = useMediaQuery("(min-width: 640px)");

	// PLAY / PAUSE RAIN
	useGlobalKeys(
		"p",
		() => {
			if (!isDesktop) return;
			rain.togglePlay();
		},
		{ ignoreInputs: true },
	);
	// OPEN RAIN MIXER
	useGlobalKeys(
		"r",
		() => {
			if (!isDesktop) return;
			setOpenMixer((prev) => !prev);
		},
		{ ignoreInputs: true },
	);

	return (
		<header className="px-4 gap-2 flex justify-between items-center relative">
			<Link href="/" aria-label="Go to homepage">
				<Image src="/images/rainstormlogo.svg" alt="" width={120} height={167} aria-hidden="true" />
				<span className="sr-only">Rainstorm</span>
			</Link>

			{/* DESKTOP */}
			<nav
				aria-label="Main navigation"
				className="hidden sm:flex gap-[clamp(16px,4vw,50px)] font-bold justify-center items-center relative"
			>
				{[
					{ href: "/ideas", label: "Ideas" },
					{ href: "/words", label: "Words" },
					{ href: "/templates", label: "Templates" },
					{ href: "/about", label: "About" },
				].map(({ href, label }) => {
					const active = pathname === href;

					return (
						<Link
							key={href}
							href={href}
							className={`relative font-normal text-sm uppercase ${
								active ? "text-rain-100" : "text-rain-200 hover:text-rain-100"
							}`}
						>
							{label}

							{active && (
								<motion.span
									layoutId="nav-underline"
									className="absolute left-0 bottom-0 h-0.5 w-full bg-rain-500"
									transition={{
										type: "spring",
										stiffness: 500,
										damping: 30,
									}}
								/>
							)}
						</Link>
					);
				})}

				{/* RAIN MIXER */}
				<div className="flex gap-2">
					<div className="relative">
						<Tooltip text="Toggle Rain Mixer [R]" position="bottomright">
							<button
								className={`btn--icon ${rain.playing ? "rain-blink" : "text-rain-400 hover:text-rain-200"}`}
								onClick={() => setOpenMixer((p) => !p)}
								aria-label="Toggle Rain Mixer"
								aria-pressed={openMixer}
								aria-keyshortcuts="R"
							>
								{rain.playing ? <RiRainyFill aria-hidden /> : <RiVolumeDownFill aria-hidden />}
							</button>
						</Tooltip>
						<AnimatePresence>
							{openMixer && <RainMixerDropdown rain={rain} onClose={() => setOpenMixer(false)} />}
						</AnimatePresence>
					</div>

					<FullscreenButton />
				</div>
			</nav>

			{/* MOBILE BUTTON */}
			{!openMenu && (
				<div className="sm:hidden absolute top-1.5 right-3">
					<button
						onClick={() => setOpenMenu((p) => !p)}
						className="btn--icon"
						aria-label="Toggle menu"
						aria-expanded={openMenu}
						aria-controls="mobile-menu"
					>
						<RiMenu3Line aria-hidden />
					</button>
				</div>
			)}

			{/* MOBILE MENU */}
			<AnimatePresence>
				{openMenu && (
					<>
						{/* OVERLAY*/}
						<motion.div
							key="overlay"
							aria-hidden="true"
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 bg-black z-5"
							onClick={() => setOpenMenu(false)}
						/>

						<motion.div
							key="menu"
							id="mobile-menu"
							role="dialog"
							aria-modal="true"
							aria-label="Mobile navigation"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="fixed top-0 right-0 h-dvh w-[60vw] bg-rain-800 flex flex-col justify-center items-center gap-4 p-4 z-10"
						>
							{/* BUTTON */}
							<div className="absolute top-1.5 right-3 z-50">
								<button
									onClick={() => setOpenMenu((p) => !p)}
									className="btn--icon"
									aria-label="Toggle menu"
								>
									{openMenu ? <RiCloseLargeLine aria-hidden /> : <RiMenu3Line />}
								</button>
							</div>
							<div className="flex flex-col gap-2">
								<Link href="/" onClick={() => setOpenMenu(false)}>
									<Image
										className="mb-2"
										src="/images/rainstormlogo.svg"
										alt=""
										aria-hidden="true"
										width={120}
										height={167}
									/>
									<span className="sr-only">Rainstorm</span>
								</Link>
								<Link
									href="/ideas"
									onClick={() => setOpenMenu(false)}
									className={`uppercase text-lg font-bold ${pathname === "/ideas" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									Ideas
								</Link>
								<Link
									href="/words"
									onClick={() => setOpenMenu(false)}
									className={` uppercase text-lg font-bold ${pathname === "/words" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									Words
								</Link>
								<Link
									href="/templates"
									onClick={() => setOpenMenu(false)}
									className={`uppercase text-lg font-bold ${pathname === "/templates" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									Templates
								</Link>
								<Link
									href="/about"
									onClick={() => setOpenMenu(false)}
									className={`uppercase text-lg font-bold ${pathname === "/about" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									About
								</Link>

								{/* RAIN MIXER MOBILE*/}
								<RainMixerMobile rain={rain} />
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
