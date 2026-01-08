"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { Idea } from "@/models/ideas";
import { loadIdeas, saveIdeas } from "@/helpers/storage";
import { useAutosave } from "@/utils/useAutoSave";

import DefineView from "./DefineView";
import IdeateView from "./IdeateView";
import EditableText from "@/components/EditableText";
import CopyDropdown from "@/components/CopyDropdown";
import DownloadDropdown from "@/components/DownloadDropdown";

interface IdeaPageProps {
	params: Promise<{ id: string }>;
}

export default function IdeaPage({ params }: IdeaPageProps) {
	const { id } = React.use(params);

	const [idea, setIdea] = useState<Idea | null>(null);
	const [view, setView] = useState<"define" | "ideate">("ideate");

	const saveStatus = useAutosave<Idea>(
		idea,
		(updated) => {
			const allIdeas = loadIdeas();
			saveIdeas(allIdeas.map((i) => (i.id === updated.id ? updated : i)));
		},
		300
	);

	useEffect(() => {
		const allIdeas = loadIdeas();
		const found = allIdeas.find((i) => i.id === id);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (found) setIdea(found);
	}, [id]);

	if (!idea) return <div>Loading...</div>;

	return (
		<div className="grid grid-rows-[44px_1fr] h-full">
			{/* HEADER */}
			<div className="flex justify-between items-center mb-6">
				<EditableText
					text={idea.name}
					tag="h1"
					className="text-xl font-bold leading-normal inline-block"
					onChange={(newName) =>
						setIdea((prev) => (prev ? { ...prev, name: newName, updatedAt: Date.now() } : prev))
					}
				/>

				<div className="flex items-center gap-3">
					<span className="text-md text-rain-500">
						{saveStatus === "saving" && "Saving…"}
						{saveStatus === "saved" && ""}
					</span>
					<CopyDropdown idea={idea} />
					<DownloadDropdown idea={idea} />
					<p>|</p>
					<button
						onClick={() => setView("ideate")}
						className={`button--ghost ${view === "ideate" ? "text-slate-100" : "text-slate-800"}`}
					>
						Ideate
					</button>
					<button
						onClick={() => setView("define")}
						className={`button--ghost ${view === "define" ? "text-slate-100" : "text-slate-800"}`}
					>
						Define
					</button>
				</div>
			</div>
			{/* VIEW */}
			{view === "define" ? (
				<DefineView idea={idea} setIdea={setIdea} />
			) : (
				<IdeateView idea={idea} setIdea={setIdea} />
			)}
		</div>
	);
}
