import { Category } from "@/models/ideas";
import { Word } from "@/models/wordBanks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiCloseLine } from "@remixicon/react";

type WordChipProps = {
	word: Word;
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
		"flex justify-center items-center rounded-lg text-rain-100 capitalize select-none transition-all";
	const generatorClasses = "px-10 text-3xl bg-rain-700 font-bold uppercase hover:bg-rain-600";
	const categoryClasses =
		"group relative gap-1 bg-rain-700 px-4 py-1 text-lg font-bold hover:bg-rain-600";

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			tabIndex={parentId !== "generator" ? 0 : -1}
			className={`
				${baseClasses}
				${parentId === "generator" ? generatorClasses : categoryClasses}
				${isDragging ? "bg-transparent text-transparent" : ""}
				`}
			onKeyDown={(e) => {
				if (parentId === "generator") return;

				if (e.key === "Backspace" || e.key === "Delete") {
					e.preventDefault();
					onRemove?.();
				}
			}}
		>
			{word}
			{parentId !== "generator" && !isDragging && (
				<button
					onPointerDown={(e) => e.stopPropagation()}
					onClick={(e) => {
						e.preventDefault();
						onRemove?.();
					}}
					className={`
					btn--icon
					p-0
					hidden
					group-focus-within:flex
					items-center justify-center
					`}
					aria-label={`Remove ${word}`}
					tabIndex={0}
				>
					<RiCloseLine />
				</button>
			)}
		</div>
	);
}
