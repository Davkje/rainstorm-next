export type WordBankName =
	| "verb"
	| "adjective"
	| "objects"
	| "people"
	| "place"
	| "abstract"
	| "material"
	| "time"
	| "emotion"
	| "action"
	| "society"
	| "relationship"
	| "nature"
	| "animal"
	| "anatomy"
	| "technology"
	| "sound"
	| "fantasy"
	| "creature"
	| "scifi"
	| "horror"
	| "adventure"
	| "conflict"
	| "mystery"
	| "modern"
	| "romance"
	| "food";

export type Word = string;

export interface WordBank {
	name: WordBankName;
	words: string[];
}
