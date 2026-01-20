"use client";

import { Idea, Category } from "@/models/ideas";
import EditableText from "@/components/EditableText";
import { RiCloseFill } from "@remixicon/react";
import { Word } from "@/models/wordBanks";

type Props = {
	idea: Idea;
	setIdea: React.Dispatch<React.SetStateAction<Idea | null>>;
	onRemoveCategory: (id: string) => void;
	onAddCategory: () => void;
};

export default function DefineView({ idea, setIdea, onRemoveCategory, onAddCategory }: Props) {
	const updateCategoryText = (catId: Category["id"], newText: string) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((c) => (c.id === catId ? { ...c, text: newText } : c)),
				updatedAt: Date.now(),
			};
		});
	};

	const updateCategoryName = (catId: Category["id"], newName: string) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((c) => (c.id === catId ? { ...c, name: newName } : c)),
				updatedAt: Date.now(),
			};
		});
	};

	const updateWord = (catId: Category["id"], oldWord: Word, newWord: Word) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((cat) => {
					if (cat.id !== catId) return cat;

					const clean = newWord.trim();
					if (!clean) return cat;

					if (cat.words.includes(newWord)) return cat;

					return {
						...cat,
						words: cat.words.map((w) => (w === oldWord ? newWord : w)),
					};
				}),
				updatedAt: Date.now(),
			};
		});
	};

	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex flex-col h-full gap-4">
				{idea.categories.length === 0 && (
					<div className="flex flex-col text-center grow justify-center items-center text-rain-400">
						<span className="text-xl">No categoires</span>
						<button onClick={() => onAddCategory()} className="btn--primary text-xl">
							Add new category
						</button>
					</div>
				)}
				{idea.categories.map((cat) => (
					<div key={cat.id} className="flex flex-col grow">
						<div className="flex justify-between">
							<EditableText
								text={cat.name}
								className="text-xl font-bold leading-normal"
								tag="h2"
								onChange={(v) => updateCategoryName(cat.id, v)}
								showEditButton
								editButtonSize={20}
							/>
							<button
								onClick={() => {
									onRemoveCategory(cat.id);
								}}
								className="btn--icon p-0 text-rain-500 hover:text-rain-300"
							>
								<RiCloseFill />
							</button>
						</div>
						<div className="flex gap-1 py-2">
							{cat.words.map((word) => (
								<EditableText
									key={word}
									text={word}
									className="text-lg text-rain-400 font-bold leading-normal"
									tag="span"
									onChange={(v) => updateWord(cat.id, word, v)}
								></EditableText>
							))}
						</div>
						<textarea
							className="text-lg flex grow border-2 border-rain-600 rounded-lg resize-none p-2 placeholder-rain-600 leading-normal min-h-24"
							value={cat.text}
							name={`${cat.name}-text-field`}
							onChange={(e) => updateCategoryText(cat.id, e.target.value)}
							rows={1}
							placeholder={`${cat.words.join(", ")}...`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
