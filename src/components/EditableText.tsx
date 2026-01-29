import React, { useState, useRef, useEffect, ElementType } from "react";
import { RiPencilFill } from "@remixicon/react";
import Tooltip from "./ui/Tooltip";

interface EditableTextProps {
	text: string;
	className?: string;
	onChange: (newText: string) => void;
	tag?: ElementType;
	showEditButton?: boolean;
	editButtonSize?: number;
	maxLength?: number;
}

export default function EditableText({
	text,
	className = "",
	tag: Tag = "span",
	onChange,
	showEditButton,
	editButtonSize = 16,
	maxLength = 30,
}: EditableTextProps) {
	const ref = useRef<HTMLElement | null>(null);
	const original = useRef(text);
	const [editing, setEditing] = useState(false);

	// KEEP ORIGINAL IN SYNC
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

		let value = ref.current.innerText.trim();

		if (value.length > maxLength) {
			value = value.slice(0, maxLength);
			ref.current.innerText = value;
		}

		if (value !== original.current) {
			onChange(value);
		}

		setEditing(false);
	};

	return (
		<div className="inline-flex items-center relative w-max">
			<Tag
				ref={ref}
				contentEditable={editing}
				suppressContentEditableWarning
				tabIndex={0}
				role={editing ? "textbox" : undefined}
				aria-readonly={editing ? false : undefined}
				aria-label="Editable text"
				aria-multiline="false"
				className={`
					inline-block
					px-1
					cursor-pointer
					rounded
					${className}
				`}
				onClick={() => setEditing(true)}
				// onFocus={() => {}}

				onBlur={commit}
				onInput={() => {
					if (!ref.current) return;

					const text = ref.current.innerText;

					if (text.length > maxLength) {
						ref.current.innerText = text.slice(0, maxLength);

						// MOVE CARET
						const range = document.createRange();
						range.selectNodeContents(ref.current);
						range.collapse(false);
						const sel = window.getSelection();
						sel?.removeAllRanges();
						sel?.addRange(range);
					}
				}}
				onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
					if (e.key === "Enter") {
						e.preventDefault();
						commit();
					}

					if (e.key === "Escape") {
						e.preventDefault();
						abort();
					}

					if (!editing && (e.key === "Enter" || e.key === " ")) {
						e.preventDefault();
						setEditing(true);
					}
				}}
			>
				{text}
			</Tag>
			{showEditButton && (
				<Tooltip text="Edit text">
					<button
						type="button"
						className="btn--icon absolute -right-7 top-1/2 -translate-y-1/2"
						onClick={() => setEditing(true)}
						aria-label="Edit text"
						tabIndex={-1}
					>
						<RiPencilFill size={editButtonSize} />
					</button>
				</Tooltip>
			)}
		</div>
	);
}
