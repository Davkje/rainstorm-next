"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { Category, Idea } from "@/models/ideas";
import { loadIdeas, saveIdeas } from "@/helpers/storage";
import { useAutosave } from "@/utils/useAutoSave";

import DefineView from "./DefineView";
import IdeateView from "./IdeateView";
import EditableText from "@/components/EditableText";
import CopyDropdown from "@/components/CopyDropdown";
import DownloadDropdown from "@/components/DownloadDropdown";
import { createCategory } from "@/utils/createCategory";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { RiAddBoxLine, RiPencilFill, RiQuestionLine, RiRainyFill } from "@remixicon/react";
import { useGlobalKeys } from "@/utils/useGlobalKeys";
import HelpOverlay from "@/components/HelpOverlay";

interface IdeaPageProps {
	params: Promise<{ id: string }>;
}

export default function IdeaPage({ params }: IdeaPageProps) {
	const { id } = React.use(params);

	const [idea, setIdea] = useState<Idea | null>(null);
	const categories = React.useMemo(() => idea?.categories ?? [], [idea]);
	type View = "ideate" | "define";
	const [view, setView] = useState<View>("ideate");
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
	const [showHelp, setShowHelp] = useState(false);
	const [showDefineHint, setShowDefineHint] = useState(false);

	/* -------------------- AUTO SAVE -------------------- */
	const saveStatus = useAutosave<Idea>(
		idea,
		(updated) => {
			const allIdeas = loadIdeas();
			saveIdeas(allIdeas.map((i) => (i.id === updated.id ? updated : i)));
		},
		800
	);

	/* -------------------- LOAD IDEA -------------------- */
	useEffect(() => {
		const allIdeas = loadIdeas();
		const found = allIdeas.find((i) => i.id === id);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (found) setIdea(found);
	}, [id]);

	/* -------------------- DEFINE HINT -------------------- */
	useEffect(() => {
		if (!categories.length) return;
		const allHaveWords = categories.every((cat) => cat.words.length > 0);
		const totalWords = categories.reduce((sum, cat) => sum + cat.words.length, 0);

		if (allHaveWords && totalWords >= 6) {
			const showTimer = setTimeout(() => setShowDefineHint(true), 0);
			const hideTimer = setTimeout(() => setShowDefineHint(false), 3000);
			return () => {
				clearTimeout(showTimer);
				clearTimeout(hideTimer);
			};
		}
	}, [categories]);

	/* -------------------- GLOBAL KEYS -------------------- */
	useGlobalKeys(
		"v",
		() => {
			setView((prev) => (prev === "ideate" ? "define" : "ideate"));
		},
		{
			ignoreInputs: true,
		}
	);
	useGlobalKeys(
		"d",
		() => {
			setView("define");
		},
		{
			ignoreInputs: true,
		}
	);
	useGlobalKeys(
		"h",
		() => {
			setShowHelp((prev) => !prev);
		},
		{ ignoreInputs: true }
	);
	useGlobalKeys("Escape", () => setShowHelp(false));

	if (!idea) return <h1 className="w-full text-xl font-bold">Loading...</h1>;

	const addCategory = () => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: [...prev.categories, createCategory()],
				updatedAt: Date.now(),
			};
		});
	};

	const removeCategory = (categoryId: string) => {
		const category = idea.categories.find((c) => c.id === categoryId);
		if (!category) return;

		setCategoryToDelete(category);
	};

	const confirmRemoveCategory = (categoryId: string) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.filter((cat) => cat.id !== categoryId),
				updatedAt: Date.now(),
			};
		});

		setCategoryToDelete(null);
	};

	return (
		<div className="grid grid-rows-[auto_1fr] h-full">
			{/* HEADER */}
			<div className="flex justify-between items-center mb-2">
				<div className="flex gap-2 justify-center items-center">
					<EditableText
						text={idea.name}
						tag="h1"
						className="text-2xl font-bold leading-9"
						onChange={(newName) =>
							setIdea((prev) => (prev ? { ...prev, name: newName, updatedAt: Date.now() } : prev))
						}
					/>
					<button onClick={addCategory} className={`btn--icon`}>
						<RiAddBoxLine />
					</button>
					<button onClick={() => setShowHelp((prev) => !prev)} className={`btn--icon`}>
						<RiQuestionLine />
					</button>
					<CopyDropdown idea={idea} />
					<DownloadDropdown idea={idea} />
					<span
						className={`text-md text-rain-400 font-bold transition-colors duration-400 ease-out ${
							saveStatus === "saving" ? "text-rain-400" : "text-transparent"
						}`}
					>
						Saving...
						{/* {saveStatus === "saving" && "Saving…"}
						{saveStatus === "saved" && ""} */}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-3 bg-rain-600 p-2 rounded-lg relative">
						<button
							onClick={() => setView("ideate")}
							className={`btn--link ${view === "ideate" ? "text-rain-100" : "text-rain-400"}`}
						>
							<RiRainyFill />
						</button>
						{showDefineHint && (
							<div
								className="
									absolute top-0 right-full mr-2 font-bold
									bg-rain-700 text-white w-[200px] text-md h-full flex justify-center items-center rounded shadow-lg
									anim-fade-in-out z-50"
							>
								Ready to Define?
							</div>
						)}
						<button
							onClick={() => setView("define")}
							className={`btn--link ${showDefineHint && "anim-blink"} ${
								view === "define" ? "text-rain-100" : "text-rain-500"
							}`}
						>
							<RiPencilFill />
						</button>
					</div>
				</div>
			</div>
			{/* VIEW */}
			{view === "define" ? (
				<DefineView
					idea={idea}
					setIdea={setIdea}
					onRemoveCategory={removeCategory}
					onAddCategory={addCategory}
				/>
			) : (
				<IdeateView
					idea={idea}
					setIdea={setIdea}
					onRemoveCategory={removeCategory}
					onAddCategory={addCategory}
				/>
			)}
			<ConfirmModal
				open={!!categoryToDelete}
				title={`Delete "${categoryToDelete?.name}"`}
				description={
					categoryToDelete &&
					(categoryToDelete.text.trim().length > 0 || categoryToDelete.words.length > 0)
						? "This category is not empty. All text and words will be permanently deleted."
						: "This action cannot be undone."
				}
				confirmText="Delete"
				cancelText="Cancel"
				danger
				onCancel={() => setCategoryToDelete(null)}
				onConfirm={() => categoryToDelete && confirmRemoveCategory(categoryToDelete.id)}
			/>
			<HelpOverlay open={showHelp} onClose={() => setShowHelp(false)} />
		</div>
	);
}
