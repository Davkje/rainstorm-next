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
import { RiAddBoxLine } from "@remixicon/react";

interface IdeaPageProps {
	params: Promise<{ id: string }>;
}

export default function IdeaPage({ params }: IdeaPageProps) {
	const { id } = React.use(params);

	const [idea, setIdea] = useState<Idea | null>(null);
	const [view, setView] = useState<"define" | "ideate">("ideate");
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

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
				<EditableText
					text={idea.name}
					tag="h1"
					className="text-xl font-bold leading-9"
					onChange={(newName) =>
						setIdea((prev) => (prev ? { ...prev, name: newName, updatedAt: Date.now() } : prev))
					}
				/>
				<div className="flex items-center gap-3">
					{/* <span className="text-md text-rain-500">
						{saveStatus === "saving" && "Saving…"}
						{saveStatus === "saved" && ""}
					</span> */}
					<button onClick={addCategory} className={`btn--icon`}>
						<RiAddBoxLine />
					</button>
					<CopyDropdown idea={idea} />
					<DownloadDropdown idea={idea} />
					<div className="flex items-center gap-3 bg-rain-700 px-2 rounded-lg">
						<button
							onClick={() => setView("ideate")}
							className={`btn--link ${view === "ideate" ? "text-rain-100" : "text-rain-500"}`}
						>
							Ideate
						</button>
						<button
							onClick={() => setView("define")}
							className={`btn--link ${view === "define" ? "text-rain-100" : "text-rain-500"}`}
						>
							Define
						</button>
					</div>
				</div>
			</div>
			{/* VIEW */}
			{view === "define" ? (
				<DefineView idea={idea} setIdea={setIdea} onRemoveCategory={removeCategory} />
			) : (
				<IdeateView idea={idea} setIdea={setIdea} onRemoveCategory={removeCategory} />
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
		</div>
	);
}
