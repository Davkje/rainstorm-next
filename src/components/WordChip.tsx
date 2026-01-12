import { Category, Word } from "@/models/ideas";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type WordChipProps = {
	word: Word;
	parentId: Category["id"] | "generator";
};

export default function WordChip({ word, parentId }: WordChipProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: `${parentId}-${word}`, // unikt ID för varje chip
		data: {
			type: "word",
			word,
			parentId,
		},
	});

	// Visuell animation för flyttning
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: "grab",
	};

	const baseClasses =
		"flex justify-center items-center rounded-lg text-rain-100 capitalize select-none transition-all";
	const generatorClasses = "px-10 text-3xl font-bold uppercase hover:bg-rain-700";
	const categoryClasses = "bg-rain-700 px-4 py-1 text-lg font-bold hover:bg-rain-600";

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`
				${baseClasses}
				${parentId === "generator" ? generatorClasses : categoryClasses}
				${isDragging ? "bg-black-trans text-rain-600" : ""}
				`}
		>
			{word}
		</div>
	);
}
