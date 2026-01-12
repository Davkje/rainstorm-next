"use client";

import { useEffect, useState } from "react";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from "@dnd-kit/core";
import type { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { Category, DragOverData, DragWordData, Idea } from "@/models/ideas";
// import { wordBanks } from "@/data/wordBanks";

import WordGenerator from "@/components/WordGenerator";
import WordChip from "@/components/WordChip";
import IdeaCategory from "@/components/IdeaCategory";
import { RiAddLine } from "@remixicon/react";
import { Word, WordBankName } from "@/models/wordBanks";

type Props = {
	idea: Idea;
	setIdea: React.Dispatch<React.SetStateAction<Idea | null>>;
	onAddCategory: () => void;
	onRemoveCategory: (id: string) => void;
};

export default function IdeateView({ idea, setIdea, onAddCategory, onRemoveCategory }: Props) {
	const sensors = useSensors(useSensor(PointerSensor));

	const [draggingWord, setDraggingWord] = useState<{
		word: Word;
		parentId: string;
	} | null>(null);

	const [isDraggingWord, setIsDraggingWord] = useState(false);
	const [overCategoryId, setOverCategoryId] = useState<string | null>(null);

	const [banks, setBanks] = useState<WordBankName[]>([]);
	const [bank, setBank] = useState<WordBankName>("nature");
	const [currentWord, setCurrentWord] = useState<Word>("rain");

	useEffect(() => {
		fetch("/api/word-banks")
			.then((res) => res.json())
			.then((data) => setBanks(data.banks));
	}, []);

	const getRandomWord = async (customBank?: WordBankName) => {
		const bankToUse = customBank ?? bank;

		const res = await fetch(`/api/word-banks/random?bank=${bankToUse}`);

		if (!res.ok) return;

		const data = await res.json();
		setCurrentWord(data.word);
	};

	const handleChangeBank = (newBank: WordBankName) => {
		setBank(newBank);
		getRandomWord(newBank);
	};

	const updateCategoryName = (catId: Category["id"], newName: string) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((c) => (c.id === catId ? { ...c, name: newName } : c)),
				updatedAt: Date.now(),
			};
		});
	};

	/* -------------------- DND HANDLERS -------------------- */

	const handleDragStart = (event: DragStartEvent) => {
		const data = event.active.data?.current as { word: Word; parentId: string } | undefined;
		if (!data) return;

		setDraggingWord(data);
		setIsDraggingWord(true);
	};

	const handleDragOver = (event: DragOverEvent) => {
		const overParent = event.over?.data?.current?.parentId;
		setOverCategoryId(overParent ?? null);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingWord(null);
		setIsDraggingWord(false);
		setOverCategoryId(null);

		const { active, over } = event;
		if (!active || !over) return;

		const activeData = active.data?.current as DragWordData;
		const overData = over.data?.current as DragOverData;

		if (!activeData || !overData) return;

		const { word, parentId: from } = activeData;
		const to = overData.parentId;

		// Hindra drop i generator
		if (to === "generator") return;

		let generateWordOnDrop = false;

		setIdea((prev) => {
			if (!prev) return prev;

			/* -------- TRASH -------- */
			if ("isTrash" in overData && overData.isTrash && from !== "generator") {
				return {
					...prev,
					categories: prev.categories.map((c) =>
						c.id === from ? { ...c, words: c.words.filter((w) => w !== word) } : c
					),
					updatedAt: Date.now(),
				};
			}

			/* -------- FROM GENERATOR -------- */
			if (from === "generator") {
				generateWordOnDrop = true;

				return {
					...prev,
					categories: prev.categories.map((c) =>
						c.id === to && !c.words.includes(word) ? { ...c, words: [...c.words, word] } : c
					),
					updatedAt: Date.now(),
				};
			}

			/* -------- BETWEEN CATEGORIES -------- */
			if (from !== to) {
				const target = prev.categories.find((c) => c.id === to);
				if (target?.words.includes(word)) return prev;

				return {
					...prev,
					categories: prev.categories.map((c) => {
						if (c.id === from) return { ...c, words: c.words.filter((w) => w !== word) };
						if (c.id === to) return { ...c, words: [...c.words, word] };
						return c;
					}),
					updatedAt: Date.now(),
				};
			}

			/* -------- REORDER IN SAME CATEGORY -------- */
			if (!("word" in overData)) return prev;

			const category = prev.categories.find((c) => c.id === from);
			if (!category) return prev;

			const oldIndex = category.words.indexOf(word);
			const newIndex = category.words.indexOf(overData.word);

			if (oldIndex === -1 || newIndex === -1) return prev;

			const newWords = arrayMove(category.words, oldIndex, newIndex);

			return {
				...prev,
				categories: prev.categories.map((c) => (c.id === from ? { ...c, words: newWords } : c)),
				updatedAt: Date.now(),
			};
		});

		if (generateWordOnDrop) {
			getRandomWord(); // New word when you drag from generator
		}
	};

	const handleRemoveCategory = (id: string) => {
		onRemoveCategory(id);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			<div className="grid grid-cols-2 gap-4">
				<WordGenerator
					currentWord={currentWord}
					banks={banks}
					activeBank={bank}
					onChangeBank={handleChangeBank}
					onNewWord={getRandomWord}
				/>

				<div className="flex flex-col gap-4">
					{idea.categories.map((cat) => (
						<IdeaCategory
							key={cat.id}
							id={cat.id}
							title={cat.name}
							words={cat.words}
							isDraggingWord={isDraggingWord}
							overCategoryId={overCategoryId}
							handleRemoveCategory={handleRemoveCategory}
							draggingFrom={draggingWord?.parentId || null}
							updateCategoryName={updateCategoryName}
						/>
					))}
					<button
						onClick={onAddCategory}
						className="flex justify-center items-center gap-2 p-2 text-lg text-rain-400 border-2 rounded-xl text-center"
					>
						<RiAddLine />
						Add category
					</button>
				</div>

				<DragOverlay dropAnimation={null}>
					{draggingWord ? (
						<WordChip word={draggingWord.word} parentId={draggingWord.parentId} />
					) : null}
				</DragOverlay>
			</div>
		</DndContext>
	);
}
