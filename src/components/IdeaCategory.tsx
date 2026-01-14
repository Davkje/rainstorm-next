import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import WordChip from "./WordChip";
import { RiAddLine, RiCloseFill, RiDeleteBinLine } from "@remixicon/react";
import { Category } from "@/models/ideas";
import EditableText from "./EditableText";

type Props = {
	id: string;
	title: string;
	words: string[];
	// isDraggingWord: boolean;
	// overCategoryId: string | null;
	// draggingFrom: string | null;
	handleRemoveCategory: (id: string) => void;
	updateCategoryName: (catId: Category["id"], newName: string) => void;
	addWord: (catId: Category["id"]) => void;
};

export default function IdeaCategory({
	id,
	title,
	words,
	// isDraggingWord,
	// overCategoryId,
	// draggingFrom,
	handleRemoveCategory,
	updateCategoryName,
	addWord,
}: Props) {
	const { setNodeRef } = useDroppable({
		id,
		data: { parentId: id },
	});

	const { setNodeRef: setTrashRef, isOver: isOverTrash } = useDroppable({
		id: `${id}-trash`,
		data: { parentId: id, isTrash: true },
	});

	const onUpdateCategoryName = (id: string, v: string) => {
		const catId = id;
		const newName = v;
		updateCategoryName(catId, newName);
	};

	const handleAddWord = () => {
		addWord(id);
	};

	return (
		<div
			ref={setNodeRef}
			className={`flex flex-col text-xl flex-1 p-2 border-2 border-rain-600 rounded-lg transition-colors`}
		>
			<div className="flex justify-between items-center">
				<EditableText
					text={title}
					className="text-lg font-bold leading-8 inline-block"
					tag="h2"
					onChange={(v) => onUpdateCategoryName(id, v)}
				/>
				<div className="flex">
					<button
						onClick={() => {
							handleAddWord();
						}}
						className="btn--icon text-rain-600 hover:text-rain-300"
					>
						<RiAddLine />
					</button>
					<span
						ref={setTrashRef}
						className={`material-symbols-outlined rounded p-1 transition-all duration-200 ${
							isOverTrash ? "text-white bg-red-800/50" : "text-rain-600"
						}`}
					>
						<RiDeleteBinLine />
					</span>
					<button
						onClick={() => {
							handleRemoveCategory(id);
						}}
						className="btn--icon text-rain-600 hover:text-rain-300"
					>
						<RiCloseFill />
					</button>
				</div>
			</div>

			<SortableContext items={words.map((w) => `${id}-${w}`)} strategy={rectSortingStrategy}>
				<div className="flex-1">
					<div className="flex flex-wrap h-full gap-2 text-xl justify-center items-center">
						{words.length === 0 ? (
							<p className="text-rain-600 self-center">Drag word here</p>
						) : (
							words.map((word) => <WordChip key={word} word={word} parentId={id} />)
						)}
					</div>
				</div>
			</SortableContext>
			{/* <div className={`flex justify-end`}>
				<span
					ref={setTrashRef}
					className={`
			material-symbols-outlined rounded p-1 transition-all duration-200
			${
				isDraggingWord && overCategoryId === id && draggingFrom !== "generator"
					? "opacity-100 scale-100"
					: "opacity-0 scale-50"
			}
			${isOverTrash ? "text-white bg-red-800/50" : "text-rain-400"}
		`}
				>
					<RiDeleteBinLine />
				</span>
			</div> */}
		</div>
	);
}
