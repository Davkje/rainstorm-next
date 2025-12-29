export interface Template {
	id: string;
	name: string;
	categories: Category[];
}

export interface Category {
	id: string;
	name: string;
	text: string;
	words: string[];
}

// Default templates
export const defaultTemplates: Template[] = [
	{
		id: "song",
		name: "Song",
		categories: [
			{ id: "verse", name: "Verse", text: "", words: [] },
			{ id: "pre", name: "Pre-Chorus", text: "", words: [] },
			{ id: "chorus", name: "Chorus", text: "", words: [] },
		],
	},
	{
		id: "story",
		name: "Story",
		categories: [
			{ id: "intro", name: "Introduction", text: "", words: [] },
			{ id: "conflict", name: "Conflict", text: "", words: [] },
			{ id: "resolution", name: "Resolution", text: "", words: [] },
		],
	},
	{
		id: "game",
		name: "Game",
		categories: [
			{ id: "hook", name: "Hook", text: "", words: [] },
			{ id: "loop", name: "Loop", text: "", words: [] },
			{ id: "win", name: "Win", text: "", words: [] },
		],
	},
];
