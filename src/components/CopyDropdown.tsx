"use client";

import { useEffect, useRef, useState } from "react";
import { Idea } from "@/models/ideas";
import { copyIdea, ExportFormat } from "@/utils/copyIdea";
import { RiFileCopyLine } from "@remixicon/react";
import Tooltip from "./ui/Tooltip";

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
			<Tooltip text="Copy Idea" position="bottom">
				<button
					onClick={() => setOpen((v) => !v)}
					className="btn--icon h-full"
					aria-haspopup="menu"
					aria-expanded={open}
					aria-label="Show Copy Dropdown"
				>
					<RiFileCopyLine />
				</button>
			</Tooltip>
			{open && (
				<div
					className="absolute min-w-max top-full left-0 sm:left-auto right-0 mt-2 grid rounded-lg px-4 py-2 bg-rain-700 shadow-lg z-10 text-nowrap"
					role="menu"
				>
					<h3>Copy</h3>
					<button
						role="menuitem"
						onClick={() => handleCopy("plain")}
						className="btn--link text-left font-normal"
					>
						Plain text
					</button>
					<button
						role="menuitem"
						onClick={() => handleCopy("markdown")}
						className="btn--link text-left font-normal"
					>
						Markdown
					</button>
					<button
						role="menuitem"
						onClick={() => handleCopy("html")}
						className="btn--link text-left font-normal"
					>
						Formatted (Docs)
					</button>
				</div>
			)}

			{copied && (
				<div
					aria-live="polite"
					className="text-lg fixed bottom-8 right-8 bg-rain-600 text-white px-4 py-1 rounded-lg shadow-lg transition-opacity duration-300"
				>
					Copied to Clipboard!
				</div>
			)}
		</div>
	);
}
