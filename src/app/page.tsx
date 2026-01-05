"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loadIdeas, saveIdeas, loadTemplates, createIdeaFromTemplate } from "@/helpers/storage";

import { Idea } from "@/models/ideas";

export default function Home() {
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
		<>
			{/* <h1 className="text-2xl font-bold">Home</h1> */}
			{/* BYT TILL RIKTIG TEXT INTE BILD */}
			<div className="h-full flex flex-col items-center justify-center gap-8">
				<Image src="/rainstorm.png" alt="rainstorm" width={600} height={167} />
				<p className="italic">The one word, limiting, focused idea tool</p>
				<div className="flex flex-col items-center justify-center gap-8">
					<h2 className="font-bold">What do you want to create?</h2>
					<div className="flex gap-4 flex-wrap text-lg">
						{templates.map((t) => (
							<button className="button--primary" key={t.id} onClick={() => handleCreateIdea(t)}>
								{t.name}
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
