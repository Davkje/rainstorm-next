export type Word = string;
export type WordBankName = "nature" | "abstract" | "places" | "verbs" | "creature";
export type WordBanks = Record<WordBankName, Word[]>;

export interface Idea {
	id: string;
	templateId: string;
	name: string;
	categories: Category[];
	updatedAt: number;
}

export interface Category {
	id: string;
	name: string;
	text: string;
	words: string[];
}

export type DragWordData = {
	word: Word;
	parentId: string;
};

export type DragOverData =
	| { parentId: string; isTrash?: boolean }
	| { parentId: string; word: Word };
