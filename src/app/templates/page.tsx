"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Template } from "../../models/templates";
import { loadTemplates } from "@/helpers/storage";

export default function TemplatesPage() {
	const [templates, setTemplates] = useState<Template[]>([]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setTemplates(loadTemplates());
		}, 0);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="text-center">
			<h1>Templates</h1>
			<p className="text-xl">List of templates</p>

			{templates.length === 0 ? (
				<p>Inga templates än.</p>
			) : (
				<ul>
					{templates.map((t) => (
						<li key={t.id}>
							<Link className="text-xl" href={`/templates/${t.id}`}>
								{t.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
