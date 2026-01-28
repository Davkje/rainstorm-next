"use client";

import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";

export type SortOption = "latest" | "oldest" | "az" | "za";

const options: { value: SortOption; label: string }[] = [
	{ value: "latest", label: "Latest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "az", label: "A-Z" },
	{ value: "za", label: "Z-A" },
];

export default function SortDropdown({
	value,
	onChange,
}: {
	value: SortOption;
	onChange: (value: SortOption) => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const current = options.find((o) => o.value === value);

	/* ---------- CLICK OUTSIDE ---------- */
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

	/* ---------- ESC KEY ---------- */
	useEffect(() => {
		if (!open) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [open]);

	return (
		<div className="relative place-items-center" ref={ref}>
			<button
				onClick={() => setOpen((v) => !v)}
				className="btn--primary bg-rain-800/90 rounded-md hover:border-rain-400 flex font-normal items-center text-md gap-2 px-4 py-1 w-max border-2"
				aria-haspopup="menu"
				aria-expanded={open}
			>
				<span>{current?.label}</span>
				<RiArrowDownSLine className={`transition-transform ${open ? "rotate-180" : ""}`} />
			</button>

			{open && (
				<div
					className="absolute w-max z-50 mt-2 right-0 min-w-full rounded-lg bg-rain-800 border-2 border-rain-600 shadow-lg grid gap-2 p-4"
					role="menu"
				>
					{options.map((opt) => (
						<button
							key={opt.value}
							onClick={() => {
								onChange(opt.value);
								setOpen(false);
							}}
							className={`btn--link text-left rounded-md leading-normal font-normal hover:text-rain-100 ${
								opt.value === value ? "text-white" : "text-rain-300"
							}`}
						>
							{opt.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
