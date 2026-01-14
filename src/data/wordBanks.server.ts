import { WordBankName } from "@/models/wordBanks";

export const wordBanks: Record<WordBankName, string[]> = {
	nature: ["flower", "leaf", "wind", "mountain", "moss", "light", "rain"],
	abstract: ["essence", "dream", "though", "vision", "memory", "feeling", "will"],
	place: ["castle", "forest", "field", "cave", "hamlet", "basement", "town"],
	verb: ["run", "break", "read", "leave", "write", "jump", "sleep"],
	creature: ["goblin", "human", "orc", "elf", "dragon", "tiefling", "dwarf", "gnome", "halfling"],
};
