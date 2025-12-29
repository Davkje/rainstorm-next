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
