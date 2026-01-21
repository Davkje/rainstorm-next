import { Category } from "@/models/ideas";
import { Word } from "@/models/wordBanks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiCloseLine } from "@remixicon/react";

type WordChipProps = {
	word: Word | null;
	parentId: Category["id"] | "generator";
	onRemove?: () => void;
};

export default function WordChip({ word, parentId, onRemove }: WordChipProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: `${parentId}-${word}`,
		data: {
			type: "word",
			word,
			parentId,
		},
	});

	// "Animation" for moving
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: "grab",
	};

	const baseClasses =
		"manipulation flex justify-center items-center rounded-lg text-rain-100 capitalize select-none transition-all";
	const generatorClasses =
		"px-10 py-3 text-3xl bg-rain-700 font-bold uppercase hover:bg-rain-600 shadow-black-red shadow-[0_10px_24px_rgba(0,0,0,0.20)]";
	const categoryClasses =
		"group relative gap-1 bg-rain-700 px-4 py-1 text-lg font-bold hover:bg-rain-600";

	// DELETE (WITHOUT KILLING DND FOCUS)
	const handleKeyDown = (e: React.KeyboardEvent) => {
		listeners?.onKeyDown?.(e);

		if (e.defaultPrevented) return;

		if (parentId !== "generator" && (e.key === "Backspace" || e.key === "Delete")) {
			e.preventDefault();
			onRemove?.();
		}
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			tabIndex={0}
			role="button"
			aria-roledescription="draggable-word"
			aria-describedby={`word-${word}-instructions`}
			onKeyDown={handleKeyDown}
			className={`
				touch-none
				
				${baseClasses}
				${parentId === "generator" ? generatorClasses : categoryClasses}
				${isDragging ? "bg-transparent text-transparent shadow-transparent" : ""}
				`}
		>
			<span id={`word-${word}-instructions`} className="sr-only">
				{parentId === "generator"
					? "Press Enter or Space to pick up the word and use arrow keys to move."
					: "Press Enter or Space to pick up the word, use arrow keys to move, or press Delete to remove."}
			</span>
			{word}
			{parentId !== "generator" && !isDragging && (
				<button
					type="button"
					tabIndex={0}
					aria-label={`Remove word ${word}`}
					aria-keyshortcuts="Delete"
					className={`
						btn--icon
						p-0
						hidden
						group-focus-within:flex
						items-center justify-center
			    `}
					onPointerDown={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						e.stopPropagation();

						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onRemove?.();
						}
					}}
					onClick={(e) => {
						e.preventDefault();
						onRemove?.();
					}}
				>
					<RiCloseLine />
				</button>
			)}
		</div>
	);
}
