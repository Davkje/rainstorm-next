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
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-4">Templates</h1>
			<p className="mb-4">Lista över templates, både fördefinierade och egna.</p>

			{templates.length === 0 ? (
				<p>Inga templates än.</p>
			) : (
				<ul className="list-disc pl-5">
					{templates.map((t) => (
						<li key={t.id} className="mb-2">
							<Link href={`/templates/${t.id}`} className="text-blue-600 hover:underline">
								{t.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
