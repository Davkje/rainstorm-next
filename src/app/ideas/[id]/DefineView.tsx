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
					<div
						key={cat.id}
						className="flex flex-col grow border-2 gap-1 p-2 border-rain-600 rounded-lg bg-linear-to-b from-transparent to-rain-900/20"
					>
						<div className="flex justify-between relative">
							<EditableText
								text={cat.name}
								className="text-xl font-bold leading-normal"
								tag="h2"
								onChange={(v) => updateCategoryName(cat.id, v)}
								showEditButton
								editButtonSize={20}
							/>
							<button
								className="btn--icon p-1 text-rain-400 hover:text-rain-200 absolute top-0 right-0"
								onClick={() => {
									onRemoveCategory(cat.id);
								}}
							>
								<RiCloseFill />
							</button>
						</div>
						<div className="flex gap-1">
							{cat.words.map((word) => (
								<EditableText
									key={word}
									text={word}
									className="text-lg text-rain-300 font-bold leading-normal"
									tag="span"
									onChange={(v) => updateWord(cat.id, word, v)}
								></EditableText>
							))}
						</div>
						<textarea
							className="
								text-lg flex grow rounded-md resize-none px-1
								placeholder-rain-600 leading-normal min-h-32
								bg-transparent
								focus:bg-rain-500/0
								focus:outline-none
								focus:ring-0
								focus:ring-offset-0
							"
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
