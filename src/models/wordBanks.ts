export type WordBankName = "nature" | "place" | "abstract" | "verb" | "creature" | null;

export type Word = string;

export interface WordBank {
	name: WordBankName;
	words: string[];
}
