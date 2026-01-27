"use client";

import { useEffect, useState } from "react";
import { Template } from "@/models/templates";
import { loadTemplates } from "@/helpers/storage";
import { createIdeaFromTemplate, saveIdeas, loadIdeas } from "@/helpers/storage";
import { useRouter } from "next/navigation";
import { RiArrowDownSFill } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";

export default function TemplatesPage() {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [openId, setOpenId] = useState<string | null>(null);

	const router = useRouter();

	// ------------- INIT -------------
	useEffect(() => {
		const timeout = setTimeout(() => setTemplates(loadTemplates()), 0);
		return () => clearTimeout(timeout);
	}, []);

	// ------------- EXPANDABLE -------------
	const toggleExpand = (id: string) => {
		setOpenId((prev) => (prev === id ? null : id));
	};

	// ------------- CREATE -------------
	const handleCreateIdea = (template: Template) => {
		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();
		saveIdeas([...allIdeas, idea]);
		router.push(`/ideas/${idea.id}`);
	};

	return (
		<div className="p-2 flex flex-col items-center text-center tracking-wide">
			<h1 className="text-2xl font-bold uppercase">Templates</h1>
			<p className="text-md font-normal leading-snug tracking-wide mb-6 max-w-[600px]">
				These templates starts you of with a few categoires and word banks. Click a template for
				more info or create a new idea directly.
			</p>

			{templates.length === 0 ? (
				<p className="text-rain-500">No templates yet.</p>
			) : (
				<ul className="grid gap-2 w-full max-w-[800px]">
					{templates.map((t) => {
						const isOpen = openId === t.id;

						return (
							<li key={t.id} className="overflow-hidden rounded-lg ">
								<div className="flex items-center justify-between px-2 hover:bg-rain-500/20 rounded-lg cursor-pointer transition">
									<div className="flex items-center gap-2 w-full">
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleExpand(t.id);
											}}
											className="btn--link w-full place-content-start pl-4 py-2 flex gap-2 place-items-center"
										>
											<h3 className="font-semibold">{t.name}</h3>
											<RiArrowDownSFill
												className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
											/>
										</button>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleCreateIdea(t);
										}}
										className="btn--primary border-transparent hover:border-rain-400 hover:bg-rain-800/80 px-4 py-0"
									>
										Create
									</button>
								</div>

								<div className={` w-full h-4`}></div>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{
												height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
												opacity: { duration: 0.2 },
											}}
											className="overflow-hidden"
										>
											<div className="bg-rain-750 rounded-lg border-2 border-rain-400 p-4 text-left space-y-3">
												{/* CONTENT */}
												<div className="grid">
													<h3 className="text-rain-200 leading-normal">Categories</h3>
													<div className="px-4 flex gap-x-8 flex-wrap">
														{t.categories.map((cat) => (
															<span key={cat.id} className="text-rain-300 text-lg">
																{cat.name}
															</span>
														))}
													</div>
												</div>

												<div className="grid">
													<h3 className="text-rain-200 leading-normal">Banks</h3>
													<div className="px-4 flex gap-x-8 flex-wrap font-normal text-rain-300">
														{t.activeBanks?.map((bank) => (
															<span key={bank} className="text-lg capitalize">
																{bank}
															</span>
														))}
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
