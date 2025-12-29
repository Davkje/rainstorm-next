interface TemplatePageProps {
	params: { id: string };
}

export default function TemplatePage({ params }: TemplatePageProps) {
	return (
		<div>
			<h1 className="text-2xl font-bold">Template: {params.id}</h1>
			<p>Visa/redigera template.</p>
		</div>
	);
}
