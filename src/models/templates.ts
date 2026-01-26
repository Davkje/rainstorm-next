import { Category } from "./ideas";
import { WordBankName } from "./wordBanks";

export interface Template {
	id: string;
	name: string;
	categories: Category[];
	activeBanks?: WordBankName[];
	highlighted: boolean;
}

// TEMPLATES
export const defaultTemplates: Template[] = [
	{
		id: "empty",
		name: "Empty",
		highlighted: true,
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
		highlighted: true,
		categories: [
			{ id: "theme", name: "Theme", text: "", words: [] },
			{ id: "sound", name: "Sound", text: "", words: [] },
			{ id: "genre", name: "Genre", text: "", words: [] },
		],
		activeBanks: ["abstract", "adjective", "emotion", "nature", "place", "role", "verb"],
	},
	{
		id: "story",
		name: "Story",
		highlighted: true,
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
		highlighted: true,
		categories: [
			{ id: "hook", name: "Hook", text: "", words: [] },
			{ id: "loop", name: "Loop", text: "", words: [] },
			{ id: "win", name: "Win", text: "", words: [] },
		],
		activeBanks: ["abstract", "adjective", "creature", "emotion", "magic", "nature"],
	},
	{
		id: "heros-journey",
		name: "Hero's Journey",
		highlighted: false,
		categories: [
			{ id: "departure", name: "Departure", text: "", words: [] },
			{ id: "initiation", name: "Initiation", text: "", words: [] },
			{ id: "return", name: "Return", text: "", words: [] },
		],
		activeBanks: ["abstract", "adjective", "emotion", "nature", "place", "role", "verb"],
	},
	{
		id: "film-pitch",
		name: "Film Pitch",
		highlighted: false,
		categories: [
			{ id: "protagonist", name: "Protagonist", text: "", words: [] },
			{ id: "setting", name: "Setting", text: "", words: [] },
			{ id: "conflict", name: "Central Conflict", text: "", words: [] },
			{ id: "theme", name: "Theme", text: "", words: [] },
		],
		activeBanks: ["role", "place", "emotion", "abstract", "verb", "adjective"],
	},
	{
		id: "quest",
		name: "Quest",
		highlighted: false,
		categories: [
			{ id: "setting", name: "Setting", text: "", words: [] },
			{ id: "obstacle", name: "Obstacle", text: "", words: [] },
			{ id: "goal", name: "Goal", text: "", words: [] },
			{ id: "reward", name: "Reward", text: "", words: [] },
		],
		activeBanks: ["place", "creature", "magic", "object", "role", "emotion", "verb"],
	},
];
