import React, { useState, useRef, useEffect, ElementType } from "react";

interface EditableTextProps {
	text: string;
	className?: string;
	onChange: (newText: string) => void;
	tag?: ElementType;
}
export default function EditableText({
	text,
	className = "",
	onChange,
	tag: Tag = "span",
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

		if (value === "") {
			abort();
			return;
		}

		if (value !== original.current) {
			onChange(value);
		}

		setEditing(false);
	};

	return (
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
				focus:ring-2 focus:ring-rain-600 
			`}
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
	);
}
