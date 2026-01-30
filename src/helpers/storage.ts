import { Idea } from "@/models/ideas";
import { Template, defaultTemplates } from "@/models/templates";

// -------------- TEMPLEATE FUNCTIONS --------------

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

// -------------- IDEA FUNCTIONS --------------

// LOAD IDEAS
export function loadIdeas(): Idea[] {
	if (typeof window === "undefined") return [];
	const saved = localStorage.getItem("ideas");
	if (!saved) return [];
	try {
		return JSON.parse(saved) as Idea[];
	} catch {
		return [];
	}
}

// SAVE IDEAS (LOCAL STORAGE)
export function saveIdeas(ideas: Idea[]) {
	if (typeof window === "undefined") return;
	localStorage.setItem("ideas", JSON.stringify(ideas));
}

// CREATE IDEA
export function createIdeaFromTemplate(template: Template): Idea {
	return {
		id: crypto.randomUUID(),
		templateId: template.id,
		name: `${template.name} Idea`,
		updatedAt: Date.now(),
		categories: template.categories.map((c) => ({
			id: c.id,
			name: c.name,
			text: "",
			words: [...(c.words || [])],
		})),
		activeBanks: template.activeBanks ? [...template.activeBanks] : [],
	};
}

// ADD IDEA TO ALL (UPDATE)
export function addIdea(newIdea: Idea) {
	const all = loadIdeas();
	const updated = [...all, newIdea];
	saveIdeas(updated);
	return updated;
}

// REMOVE IDEA
export function removeIdea(ideaId: Idea["id"]) {
	const all = loadIdeas();
	const updated = all.filter((idea) => idea.id !== ideaId);
	saveIdeas(updated);
	return updated;
}

// REMOVE ALL IDEAS
export function removeAllIdeas() {
	if (typeof window === "undefined") return;
	localStorage.removeItem("ideas");
}
