"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Idea } from "@/models/ideas";
import { loadIdeas, saveIdeas } from "@/helpers/storage";
import { useAutosave } from "@/utils/useAutoSave";
import EditableText from "@/components/EditableText";

interface IdeaPageProps {
	params: Promise<{ id: string }>;
}

export default function IdeaPage({ params }: IdeaPageProps) {
	const { id } = React.use(params);

	const router = useRouter();
	const [idea, setIdea] = useState<Idea | null>(null);

	const saveStatus = useAutosave<Idea>(
		idea,
		(updated) => {
			const allIdeas = loadIdeas();
			saveIdeas(allIdeas.map((i) => (i.id === updated.id ? updated : i)));
		},
		800
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const allIdeas = loadIdeas();
			const found = allIdeas.find((i) => i.id === id);
			if (found) setIdea(found);
		}, 0);

		return () => clearTimeout(timeout);
	}, [id]);

	if (!idea) return <div>Loading...</div>;

	const updateCategoryText = (catId: string, newText: string) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((c) => (c.id === catId ? { ...c, text: newText } : c)),
				updatedAt: Date.now(),
			};
		});
	};

	return (
		<div>
			<EditableText
				text={idea.name}
				className="text-xl font-bold leading-normal"
				// tabindex="0"
				tag="h1"
				onChange={(newName) =>
					setIdea((prev) => (prev ? { ...prev, name: newName, updatedAt: Date.now() } : prev))
				}
			/>

			{idea.categories.map((cat) => (
				<div key={cat.id} className="mb-4">
					<EditableText
						text={cat.name}
						className="text-lg font-bold leading-normal"
						tag="h2"
						onChange={(newName) =>
							setIdea((prev) =>
								prev
									? {
											...prev,
											categories: prev.categories.map((c) =>
												c.id === cat.id ? { ...c, name: newName } : c
											),
											updatedAt: Date.now(),
									  }
									: prev
							)
						}
					/>
					<textarea
						className="text-lg w-full border-2 border-rain-600 rounded-lg p-2 mt-1 outline-0"
						value={cat.text}
						name={`${cat.name}-text-field`}
						onChange={(e) => updateCategoryText(cat.id, e.target.value)}
						rows={4}
					/>
				</div>
			))}

			<button className="button--primary" onClick={() => router.push("/ideas")}>
				Back to Ideas
			</button>
			<p className="text-md text-gray-500 py-2">
				{saveStatus === "saving" && "Saving…"}
				{saveStatus === "saved" && ""}
			</p>
		</div>
	);
}
