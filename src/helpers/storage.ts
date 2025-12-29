import { Template, defaultTemplates } from "@/lib/templates";

// LOAD TEMPLATE
export function loadTemplates(): Template[] {
	if (typeof window === "undefined") return defaultTemplates;

	const saved = localStorage.getItem("templates");
	if (!saved) return defaultTemplates;

	try {
		return JSON.parse(saved) as Template[];
	} catch {
		return defaultTemplates;
	}
}

// SAVE TEMPLATE
export function saveTemplates(templates: Template[]) {
	if (typeof window === "undefined") return;
	localStorage.setItem("templates", JSON.stringify(templates));
}

// ADD TEMPLATE
export function addTemplate(template: Template) {
	const all = loadTemplates();
	const updated = [...all, template];
	saveTemplates(updated);
	return updated;
}
