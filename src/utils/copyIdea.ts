import { Idea } from "@/models/ideas";
import { ideaToHtml, ideaToMarkdown, ideaToPlainText } from "./useExportIdea";

export type ExportFormat = "plain" | "markdown" | "html";

export async function copyIdea(idea: Idea, format: ExportFormat) {
	if (format === "html") {
		await navigator.clipboard.write([
			new ClipboardItem({
				"text/html": new Blob([ideaToHtml(idea)], {
					type: "text/html",
				}),
				"text/plain": new Blob([ideaToPlainText(idea)], {
					type: "text/plain",
				}),
			}),
		]);
		return;
	}

	const text = format === "markdown" ? ideaToMarkdown(idea) : ideaToPlainText(idea);

	await navigator.clipboard.writeText(text);
}
