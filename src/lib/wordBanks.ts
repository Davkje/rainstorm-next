import "server only";

import { wordBanks } from "@/data/wordBanks.server";
import { WordBank, WordBankName, Word } from "@/models/wordBanks";

// ---- ALL BANKS W. WORDS
export function getAllWordBanks(): WordBank[] {
	return Object.entries(wordBanks).map(([name, words]) => ({
		name: name as WordBankName,
		words,
	}));
}

// ---- ALL BANK NAMES
export function getWordBankNames(): WordBankName[] {
	return Object.keys(wordBanks) as WordBankName[];
}

// ---- GET RANDOM WORD
export function getRandomWordFromBank(bank: WordBankName, exclude?: Word): Word {
	const words = wordBanks[bank];
	if (!words || words.length === 0) {
		throw new Error(`Bank "${bank}" is empty or missing`);
	}

	const available = exclude ? words.filter((w) => w !== exclude) : words;

	const index = Math.floor(Math.random() * available.length);
	return available[index];
}
