import { Category } from "@/models/ideas";

export function isCategoryEmpty(category: Category): boolean {
	return category.words.length === 0 && category.text.trim().length === 0;
}
