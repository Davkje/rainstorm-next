"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { loadTemplates } from "@/helpers/storage";
import { Template } from "@/models/templates";
import Link from "next/link";
import { easeInOut, easeOut, motion } from "framer-motion";
import CTAButtons from "@/components/ui/CTAButtons";

export default function Home() {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [emptyTemplate, setEmptyTemplate] = useState<Template | undefined>(undefined);

	useEffect(() => {
		const loaded = loadTemplates();
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTemplates(loaded);
		setEmptyTemplate(loaded.find((t) => t.name === "Empty"));
	}, []);

	return (
		<>
			<div className="h-full flex flex-col items-center justify-center gap-10">
				<motion.section
					initial={{ opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						opacity: { duration: 1.2, ease: easeOut },
						scale: { duration: 4, ease: [0.16, 1, 0.3, 1] },
					}}
					className="h-screen grid place-content-center gap-8 text-center"
				>
					<div className="flex flex-col gap-8 justify-center items-center">
						<Image className="px-8" src="/rainstorm.png" alt="rainstorm" width={900} height={200} />
						<p className="leading-normal text-rain-200 italic text-lg sm:text-lg">
							The one word, limiting, focused idea tool
						</p>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							delay: 0.4,
							duration: 1.6,
							ease: easeInOut,
						}}
						className="flex flex-col items-center justify-center gap-4"
					>
						<h2 className="leading-normal text-xl sm:text-xl text-rain-200">
							What do you want to create?
						</h2>
						{templates.length > 0 && <CTAButtons templates={templates} />}
						<div className="grid gap-2">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									delay: 3,
									duration: 2,
									ease: easeOut,
								}}
							>
								<Link
									href="/templates"
									className="text-lg place-self-center text-rain-400/50 hover:text-rain-200"
								>
									See all Templates
								</Link>
							</motion.div>
						</div>
					</motion.div>
				</motion.section>
				<section className="min-h-screen flex flex-col place-items-center gap-30 text-center max-w-[1000px]">
					<div>
						<h2 className="text-2xl mb-4 uppercase tracking-wide">One drop, endless ripples</h2>
						<p className="p-2 leading-snug place-self-center">
							RainStorm is a creative tool that helps you quickly shape and define ideas. With a
							simple word generator, customizable templates and a drag-and-drop system, it adds just
							enough constraint while leaving freedom in how you use it.
						</p>
					</div>
					<h2 className="text-2xl uppercase">How to use it?</h2>
					<div className="grid grid-cols-2 gap-4 px-4">
						<div className="bg-red-600/ place-content-center text-left">
							<h3 className="text-2xl uppercase font-normal">Pick a Template</h3>
							<p className="p-2 leading-snug font-light">
								Start with structure or a blank canvas. You can always change things as you go.
							</p>
						</div>
						<Image
							src="pickTemplate.svg"
							width={400}
							height={300}
							alt="Templates"
							className="place-self-center"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 px-4">
						<Image
							src="/dragTutorial.svg"
							width={400}
							height={300}
							alt="Drag and drop"
							className="place-self-start"
						/>
						<div className="place-content-center text-left">
							<h3 className="text-2xl uppercase font-normal">Ideate</h3>
							<p className="p-2 leading-snug font-light">
								Generate words and drag them into sections. Use the first word, or keep rolling
								until it sparks an idea.
							</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 px-4">
						<div className="bg-red-600/ place-content-center text-left">
							<h3 className="text-2xl uppercase font-normal">Define</h3>
							<p className="p-2 leading-snug font-light">
								What do come up with with only a word and a category? Write short notes and clarify
								what your ideas mean to you.
							</p>
						</div>
						<Image
							src="definetutorial.svg"
							width={400}
							height={300}
							alt="Templates"
							className="place-self-start"
						/>
					</div>
					<div className="grid gap-4 px-4">
						<div className="place-content-center text-left">
							<h3 className="text-2xl uppercase font-normal">Continue your journey</h3>
							<p className="p-2 leading-snug font-light">Export your idea and take it further!</p>
						</div>
						<Image
							src="exportimage.svg"
							width={300}
							height={300}
							alt="Templates"
							className="place-self-center"
						/>
					</div>

					<div>
						<h3 className="text-xl">Try Rainstorm</h3>
						{/* <button
							className="btn--primary uppercase text-lg sm:text-md font-bold hover:scale-[1.1] transition-all duration-500 ease-in-out"
							onClick={() => {
								handleCreateIdea(emptyTemplate);
							}}
						>
							Create Idea
						</button> */}
					</div>
				</section>
				<footer className="grid place-items-center p-4 gap-2">
					<Image className="px-8" src="/rainstorm.png" alt="rainstorm" width={200} height={100} />
					<p className="text-rain-500">By David</p>
				</footer>
			</div>
		</>
	);
}
