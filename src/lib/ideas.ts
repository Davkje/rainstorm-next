import type { Template } from "./templates";

export interface IdeaCategory {
	id: string;
	name: string;
	text: string;
	words: string[];
}

export interface Idea {
	id: string;
	templateId: string;
	name: string;
	categories: IdeaCategory[];
	updatedAt: number;
}

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

export function saveIdeas(ideas: Idea[]) {
	if (typeof window === "undefined") return;
	localStorage.setItem("ideas", JSON.stringify(ideas));
}

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
	};
}

export function addIdea(newIdea: Idea) {
	const all = loadIdeas();
	const updated = [...all, newIdea];
	saveIdeas(updated);
	return updated;
}
