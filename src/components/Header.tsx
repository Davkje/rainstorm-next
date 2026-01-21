"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line, RiCloseLargeLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header className="bg-rain-800 px-4 gap-2 flex justify-between items-center relative">
			<Link href="/">
				<Image src="/rainstorm.png" alt="rainstorm" width={150} height={167} />
			</Link>

			{/* DESKTOP */}
			<nav className="hidden sm:flex gap-6 uppercase font-bold">
				<Link href="/ideas">Ideas</Link>
				<Link href="/words">Words</Link>
				<Link href="/templates">Templates</Link>
				<Link href="/about">About</Link>
			</nav>

			{/* MOBILE */}

			{/* BUTTON */}
			{!open && (
				<div className="sm:hidden absolute top-1.5 right-3">
					<button onClick={() => setOpen((p) => !p)} className="btn--icon" aria-label="Toggle menu">
						<RiMenu3Line />
					</button>
				</div>
			)}

			{/* MENU */}
			<AnimatePresence>
				{open && (
					<>
						{/* OVERLAY*/}
						<motion.div
							key="overlay"
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 bg-black z-5"
							onClick={() => setOpen(false)}
						/>

						<motion.div
							key="menu"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="fixed top-0 right-0 h-dvh w-[60vw] bg-rain-800 flex flex-col justify-center items-center gap-4 p-4 z-10"
						>
							{/* BUTTON */}
							<div className="absolute top-1.5 right-3 z-50">
								<button
									onClick={() => setOpen((p) => !p)}
									className="btn--icon"
									aria-label="Toggle menu"
								>
									{open ? <RiCloseLargeLine /> : <RiMenu3Line />}
								</button>
							</div>

							<Image
								src="/rainstorm.png"
								alt="rainstorm"
								width={150}
								height={167}
								className="mb-8"
							/>
							<Link href="/ideas" onClick={() => setOpen(false)} className="text-2xl text-rain-200">
								Ideas
							</Link>
							<Link href="/words" onClick={() => setOpen(false)} className="text-2xl">
								Words
							</Link>
							<Link href="/templates" onClick={() => setOpen(false)} className="text-2xl">
								Templates
							</Link>
							<Link href="/about" onClick={() => setOpen(false)} className="text-2xl">
								About
							</Link>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
