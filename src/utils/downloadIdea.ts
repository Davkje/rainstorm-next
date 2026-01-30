import { Idea } from "@/models/ideas";
import { ideaToPlainText } from "./useExportIdea";
import jsPDF from "jspdf";

export type DownloadFormat = "txt" | "pdf";

// DOWNLOAD IDEA AS TEXT OR PDF
export async function downloadIdea(idea: Idea, format: DownloadFormat) {
	if (format === "txt") {
		const text = ideaToPlainText(idea);
		downloadFile(text, `${idea.name}.txt`, "text/plain");
	}

	if (format === "pdf") {
		await downloadPdf(idea);
	}
}

function downloadFile(content: string, filename: string, type: string) {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();

	URL.revokeObjectURL(url);
}

export async function downloadPdf(idea: Idea) {
	const doc = new jsPDF();

	let y = 20;

	// Title
	doc.setFontSize(20);
	doc.text(idea.name, 20, y);
	y += 10;

	doc.setFontSize(12);

	for (const category of idea.categories) {
		y += 8;
		doc.setFont("bold");
		doc.text(category.name, 20, y);

		doc.setFont("normal");
		y += 6;

		if (category.words.length) {
			doc.text(category.words.join(", "), 25, y);
			y += 6;
		}

		if (category.text.trim()) {
			const lines = doc.splitTextToSize(category.text, 160);
			doc.text(lines, 25, y);
			y += lines.length * 6;
		}
	}

	doc.save(`${idea.name}.pdf`);
}
