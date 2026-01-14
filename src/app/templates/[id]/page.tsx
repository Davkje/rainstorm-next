import { loadTemplates } from "@/helpers/storage";

interface TemplatePageProps {
	params: Promise<{ id: string }>;
}

export default async function TemplatePage({ params }: TemplatePageProps) {
	const { id } = await params; // ✅ unwrappa promisen på server

	const templates = loadTemplates();
	const template = templates.find((t) => t.id === id) ?? null;

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
