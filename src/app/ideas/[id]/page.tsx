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
import {
	RiAddBoxLine,
	RiArrowDropRightFill,
	RiEdit2Fill,
	RiQuestionLine,
	RiThunderstormsFill,
} from "@remixicon/react";
import { useGlobalKeys } from "@/utils/useGlobalKeys";
import HelpOverlay from "@/components/HelpOverlay";
import { useOneTimeHint } from "@/utils/useOneTimeHint";
import { isCategoryEmpty } from "@/utils/IsCategoryEmpty";
import Tooltip from "@/components/ui/Tooltip";

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

	const allHaveWords = categories?.every((cat) => cat.words.length > 0);
	const allHaveSomeText = categories?.every((cat) => cat.text.length > 10);
	const totalWords = categories?.reduce((sum, cat) => sum + cat.words.length, 0);
	const totalText = categories?.reduce((sum, cat) => sum + cat.text.length, 0);

	/* -------------------- AUTO SAVE -------------------- */
	const saveStatus = useAutosave<Idea>(
		idea,
		(updated) => {
			const allIdeas = loadIdeas();
			saveIdeas(allIdeas.map((i) => (i.id === updated.id ? updated : i)));
		},
		800,
	);

	/* -------------------- LOAD IDEA -------------------- */
	useEffect(() => {
		const allIdeas = loadIdeas();
		const found = allIdeas.find((i) => i.id === id);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (found) setIdea(found);
	}, [id]);

	/* -------------------- HINTS -------------------- */

	const showExportHint = useOneTimeHint({
		when: allHaveWords && totalWords >= 3 && allHaveSomeText && totalText >= 25,
		duration: 6000,
	});

	const showDefineHint = useOneTimeHint({
		when: allHaveWords && totalWords >= 3 && view === "ideate",
		duration: 6000,
	});

	/* -------------------- GLOBAL KEYS -------------------- */
	// TOGGLE VIEW
	useGlobalKeys(
		"v",
		() => {
			setView((prev) => (prev === "ideate" ? "define" : "ideate"));
		},
		{
			ignoreInputs: true,
		},
	);
	// SHOW HELP
	useGlobalKeys(
		"h",
		() => {
			setShowHelp((prev) => !prev);
		},
		{ ignoreInputs: true },
	);
	// CLOSE HELP
	useGlobalKeys("Escape", () => setShowHelp(false));

	/* --------------------CATEGORIES -------------------- */

	const addCategory = () => {
		setIdea((prev) => {
			if (!prev) return prev;
			if (categories.length >= 5) return prev;

			return {
				...prev,
				categories: [...prev.categories, createCategory()],
				updatedAt: Date.now(),
			};
		});
	};

	const removeCategory = (categoryId: string) => {
		const category = idea?.categories.find((c) => c.id === categoryId);
		if (!category) return;

		// EMPTY = DELETE NOW
		if (isCategoryEmpty(category)) {
			setIdea((prev) => {
				if (!prev) return prev;

				return {
					...prev,
					categories: prev.categories.filter((c) => c.id !== categoryId),
					updatedAt: Date.now(),
				};
			});
			return;
		}

		// NOT EMPTY = MODAL
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

	if (!idea) return <h1 className="w-full text-xl font-bold">Loading...</h1>;

	return (
		<div className="grid grid-rows-[auto_1fr] gap-2 h-full">
			{/* HEADER */}
			<div className="grid sm:flex sm:justify-between gap-2 h-full w-full ">
				<div className="flex gap-2 justify-center items-center h-full">
					<EditableText
						text={idea.name}
						tag="h1"
						className="text-2xl leading-9 px-2"
						showEditButton
						editButtonSize={24}
						onChange={(newName) =>
							setIdea((prev) => (prev ? { ...prev, name: newName, updatedAt: Date.now() } : prev))
						}
					/>
					<span
						className={`hidden sm:flex ml-6 text-md font-bold transition-colors duration-400 ease-out ${
							saveStatus === "saving" ? "text-rain-400/30" : "text-transparent"
						}`}
					>
						Saving
					</span>
				</div>
				<div className="flex justify-between gap-3">
					<div className="flex gap-1 h-full">
						<Tooltip text="Help">
							<button onClick={() => setShowHelp((prev) => !prev)} className={`btn--icon`}>
								<RiQuestionLine className="" />
							</button>
						</Tooltip>
						<Tooltip text="Add new category">
							<button onClick={addCategory} className={`btn--icon`}>
								<RiAddBoxLine />
							</button>
						</Tooltip>
						<div className="relative flex gap-1 h-full justify-center items-center">
							{showExportHint && (
								<div className="absolute top-0 right-full h-full font-bold bg-rain-600 text-white w-max ml-2 pl-5 pr-2 text-md flex justify-center items-center rounded shadow-lg z-50 anim-fade-in-right upper">
									Ready to Export?
									<RiArrowDropRightFill size={32} />
								</div>
							)}
							<div className={`flex gap-1 ${showExportHint && "anim-blink"}`}>
								<Tooltip text="Copy Idea">
									<CopyDropdown idea={idea} />
								</Tooltip>
								<Tooltip text="Export Idea">
									<DownloadDropdown idea={idea} />
								</Tooltip>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3 bg-rain-600 p-2 rounded-lg relative">
						{showDefineHint && !showExportHint && (
							<div
								className="
										absolute top-0 right-6 mr-2 pl-5 pr-2 font-bold
										bg-rain-600 text-white w-max text-md h-full flex justify-center items-center rounded
										anim-fade-in-right z-50 uppercase"
							>
								Ready to Define? <RiArrowDropRightFill size={32} />
							</div>
						)}
						<Tooltip text="Ideate View">
							<button
								onClick={() => setView("ideate")}
								className={`btn--link ${view === "ideate" ? "text-rain-100" : "text-rain-400"}`}
							>
								<RiThunderstormsFill />
							</button>
						</Tooltip>
						<Tooltip text="Define View" position="topright">
							<button
								onClick={() => setView("define")}
								className={`btn--link ${showDefineHint && !showExportHint && "anim-blink"} ${
									view === "define" ? "text-rain-100" : "text-rain-500"
								}`}
							>
								<RiEdit2Fill />
							</button>
						</Tooltip>
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
					categoryToDelete && !isCategoryEmpty(categoryToDelete)
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
