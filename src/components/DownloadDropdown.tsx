"use client";

import { useEffect, useRef, useState } from "react";
import { Idea } from "@/models/ideas";
import { downloadIdea, DownloadFormat } from "@/utils/downloadIdea";
import { RiFileDownloadLine } from "@remixicon/react";

const options: DownloadFormat[] = ["txt", "pdf"];

export default function DownloadDropdown({ idea }: { idea: Idea }) {
	const [open, setOpen] = useState(false);
	const [downloaded, setDownloaded] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleDownload = async (format: DownloadFormat) => {
		await downloadIdea(idea, format);
		setOpen(false);
		setDownloaded(true);
		setTimeout(() => setDownloaded(false), 1500);
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
		<div className="relative flex" ref={ref}>
			<button
				className="btn--link"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="menu"
				aria-expanded={open}
			>
				<RiFileDownloadLine />
			</button>

			{open && (
				<div
					className="absolute min-w-max right-0 mt-2 grid rounded-lg px-4 py-2 bg-rain-700 shadow-lg z-50 text-nowrap"
					role="menu"
				>
					{options.map((opt) => (
						<button
							key={opt}
							onClick={() => handleDownload(opt)}
							className={`btn--link text-left capitalize`}
						>
							{`${opt.toUpperCase()} file`}
						</button>
					))}
				</div>
			)}

			{downloaded && (
				<div className="text-lg fixed bottom-4 right-4 bg-rain-700 border-2 border-rain-400 text-white px-4 py-1 rounded-lg shadow-lg transition-opacity duration-300">
					Downloaded!
				</div>
			)}
		</div>
	);
}
