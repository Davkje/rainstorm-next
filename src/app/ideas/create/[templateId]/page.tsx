import { loadTemplates } from "@/helpers/storage";
import { createIdeaFromTemplate } from "@/lib/ideas";

interface CreateIdeaProps {
	params: { templateId: string };
}

export default function CreateIdeaPage({ params }: CreateIdeaProps) {
	const templates = loadTemplates();
	const tmpl = templates.find((t) => t.id === params.templateId);

	if (!tmpl) return <div>Template not found</div>;

	const idea = createIdeaFromTemplate(tmpl);

	// Ideally this would be triggered by a button, but placeholder for now:
	// addIdea(idea);

	return (
		<div>
			<h1 className="text-3xl font-bold">Create Idea from {tmpl.name}</h1>
			<p>Detta kommer skapa en idé baserad på template {tmpl.name}.</p>
			<pre className="mt-4 p-2 bg-gray-100 rounded">{JSON.stringify(idea, null, 2)}</pre>
		</div>
	);
}
