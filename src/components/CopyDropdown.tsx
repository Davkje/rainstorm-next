"use client";

import { useEffect, useRef, useState } from "react";
import { Idea } from "@/models/ideas";
import { copyIdea, ExportFormat } from "@/utils/copyIdea";
import { RiFileCopyLine } from "@remixicon/react";

export default function CopyDropdown({ idea }: { idea: Idea }) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [copied, setCopied] = useState(false);

	const handleCopy = async (format: ExportFormat) => {
		await copyIdea(idea, format);
		setOpen(false);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	/* ------------------ CLICK OUTSIDE ------------------ */
	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	/* ------------------ ESC KEY ------------------ */
	useEffect(() => {
		if (!open) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [open]);

	return (
		<div ref={ref} className="relative flex h-full">
			<button
				onClick={() => setOpen((v) => !v)}
				className="btn--icon h-full"
				aria-haspopup="menu"
				aria-expanded={open}
			>
				<RiFileCopyLine />
			</button>

			{open && (
				<div
					className="absolute min-w-max right-0 mt-2 grid rounded-lg px-4 py-2 bg-rain-700 shadow-lg z-50 text-nowrap"
					role="menu"
				>
					<button onClick={() => handleCopy("plain")} className="btn--link text-left">
						Plain text
					</button>
					<button onClick={() => handleCopy("markdown")} className="btn--link text-left">
						Markdown
					</button>
					<button onClick={() => handleCopy("html")} className="btn--link text-left">
						Formatted (Docs)
					</button>
				</div>
			)}

			{copied && (
				<div className="text-lg fixed bottom-8 right-8 bg-rain-700 border-2 border-rain-400 text-white px-4 py-1 rounded-lg shadow-lg transition-opacity duration-300">
					Copied!
				</div>
			)}
		</div>
	);
}
