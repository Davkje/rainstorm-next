"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "@remixicon/react";

import {
	loadIdeas,
	saveIdeas,
	loadTemplates,
	createIdeaFromTemplate,
	removeIdea,
} from "@/helpers/storage";

import { Idea } from "@/models/ideas";
import { Template } from "@/models/templates";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function IdeasPage() {
	const router = useRouter();
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const [templates] = useState(loadTemplates());
	const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);

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

	const confirmRemoveIdea = (ideaId: string) => {
		removeIdea(ideaId);
		setIdeas(loadIdeas());
		setIdeaToDelete(null);
	};

	return (
		<div>
			<h1>Ideas</h1>

			<div className="mb-6">
				<h2 className="mb-2">Create New Idea</h2>
				<div className="flex gap-2 flex-wrap">
					{templates.map((t) => (
						<button key={t.id} onClick={() => handleCreateIdea(t)} className="btn--primary">
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
						{ideas.map((idea) => (
							<li
								key={idea.id}
								className="flex justify-between border-2 border-rain-500 rounded p-2"
							>
								<button onClick={() => router.push(`/ideas/${idea.id}`)} className="btn--link">
									{idea.name}
								</button>
								<button onClick={() => setIdeaToDelete(idea)} className="btn--icon">
									<RiDeleteBinLine />
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
			<ConfirmModal
				open={!!ideaToDelete}
				title={`Delete "${ideaToDelete?.name}"`}
				description="All words, text, categories will be permanently deleted."
				confirmText="Delete"
				danger
				onCancel={() => setIdeaToDelete(null)}
				onConfirm={() => ideaToDelete && confirmRemoveIdea(ideaToDelete.id)}
			/>
		</div>
	);
}
