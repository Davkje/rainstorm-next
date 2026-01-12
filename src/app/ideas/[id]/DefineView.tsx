"use client";

import { Idea, Category } from "@/models/ideas";
import EditableText from "@/components/EditableText";
import { RiCloseFill } from "@remixicon/react";

type Props = {
	idea: Idea;
	setIdea: React.Dispatch<React.SetStateAction<Idea | null>>;
	onAddCategory: () => void;
	onRemoveCategory: (id: string) => void;
};

export default function DefineView({ idea, setIdea, onAddCategory, onRemoveCategory }: Props) {
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

	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="grid h-full gap-4">
				{idea.categories.map((cat) => (
					<div key={cat.id} className="flex flex-col">
						<div className="flex justify-between">
							<EditableText
								text={cat.name}
								className="text-xl font-bold leading-normal inline-block"
								tag="h2"
								onChange={(v) => updateCategoryName(cat.id, v)}
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
						{cat.words.length > 0 && (
							<p className="capitalize text-lg text-gray-300 mb-2">{cat.words.join(", ")}</p>
						)}
						<textarea
							className="text-lg flex grow border-2 border-rain-600 rounded-lg resize-none px-2 placeholder-rain-600"
							value={cat.text}
							name={`${cat.name}-text-field`}
							onChange={(e) => updateCategoryText(cat.id, e.target.value)}
							rows={3}
							placeholder={`${cat.words.join(", ")}...`}
						/>
					</div>
				))}
			</div>
			<button
				onClick={onAddCategory}
				className="p-2 text-lg text-rain-400 border-2 rounded-xl text-center"
			>
				+ Add category
			</button>
		</div>
	);
}
