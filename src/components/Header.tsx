"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line, RiCloseLargeLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { FullscreenButton } from "./ui/FullscreenButton";
import { usePathname } from "next/navigation";

export default function Header() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const linkClass = (href: string) =>
		pathname === href
			? "text-rain-100 border-b-2 border-rain-400"
			: "text-rain-400 hover:text-rain-200 transition-colors";

	return (
		<header className="bg-rain-800 px-4 gap-2 flex justify-between items-center relative">
			<Link href="/">
				<Image src="/rainstorm.png" alt="rainstorm" width={150} height={167} />
			</Link>

			{/* DESKTOP */}
			<nav className="hidden sm:flex gap-6 uppercase font-bold justify-center items-center relative">
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
							className={`relative px-1 ${
								active ? "text-rain-200" : "text-rain-300/80 hover:text-rain-300"
							}`}
						>
							{label}

							{active && (
								<motion.span
									layoutId="nav-underline"
									className="absolute left-0 -bottom-1 h-0.5 w-full bg-rain-300 rounded"
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

				<FullscreenButton />
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

							<div className="flex flex-col gap-2">
								<Image
									className="mb-2"
									src="/rainstorm.png"
									alt="rainstorm"
									width={120}
									height={167}
								/>
								<Link
									href="/ideas"
									onClick={() => setOpen(false)}
									className={`text-xl ${pathname === "/ideas" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									Ideas
								</Link>

								<Link
									href="/words"
									onClick={() => setOpen(false)}
									className={`text-xl ${pathname === "/words" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									Words
								</Link>
								<Link
									href="/templates"
									onClick={() => setOpen(false)}
									className={`text-xl ${pathname === "/templates" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									Templates
								</Link>
								<Link
									href="/about"
									onClick={() => setOpen(false)}
									className={`text-xl ${pathname === "/about" ? "text-rain-200 leading-normal border-b-2 border-rain-200" : "text-rain-300/80"}`}
								>
									About
								</Link>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
