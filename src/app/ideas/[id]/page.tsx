"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Idea } from "@/lib/ideas";
import { loadIdeas, saveIdeas } from "@/helpers/storage";

interface IdeaPageProps {
	params: Promise<{ id: string }>;
}

export default function IdeaPage({ params }: IdeaPageProps) {
	const { id } = React.use(params);

	const router = useRouter();
	const [idea, setIdea] = useState<Idea | null>(null);

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

			const updated: Idea = {
				...prev,
				categories: prev.categories.map((c) => (c.id === catId ? { ...c, text: newText } : c)),
				updatedAt: Date.now(),
			};

			const allIdeas = loadIdeas();
			saveIdeas(allIdeas.map((i) => (i.id === updated.id ? updated : i)));

			return updated;
		});
	};

	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-4">{idea.name}</h1>

			{idea.categories.map((cat) => (
				<div key={cat.id} className="mb-4">
					<h2 className="font-semibold">{cat.name}</h2>
					<textarea
						className="w-full border rounded p-2 mt-1"
						value={cat.text}
						onChange={(e) => updateCategoryText(cat.id, e.target.value)}
						rows={4}
					/>
					{cat.words.length > 0 && <p className="text-sm mt-1">Wordbank: {cat.words.join(", ")}</p>}
				</div>
			))}

			<button
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
				onClick={() => router.push("/ideas")}
			>
				Back to Ideas
			</button>
		</div>
	);
}
