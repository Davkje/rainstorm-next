import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import WordChip from "./WordChip";
import { RiAddLine, RiCloseFill, RiDeleteBinLine } from "@remixicon/react";
import { Category } from "@/models/ideas";
import EditableText from "./EditableText";
import { Word } from "@/models/wordBanks";

type Props = {
	id: string;
	title: string;
	words: string[];
	handleRemoveCategory: (id: string) => void;
	updateCategoryName: (catId: Category["id"], newName: string) => void;
	addWord: (catId: Category["id"]) => void;
	onRemoveWord: (catId: Category["id"], word: Word) => void;
	onClearCategory: (catId: Category["id"]) => void;
};

export default function IdeaCategory({
	id,
	title,
	words,
	handleRemoveCategory,
	updateCategoryName,
	addWord,
	onRemoveWord,
	onClearCategory,
}: Props) {
	const { setNodeRef } = useDroppable({
		id,
		data: { parentId: id },
	});

	const { setNodeRef: setTrashRef, isOver: isOverTrash } = useDroppable({
		id: `${id}-trash`,
		data: { parentId: id, isTrash: true },
	});

	const { setNodeRef: setEmptyRef } = useDroppable({
		id: `${id}-empty`,
		data: { parentId: id },
	});

	const isMaxWords = words.length >= 10;

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
			className={`flex flex-col text-xl flex-1 p-2 gap-2 border-2 border-rain-600 rounded-lg transition-colors bg-linear-to-b from-transparent to-rain-900/10`}
		>
			<div className="flex justify-between h-max items-center relative">
				<EditableText
					text={title}
					className="text-lg font-bold leading-8 inline-block pr-0"
					tag="h2"
					onChange={(v) => onUpdateCategoryName(id, v)}
					showEditButton
				/>
				<div className="flex absolute top-0 right-0">
					<button
						disabled={isMaxWords}
						onClick={() => {
							handleAddWord();
						}}
						className="btn--icon text-rain-400 hover:text-rain-200 disabled:text-rain-600"
					>
						<RiAddLine />
					</button>
					<button
						type="button"
						ref={setTrashRef}
						onClick={() => onClearCategory(id)}
						aria-label={`Clear all words in ${title}`}
						className={`btn--icon text-rain-400 hover:text-rain-200 rounded-lg ${
							isOverTrash && "text-white bg-red-800/50"
						}`}
					>
						<RiDeleteBinLine />
					</button>
					<button
						onClick={() => {
							handleRemoveCategory(id);
						}}
						className="btn--icon text-rain-400 hover:text-rain-200"
					>
						<RiCloseFill />
					</button>
				</div>
			</div>

			<SortableContext items={words.map((w) => `${id}-${w}`)} strategy={rectSortingStrategy}>
				<div className="flex-1 flex flex-wrap h-full gap-2 text-xl justify-center items-center">
					{words.length === 0 ? (
						<p ref={setEmptyRef} className="text-rain-600">
							Drag word here
						</p>
					) : (
						words.map((word) => (
							<WordChip
								key={word}
								word={word}
								parentId={id}
								onRemove={() => onRemoveWord(id, word)}
							/>
						))
					)}
				</div>
			</SortableContext>
		</div>
	);
}
