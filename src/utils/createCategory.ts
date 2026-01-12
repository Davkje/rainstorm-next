import { Category } from "@/models/ideas";

export function createCategory(name = "New category"): Category {
	return {
		id: crypto.randomUUID(),
		name,
		text: "",
		words: [],
	};
}
