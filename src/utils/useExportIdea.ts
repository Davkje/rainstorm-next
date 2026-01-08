import { Idea } from "@/models/ideas";
import { capitalize, capitalizeWords } from "./useCapitalize";

// PLAIN TEXT
export function ideaToPlainText(idea: Idea): string {
	let output = "";

	output += `${idea.name}\n`;

	for (const category of idea.categories) {
		output += `${capitalize(category.name)} - `;

		if (category.words.length > 0) {
			output += `${capitalizeWords(category.words.join(", "))}\n`;
		}

		if (category.text.trim()) {
			output += `${capitalize(category.text)}\n`;
		}
		output += `\n`;
	}

	return output.trim();
}

// MARKDOWN
export function ideaToMarkdown(idea: Idea): string {
	let output = "";

	output += `# ${idea.name}\n\n`;

	for (const category of idea.categories) {
		output += `## ${capitalize(category.name)}\n`;

		if (category.words.length > 0) {
			output += `**${capitalizeWords(category.words.join(", "))}**\n\n`;
		}

		if (category.text.trim()) {
			output += `${capitalize(category.text)}\n`;
		}

		output += `\n`;
	}

	return output.trim();
}

// HTML

function escapeHtml(text: string) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function ideaToHtml(idea: Idea): string {
	let html = "";

	html += `<h2>${escapeHtml(idea.name)}</h2>`;

	for (const category of idea.categories) {
		html += `<strong>${escapeHtml(capitalize(category.name))}</strong> - `;

		if (category.words.length > 0) {
			html += `<i>${escapeHtml(capitalizeWords(category.words.join(", ")))}</i>`;
		}

		if (category.text.trim()) {
			html += `<p>${escapeHtml(capitalize(category.text))}</p>`;
		}
	}

	return html;
}
