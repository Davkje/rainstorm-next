"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadIdeas, saveIdeas, loadTemplates, createIdeaFromTemplate } from "@/helpers/storage";
import { Template } from "@/models/templates";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	const [templates] = useState(loadTemplates());

	const handleCreateIdea = (template: Template) => {
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
					<div className="grid gap-4">
						<div className="flex justify-center gap-4 flex-wrap text-lg">
							{templates
								.filter((t) => t.highligted)
								.map((t) => (
									<button
										className="btn--primary hover:scale-[1.1] transition-all duration-500 ease-in-out"
										key={t.id}
										onClick={() => handleCreateIdea(t)}
									>
										{t.name}
									</button>
								))}
						</div>
						<Link
							href="/templates"
							className="text-md place-self-center text-rain-500 hover:text-rain-200"
						>
							Or see all Templates
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
