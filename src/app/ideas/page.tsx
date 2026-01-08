"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loadIdeas, saveIdeas, loadTemplates, createIdeaFromTemplate } from "@/helpers/storage";

import { Idea } from "@/models/ideas";
import { Template } from "@/models/templates";

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

	const handleCreateIdea = (template: Template) => {
		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();

		saveIdeas([...allIdeas, idea]);

		router.push(`/ideas/${idea.id}`);
	};

	return (
		<div>
			<h1>Ideas</h1>

			<div className="mb-6">
				<h2 className="mb-2">Create New Idea</h2>
				<div className="flex gap-2 flex-wrap">
					{templates.map((t) => (
						<button key={t.id} onClick={() => handleCreateIdea(t)} className="button--primary">
							{t.name}
						</button>
					))}
				</div>
			</div>

			<div>
				<h2 className="mb-2">Existing Ideas</h2>
				{ideas.length === 0 ? (
					<p>No ideas yet.</p>
				) : (
					<ul className="grid gap-4">
						{ideas.map((i) => (
							<li key={i.id}>
								<button onClick={() => router.push(`/ideas/${i.id}`)} className="button--ghost">
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
