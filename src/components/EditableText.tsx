import { useState, useRef, useEffect, ElementType } from "react";

interface EditableTextProps {
	text: string;
	className?: string;
	onChange: (newText: string) => void;
	tag?: ElementType; // t.ex. "h1" | "h2" | "span" | "div" etc.
}

export default function EditableText({
	text,
	className,
	onChange,
	tag: Tag = "span",
}: EditableTextProps) {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(text);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [editing]);

	const saveValue = () => {
		setEditing(false);
		const trimmed = value.trim();
		if (trimmed !== "") {
			if (trimmed !== text) onChange(trimmed);
		} else {
			setValue(text);
		}
	};

	const handleBlur = () => saveValue();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			saveValue();
		}
		if (e.key === "Escape") {
			setValue(text);
			setEditing(false);
		}
	};

	if (editing) {
		return (
			<input
				ref={inputRef}
				type="text"
				value={value}
				name={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				className={className + " border-0 outline-0"} // start with space
			/>
		);
	}

	return (
		<Tag className={className} onClick={() => setEditing(true)}>
			{text}
		</Tag>
	);
}
