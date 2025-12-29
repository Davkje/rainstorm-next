"use client";

import { loadTemplates } from "@/helpers/storage";
import { Template } from "@/lib/templates";
import { useEffect, useState } from "react";
import * as React from "react";

interface TemplatePageProps {
	params: { id: string };
}

export default function TemplatePage({ params }: TemplatePageProps) {
	const { id } = React.use(params);

	const [template, setTemplate] = useState<Template | null>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const templates = loadTemplates();
			const found = templates.find((t) => t.id === id);
			if (found) setTemplate(found);
		}, 0);

		return () => clearTimeout(timeout);
	}, [id]);

	if (!template) return <div>Template not found!</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">{template.name}</h1>

			<h2 className="text-xl font-semibold mb-2">Categories</h2>

			<div className="space-y-4">
				{template.categories.map((cat) => (
					<div key={cat.id} className="border rounded p-3">
						<h3 className="font-semibold">{cat.name}</h3>
						<p className="text-sm text-gray-500">Text field</p>
					</div>
				))}
			</div>
		</div>
	);
}
