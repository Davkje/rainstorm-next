"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createIdeaFromTemplate, loadIdeas, loadTemplates, saveIdeas } from "@/helpers/storage";
import { Template } from "@/models/templates";
import Link from "next/link";
import { easeInOut, easeOut, motion } from "framer-motion";
import CTAButtons from "@/components/ui/CTAButtons";
import { useRouter } from "next/navigation";

export default function Home() {
	const [templates, setTemplates] = useState<Template[]>([]);
	const router = useRouter();

	// LOAD TEMPLATES FOR CTA
	useEffect(() => {
		const loaded = loadTemplates();
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTemplates(loaded);
	}, []);

	// CREATE IDEA
	const handleCreateIdea = (template?: Template) => {
		if (!template) return;

		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();

		saveIdeas([...allIdeas, idea]);
		router.push(`/ideas/${idea.id}`);
	};

	return (
		<>
			<div className="h-full flex flex-col items-center justify-center z-2 overflow-hidden">
				<motion.section
					initial={{ opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						opacity: { duration: 1.2, ease: easeOut },
						scale: { duration: 4, ease: [0.16, 1, 0.3, 1] },
					}}
					className="col-start-1 row-start-1 min-h-[90dvh] grid place-content-center gap-8 text-center z-5"
				>
					<div className="flex flex-col gap-6 justify-center items-center">
						<h1 aria-describedby="site-tagline" className="relative">
							<span className="absolute sr-only">Rainstorm</span>
							<Image
								className="px-8"
								aria-hidden="true"
								src="/images/rainstormlogo.svg"
								alt="Rainstorm Logo"
								priority
								width={450}
								height={200}
							/>
						</h1>
						<p className="leading-normal text-rain-300 italic text-lg sm:text-lg" id="site-tagline">
							The one word, creative writing ideation tool
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
						className="flex flex-col items-center justify-center gap-2"
					>
						<h2 className="leading-normal mb-4 text-xl sm:text-xl text-rain-300">
							What do you want to create?
						</h2>
						{templates.length > 0 && <CTAButtons templates={templates} />}

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
								className="text-lg place-self-center text-rain-300/50 hover:text-rain-200"
							>
								See all Templates
							</Link>
						</motion.div>
					</motion.div>
				</motion.section>

				<section className="min-h-screen flex flex-col place-items-center gap-8 sm:gap-16 text-center w-[clamp(200px,90vw,1000px)]">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{
							duration: 0.8,
							ease: easeOut,
						}}
						className="grid gap-2"
					>
						<h2 className="text-2xl uppercase tracking-wide">One drop, endless ripples</h2>
						<p className="p-2 leading-snug place-self-center italic max-w-250">
							Rainstorm is a creative writing tool that helps you quickly shape and define ideas.
							With a simple word generator, customizable templates and a drag-and-drop system, it
							adds just enough constraint while leaving freedom in how you use it.
						</p>
					</motion.div>
					<div className="grid gap-8 sm:gap-12">
						<h2 className="text-2xl uppercase">How to use it?</h2>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{
								duration: 0.8,
								ease: easeOut,
							}}
							className="grid sm:grid-cols-2 gap-8 sm:gap-12 px-4"
						>
							<div className="place-content-center text-left">
								<h3 className="text-2xl uppercase font-normal">Pick a Template</h3>
								<p className="p-2 leading-snug font-light">
									Start with structure or a blank canvas. You can always change things as you go.
								</p>
							</div>
							<Image
								src="images/pickTemplate.svg"
								width={400}
								height={300}
								alt="Templates"
								className="place-self-center sm:place-self-start w-[clamp(200px,40vw,400px)]"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{
								duration: 0.8,
								ease: easeOut,
							}}
							className="grid sm:grid-cols-2 gap-8 sm:gap-12 px-4"
						>
							<div className="place-content-center text-left sm:order-2">
								<h3 className="text-2xl uppercase font-normal">Ideate</h3>
								<p className="p-2 leading-snug text-xl font-light">
									Generate words and drag them into sections. Use the first word, or keep rolling
									until it sparks an idea.
								</p>
							</div>
							<Image
								className="place-self-center sm:place-self-start sm:order-1 w-[clamp(300px,40vw,400px)]"
								src="/images/dragTutorial.svg"
								width={400}
								height={300}
								alt="Drag and drop"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{
								duration: 0.8,
								ease: easeOut,
							}}
							className="grid sm:grid-cols-2 gap-8 sm:gap-12 px-4"
						>
							<div className="place-content-center text-left">
								<h3 className="text-2xl uppercase font-normal">Define</h3>
								<p className="p-2 leading-snug font-light">
									What do come up with with only a word and a category? Write short notes and
									clarify what your ideas mean to you.
								</p>
							</div>
							<Image
								src="/images/definetutorial.svg"
								width={400}
								height={300}
								alt="Templates"
								className="place-self-center sm:place-self-start w-[clamp(300px,40vw,400px)]"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{
								duration: 0.8,
								ease: easeOut,
							}}
							className="grid gap-4 px-4"
						>
							<div className="place-content-center text-center">
								<h3 className="text-2xl uppercase font-normal leading-normal mb-2">
									Continue your journey
								</h3>
								<p className="p-2 leading-snug font-light">Export your idea and take it further!</p>
							</div>
							<Image
								src="/images/exportimage.svg"
								width={300}
								height={300}
								alt="Templates"
								className="place-self-center w-[clamp(100px,40vw,200px)]"
							/>
						</motion.div>

						<div className="mt-20 z-10">
							<h3 className="text-lg uppercase font-light leading-normal mb-4">
								Now give it a try!
							</h3>
							<button
								className="btn--primary uppercase text-xl sm:text-2xl font-bold hover:scale-[1.1] transition-all duration-500 ease-in-out"
								onClick={() => {
									const defaultTemplate = templates[0];
									handleCreateIdea(defaultTemplate);
								}}
							>
								Create Idea
							</button>
						</div>
					</div>
				</section>
				<footer className="relative flex justify-between place-items-center px-4 sm:px-16 gap-2 pt-24 pb-12 w-full mt-12">
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						aria-label="Scroll to top"
						className="btn--icon p-0 w-16 sm:w-24 z-2 min-h-[20px] opacity-20 hover:opacity-40 transition-opacity"
					>
						<Image src="/images/rainstormlogo.svg" alt="Rainstorm logo" width={110} height={100} />
					</button>
					<a
						className="text-rain-100 font-normal text-md opacity-20 hover:opacity-40 transition-opacity z-2 w-16 sm:w-24 text-center"
						href="https://www.linkedin.com/in/david-kjellstrand-b6760113a/"
						target="_blank"
						rel="noreferrer"
					>
						By David
					</a>

					<a
						className="text-rain-100 font-normal text-md opacity-20 hover:opacity-40 transition-opacity z-2 w-16 sm:w-24 text-right"
						href="https://github.com/Davkje/rainstorm-next"
						target="_blank"
						rel="noreferrer"
					>
						Github
					</a>
					<div className="absolute bottom-0 left-0 bg-linear-to-b from-transparent to-rain-900 h-150 w-full"></div>
				</footer>
			</div>
		</>
	);
}
