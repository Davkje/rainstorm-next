import React, { useState, useRef, useEffect, ElementType } from "react";
import { RiPencilFill } from "@remixicon/react";

interface EditableTextProps {
	text: string;
	className?: string;
	onChange: (newText: string) => void;
	tag?: ElementType;
	showEditButton?: boolean;
	editButtonSize?: number;
}

export default function EditableText({
	text,
	className = "",
	tag: Tag = "span",
	onChange,
	showEditButton,
	editButtonSize = 16,
}: EditableTextProps) {
	const ref = useRef<HTMLElement | null>(null);
	const original = useRef(text);
	const [editing, setEditing] = useState(false);

	// Keep original text in sync if parent updates
	useEffect(() => {
		original.current = text;
		if (!editing && ref.current) {
			ref.current.innerText = text;
		}
	}, [text, editing]);

	useEffect(() => {
		if (editing && ref.current) {
			ref.current.focus();

			const range = document.createRange();
			range.selectNodeContents(ref.current);
			const sel = window.getSelection();
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [editing]);

	const abort = () => {
		if (ref.current) {
			ref.current.innerText = original.current;
		}
		setEditing(false);
	};

	const commit = () => {
		if (!ref.current) return;

		const value = ref.current.innerText.trim();

		if (value !== original.current) {
			onChange(value);
		}

		setEditing(false);
	};

	return (
		<div className="inline-flex items-center gap-1">
			<Tag
				ref={ref}
				contentEditable={editing}
				suppressContentEditableWarning
				tabIndex={0}
				role="textbox"
				aria-label="Editable text"
				aria-multiline="false"
				aria-readonly={!editing}
				className={`
				${className}
				inline-block
				px-1
				cursor-pointer
				outline-none
				rounded
				bg-transparent
				focus:bg-rain-500/0
				focus:outline-none
				focus:ring-0
				focus:ring-offset-0
				`}
				// focus:ring-2 focus:ring-rain-600
				onClick={() => setEditing(true)}
				onFocus={() => setEditing(true)}
				onBlur={commit}
				onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
					if (e.key === "Enter") {
						e.preventDefault();
						commit();
					}

					if (e.key === "Escape") {
						e.preventDefault();
						abort();
					}
				}}
			>
				{text}
			</Tag>

			{showEditButton && (
				<button
					type="button"
					className="btn--icon"
					onClick={() => setEditing(true)}
					aria-label="Edit text"
					tabIndex={-1}
				>
					<RiPencilFill size={editButtonSize} />
				</button>
			)}
		</div>
	);
}
