import { Category } from "./ideas";
import { WordBankName } from "./wordBanks";

export interface Template {
	id: string;
	name: string;
	categories: Category[];
	activeBanks?: WordBankName[];
}

// Default templates
export const defaultTemplates: Template[] = [
	{
		id: "empty",
		name: "Empty",
		categories: [{ id: "Empty", name: "Empty", text: "", words: [] }],
		activeBanks: [
			"abstract",
			"adjective",
			"creature",
			"emotion",
			"magic",
			"nature",
			"object",
			"place",
			"role",
			"verb",
		],
	},
	{
		id: "song",
		name: "Song",
		categories: [
			{ id: "verse", name: "Verse", text: "", words: [] },
			{ id: "pre", name: "Pre-Chorus", text: "", words: [] },
			{ id: "chorus", name: "Chorus", text: "", words: [] },
		],
		activeBanks: ["abstract", "adjective", "emotion", "nature", "place", "role", "verb"],
	},
	{
		id: "story",
		name: "Story",
		categories: [
			{ id: "intro", name: "Introduction", text: "", words: [] },
			{ id: "conflict", name: "Conflict", text: "", words: [] },
			{ id: "resolution", name: "Resolution", text: "", words: [] },
		],
		activeBanks: ["abstract", "creature", "emotion", "magic", "object", "role", "verb"],
	},
	{
		id: "game",
		name: "Game",
		categories: [
			{ id: "hook", name: "Hook", text: "", words: [] },
			{ id: "loop", name: "Loop", text: "", words: [] },
			{ id: "win", name: "Win", text: "", words: [] },
		],
		activeBanks: ["abstract", "adjective", "creature", "emotion", "magic", "nature"],
	},
];
