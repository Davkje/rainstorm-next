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
	removeAllIdeas,
} from "@/helpers/storage";

import { Idea } from "@/models/ideas";
import { Template } from "@/models/templates";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function IdeasPage() {
	const router = useRouter();
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const [templates] = useState(loadTemplates());
	const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);
	const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

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
		<div className="text-center">
			<h1>Ideas</h1>

			<div className="mb-6">
				<h2 className="mb-2">Create New Idea</h2>
				<div className="flex justify-center gap-2 flex-wrap">
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
			{ideas.length > 0 && (
				<button
					onClick={() => setConfirmDeleteAll(true)}
					className="btn--danger place-self-center mt-4 flex items-center gap-1"
					disabled={ideas.length === 0}
				>
					<RiDeleteBinLine />
					Delete all
				</button>
			)}
			<ConfirmModal
				open={confirmDeleteAll}
				title="Delete ALL ideas"
				description={`This will permanently delete ${ideas.length} ideas. This action cannot be undone.`}
				confirmText="Delete all"
				danger
				onCancel={() => setConfirmDeleteAll(false)}
				onConfirm={() => {
					removeAllIdeas();
					setIdeas([]);
					setConfirmDeleteAll(false);
				}}
			/>
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
