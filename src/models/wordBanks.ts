export type WordBankName = "nature" | "place" | "abstract" | "verb" | "creature";

export type Word = string;

export interface WordBank {
	name: WordBankName;
	words: string[];
}
