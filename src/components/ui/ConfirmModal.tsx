"use client";

import { FocusTrap } from "focus-trap-react";
import { useEffect, useRef } from "react";

type Props = {
	open: boolean;
	title: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	danger?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};

export default function ConfirmModal({
	open,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	danger = false,
	onConfirm,
	onCancel,
}: Props) {
	const backdropRef = useRef<HTMLDivElement>(null);

	// ESC to close
	useEffect(() => {
		if (!open) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onCancel();
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open, onCancel]);

	if (!open) return null;

	return (
		<div
			ref={backdropRef}
			onClick={(e) => {
				if (e.target === backdropRef.current) onCancel();
			}}
			className="fixed inset-0 z-50 flex items-center justify-center text-center bg-black/60"
		>
			<FocusTrap>
				<div className="w-full max-w-fit rounded-xl bg-rain-800 py-6 px-8 shadow-xl">
					<h2 className="text-lg">{title}?</h2>

					{description && <p className="mt-2">{description}</p>}

					<div className="mt-6 flex justify-center gap-2">
						<button onClick={onCancel} className="btn--primary">
							{cancelText}
						</button>
						<button onClick={onConfirm} className={`${danger ? "btn--danger" : "btn--ghost"}`}>
							{confirmText}
						</button>
					</div>
				</div>
			</FocusTrap>
		</div>
	);
}
