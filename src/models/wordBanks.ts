export type WordBankName =
	| "nature"
	| "place"
	| "abstract"
	| "verb"
	| "creature"
	| "emotion"
	| "object"
	| "role"
	| "adjective"
	| "magic";

export type Word = string;

export interface WordBank {
	name: WordBankName;
	words: string[];
}
