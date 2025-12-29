"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loadIdeas, saveIdeas, loadTemplates, createIdeaFromTemplate } from "@/helpers/storage";

import { Idea } from "@/models/ideas";

export default function IdeasPage() {
	const router = useRouter();
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const [templates] = useState(loadTemplates());

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIdeas(loadIdeas());
		}, 0);

		return () => clearTimeout(timeout);
	}, []);

	const handleCreateIdea = (template: any) => {
		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();

		saveIdeas([...allIdeas, idea]);

		router.push(`/ideas/${idea.id}`);
	};

	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-4">Ideas</h1>

			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Create New Idea</h2>
				<div className="flex gap-2 flex-wrap">
					{templates.map((t) => (
						<button
							key={t.id}
							onClick={() => handleCreateIdea(t)}
							className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-600"
						>
							{t.name}
						</button>
					))}
				</div>
			</div>

			<div>
				<h2 className="text-xl font-semibold mb-2">Existing Ideas</h2>
				{ideas.length === 0 ? (
					<p>No ideas yet.</p>
				) : (
					<ul className="list-disc pl-5">
						{ideas.map((i) => (
							<li key={i.id}>
								<button
									onClick={() => router.push(`/ideas/${i.id}`)}
									className="text-blue-600 hover:underline"
								>
									{i.name}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
