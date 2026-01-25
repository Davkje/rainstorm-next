"use client";

import { useEffect, useState } from "react";
import { Template } from "@/models/templates";
import { loadTemplates } from "@/helpers/storage";
import { createIdeaFromTemplate, saveIdeas, loadIdeas } from "@/helpers/storage";
import { useRouter } from "next/navigation";
import { RiArrowDownSFill } from "@remixicon/react";

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
	const handleCreateIdea = (template: Template) => {
		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();
		saveIdeas([...allIdeas, idea]);
		router.push(`/ideas/${idea.id}`);
	};

	return (
		<div className="flex flex-col items-center text-center tracking-wide">
			<h1 className="text-3xl font-bold uppercase">Templates</h1>
			<p className="text-md font-light leading-snug tracking-wide text-rain-300 mb-6 max-w-[600px]">
				Here are all your templates. Click a template to expand and view details or create a new
				idea from it.
			</p>

			{templates.length === 0 ? (
				<p className="text-rain-500">No templates yet.</p>
			) : (
				<ul className="grid gap-4 w-full max-w-[800px]">
					{templates.map((t) => {
						const isOpen = openId === t.id;

						return (
							<li key={t.id} className="rounded-lg overflow-hidden bg-rain-600">
								<div
									className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-rain-500 transition"
									onClick={() => toggleExpand(t.id)}
								>
									<div className="flex items-center gap-2">
										<h3 className="font-semibold">{t.name}</h3>
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleExpand(t.id);
											}}
											className="btn--icon"
										>
											<RiArrowDownSFill
												className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
											/>
										</button>
									</div>

									<button
										onClick={(e) => {
											e.stopPropagation();
											handleCreateIdea(t);
										}}
										className="btn--tertiary px-4 py-1"
									>
										Create
									</button>
								</div>

								{isOpen && (
									<div className="bg-rain-700 p-4 text-left space-y-3">
										<div>
											<h3 className="font-semibold text-rain-200">Categories</h3>
											<div className="flex gap-2 flex-wrap place-content-center">
												{t.categories.map((cat) => (
													<span key={cat.id} className="text-rain-100 text-xl">
														{cat.name}
													</span>
												))}
											</div>
										</div>

										<div>
											<h3 className="font-semibold text-rain-200">Banks</h3>
											<div className="flex gap-8 flex-wrap place-content-center">
												{t.activeBanks?.map((bank) => (
													<span key={bank} className="text-lg capitalize">
														{bank}
													</span>
												))}
											</div>
										</div>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
