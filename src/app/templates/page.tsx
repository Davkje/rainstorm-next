"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Template } from "../../models/templates";
import { loadTemplates } from "@/helpers/storage";

export default function TemplatesPage() {
	const [templates, setTemplates] = useState<Template[]>([]);

	useEffect(() => {
		// delay setState to avoid cascading renders
		const timeout = setTimeout(() => {
			setTemplates(loadTemplates());
		}, 0);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div>
			<h1>Templates</h1>
			<h2>List of templates</h2>

			{templates.length === 0 ? (
				<p>Inga templates än.</p>
			) : (
				<ul>
					{templates.map((t) => (
						<li key={t.id}>
							<Link className="text-lg" href={`/templates/${t.id}`}>
								{t.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
