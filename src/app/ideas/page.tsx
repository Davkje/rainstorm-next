"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine, RiSearchLine } from "@remixicon/react";

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
import { formatDateOnly, formatRelativeTime } from "@/utils/formatDate";
import SortDropdown from "@/components/SortDropDown";

export default function IdeasPage() {
	const router = useRouter();
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const [templates] = useState(loadTemplates());
	const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);
	const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
	type SortOption = "latest" | "oldest" | "az" | "za";
	const [sortBy, setSortBy] = useState<SortOption>("latest");
	const [search, setSearch] = useState("");

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

	const filteredAndSortedIdeas = [...ideas]
		.filter((idea) => idea.name.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) => {
			switch (sortBy) {
				case "latest":
					return b.updatedAt - a.updatedAt;
				case "oldest":
					return a.updatedAt - b.updatedAt;
				case "az":
					return a.name.localeCompare(b.name);
				case "za":
					return b.name.localeCompare(a.name);
				default:
					return 0;
			}
		});

	return (
		<div className="flex flex-col place-items-center tracking-wide text-center">
			<h1 className="text-3xl font-bold uppercase">Ideas</h1>

			<div className="grid gap-2 max-w-[1200px]">
				<h2 className="text-xg sm:text-2xl">Create something new</h2>
				<p className="text-md font-light leading-snug tracking-wide text-rain-300 mb-2 max-w-200 place-self-center">
					Start creating by choosing one of our templates below. You can ofcourse customize them to
					fit your needs but they start you of with a few categories and wordbanks.
				</p>
				<div className="flex mt-2 justify-center gap-2 flex-wrap">
					{templates.map((t) => (
						<button
							key={t.id}
							onClick={() => handleCreateIdea(t)}
							className="btn--tertiary px-6 py-0"
						>
							{t.name}
						</button>
					))}
				</div>
			</div>

			<div className="grid gap-2 mt-16 max-w-[1200px] w-full">
				<h2 className="text-xg sm:text-2xl">Existing Ideas</h2>
				<div className="flex flex-col sm:flex-row justify-between gap-2">
					<div className="relative group">
						<input
							id="search-idea"
							type="text"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="px-4 py-2 w-max text-lg font-bold rounded-md bg-transparent border-2 text-rain-100 placeholder:text-rain-300 border-rain-600 text-left"
						/>
						<label htmlFor="search-idea">
							<RiSearchLine className=" absolute top-1/2 -translate-y-1/2 right-4 text-rain-300 group-hover:text-rain-100 transition-colors duration-200" />
						</label>
					</div>
					<SortDropdown value={sortBy} onChange={setSortBy} />
				</div>

				{filteredAndSortedIdeas.length === 0 ? (
					<p className="text-rain-500">No ideas match your search.</p>
				) : (
					<ul className="grid gap-0">
						{filteredAndSortedIdeas.map((idea) => (
							<li key={idea.id} className="relative">
								<button
									onClick={() => router.push(`/ideas/${idea.id}`)}
									className="btn--tertiary rounded-lg bg-transparent hover:bg-rain-600 w-full justify-between grid grid-cols-2 sm:grid-cols-4 text-left gap-2 px-2"
								>
									<span className="place-content-center">{idea.name}</span>
									<div className="flex flex-col sm:flex-row justify-center items-center sm:col-start-3 gap-0 sm:gap-8 w-max text-md leading-normal">
										<span className="capitalize text-rain-500">
											{formatDateOnly(idea.updatedAt)}
										</span>
										<span className="text-rain-500">
											Updated {formatRelativeTime(idea.updatedAt)}
										</span>
									</div>
								</button>
								<button
									onClick={() => setIdeaToDelete(idea)}
									className="btn--icon absolute top-1/2 -translate-y-1/2 right-0 z-5 p-2 text-rain-500 hover:text-red-500/80"
								>
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
					className="btn--danger text-rain-500 gap-2 place-self-center m-4 flex items-center"
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
