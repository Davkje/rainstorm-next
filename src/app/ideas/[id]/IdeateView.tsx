"use client";

import { useEffect, useState } from "react";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	KeyboardSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragOverlay,
	Active,
	Over,
} from "@dnd-kit/core";

import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Category, DragOverData, DragWordData, Idea } from "@/models/ideas";

import WordGenerator from "@/components/WordGenerator";
import WordChip from "@/components/WordChip";
import IdeaCategory from "@/components/IdeaCategory";
import { Word, WordBankName } from "@/models/wordBanks";
import { useGlobalKeys } from "@/utils/useGlobalKeys";
import ActiveBanksOverlay from "@/components/ActiveBanksSelector";

type Props = {
	idea: Idea;
	setIdea: React.Dispatch<React.SetStateAction<Idea | null>>;
	onRemoveCategory: (id: string) => void;
	onAddCategory: () => void;
};

export default function IdeateView({ idea, setIdea, onRemoveCategory, onAddCategory }: Props) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const [draggingWord, setDraggingWord] = useState<{
		word: Word;
		parentId: string;
	} | null>(null);

	// ALL BANKS
	const [banks, setBanks] = useState<WordBankName[]>([]);
	// ACTIVE BANKS IN PROJECT
	const activeBanks = idea.activeBanks;
	// SELECTED BANKS FOR FILTER
	const [selectedBanks, setSelectedBanks] = useState<WordBankName[]>([]);
	// WORD IN GENERATOR
	const [currentWord, setCurrentWord] = useState<Word | null>(null);
	// BANK OF CURRENT WORD
	const [currentBank, setCurrentBank] = useState<WordBankName | null>(null);

	const [isWordLoading, setIsWordLoading] = useState(true);
	const [areBanksLoading, setAreBanksLoading] = useState(true);

	const [showActiveBanksOverlay, setShowActiveBanksOverlay] = useState(false);

	const maxWordsPerCategory = 10;

	/* -------------------- WORD -------------------- */

	const getRandomWord = async () => {
		if (banks.length === 0) {
			setIsWordLoading(false);
			return;
		}

		setIsWordLoading(true);

		// SELECTED, OTHERWISE ACTIVE, OTHERWISE ALL BANKS
		const banksToUse =
			selectedBanks.length > 0 ? selectedBanks : activeBanks.length > 0 ? activeBanks : banks;

		const index = Math.floor(Math.random() * banksToUse.length);
		const bankToUse = banksToUse[index];

		const res = await fetch(
			`/api/word-banks/random?bank=${bankToUse}${currentWord ? `&exclude=${currentWord}` : ""}`,
		);

		if (!res.ok) {
			setIsWordLoading(false);
			return;
		}

		const { word } = await res.json();
		setCurrentWord(word);
		setCurrentBank(bankToUse);
		setIsWordLoading(false);
	};

	const addWord = (catId: Category["id"]) => {
		if (!currentWord) return;

		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((cat) => {
					if (cat.id !== catId) return cat;
					if (cat.words.length >= 10) return cat;

					// NO DOUBLES
					if (cat.words.includes(currentWord)) return cat;

					return {
						...cat,
						words: [...cat.words, currentWord],
					};
				}),
				updatedAt: Date.now(),
			};
		});

		getRandomWord();
	};

	const removeWordFromCategory = (catId: Category["id"], word: Word) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((cat) =>
					cat.id === catId ? { ...cat, words: cat.words.filter((w) => w !== word) } : cat,
				),
				updatedAt: Date.now(),
			};
		});
	};

	/* -------------------- BANKS -------------------- */

	const toggleActiveBank = (bank: WordBankName) => {
		const currentActive = idea.activeBanks;

		const nextActive = currentActive.includes(bank)
			? currentActive.filter((b) => b !== bank)
			: [...currentActive, bank];

		// UPDATE IDEA& ACTIVE BANKS
		setIdea((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				activeBanks: nextActive,
				updatedAt: Date.now(),
			};
		});

		// SYNC SELECTED
		setSelectedBanks((sel) => sel.filter((b) => nextActive.includes(b)));
	};

	const toggleSelectedBank = (bank: WordBankName) => {
		setSelectedBanks((prev) =>
			prev.includes(bank) ? prev.filter((b) => b !== bank) : [...prev, bank],
		);
	};

	const clearSelectedBanks = () => {
		setSelectedBanks([]);
	};

	/* -------------------- CATEGORY -------------------- */

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

	const handleRemoveCategory = (id: string) => {
		onRemoveCategory(id);
	};

	const clearCategory = (catId: Category["id"]) => {
		setIdea((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				categories: prev.categories.map((c) => (c.id === catId ? { ...c, words: [] } : c)),
				updatedAt: Date.now(),
			};
		});
	};

	/* -------------------- DND HANDLERS -------------------- */

	const handleDragStart = (event: DragStartEvent) => {
		const data = event.active.data?.current as { word: Word; parentId: string } | undefined;
		if (!data) return;

		setDraggingWord(data);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingWord(null);

		const { active, over } = event;
		if (!active || !over) return;

		const activeData = active.data?.current as DragWordData;
		const overData = over.data?.current as DragOverData;

		if (!activeData || !overData) return;

		const { word, parentId: from } = activeData;
		const to = overData.parentId;

		// Max Words
		const targetCategory = idea.categories.find((c) => c.id === to);
		if (targetCategory && targetCategory.words.length >= maxWordsPerCategory && from !== to) {
			return;
		}

		/* -------- DROP ON GENERATOR -------- */
		if (to === "generator" && from !== "generator") {
			// REMOVE WORD IF DROPED IN GENERATOR
			setIdea((prev) => {
				if (!prev) return prev;

				return {
					...prev,
					categories: prev.categories.map((c) =>
						c.id === from ? { ...c, words: c.words.filter((w) => w !== word) } : c,
					),
					updatedAt: Date.now(),
				};
			});

			return;
		}

		let generateWordOnDrop = false;

		setIdea((prev) => {
			if (!prev) return prev;

			/* -------- TRASH -------- */
			if ("isTrash" in overData && overData.isTrash && from !== "generator") {
				return {
					...prev,
					categories: prev.categories.map((c) =>
						c.id === from ? { ...c, words: c.words.filter((w) => w !== word) } : c,
					),
					updatedAt: Date.now(),
				};
			}

			/* -------- FROM GENERATOR -------- */
			if (from === "generator") {
				generateWordOnDrop = true;

				return {
					...prev,
					categories: prev.categories.map((c) => {
						if (c.id !== to) return c;
						if (c.words.length >= maxWordsPerCategory) return c;
						if (c.words.includes(word)) return c;

						return { ...c, words: [...c.words, word] };
					}),
					updatedAt: Date.now(),
				};
			}

			/* -------- BETWEEN CATEGORIES -------- */
			if (from !== to) {
				const target = prev.categories.find((c) => c.id === to);
				if (!target) return prev;
				if (target.words.length >= maxWordsPerCategory) return prev;
				if (target.words.includes(word)) return prev;

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
			setCurrentWord("");
			getRandomWord();
		}
	};

	/* -------------------- GLOBAL KEYS -------------------- */

	useGlobalKeys(
		"n",
		() => {
			getRandomWord();
		},
		{
			ignoreInputs: true,
		},
	);
	// SHOW BANKS
	useGlobalKeys(
		"b",
		() => {
			setShowActiveBanksOverlay(true);
		},
		{ ignoreInputs: true },
	);

	/* -------------------- INIT -------------------- */
	useEffect(() => {
		let cancelled = false;

		const init = async () => {
			setAreBanksLoading(true);
			setIsWordLoading(true);

			const banksRes = await fetch("/api/word-banks");
			if (!banksRes.ok) return;

			const { banks } = await banksRes.json();
			if (cancelled || banks.length === 0) return;

			setBanks(banks);

			setSelectedBanks([]);

			setAreBanksLoading(false);

			await getRandomWord();
		};

		init();

		return () => {
			cancelled = true;
		};
	}, []);

	/* -------------------- ACCESIBILITY ANOUNCEMENTS -------------------- */

	const announcements = {
		onDragStart({ active }: { active: Active }) {
			return `Word "${active.id}" picked up. Use arrow keys to move. Press Enter or Space to drop.`;
		},
		onDragOver({ active, over }: { active: Active; over: Over | null }) {
			if (over) {
				return `Word "${active.id}" moved over ${over.id}.`;
			}
		},
		onDragEnd({ active, over }: { active: Active; over: Over | null }) {
			if (over) {
				return `Word "${active.id}" dropped into ${over.id}.`;
			}
		},
		onDragCancel({ active }: { active: Active }) {
			return `Dragging of word "${active.id}" cancelled.`;
		},
	};

	return (
		<DndContext
			sensors={sensors}
			accessibility={{ announcements }}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="flex flex-col-reverse gap-4 sm:grid grid-cols-1 sm:grid-cols-2">
				<WordGenerator
					currentWord={currentWord}
					currentBank={currentBank}
					activeBanks={activeBanks}
					selectedBanks={selectedBanks}
					onToggleSelectedBank={toggleSelectedBank}
					onClearSelected={clearSelectedBanks}
					onNewWord={getRandomWord}
					isWordLoading={isWordLoading}
					areBanksLoading={areBanksLoading}
					onOpenActiveBank={() => setShowActiveBanksOverlay(true)}
				/>

				<div className="flex flex-col gap-2 sm:gap-4">
					{idea.categories.length === 0 && (
						<div className="flex flex-col text-center grow justify-center items-center text-rain-400">
							<span className="text-xl">No categoires</span>
							<button onClick={() => onAddCategory()} className="btn--primary text-xl">
								Add new category
							</button>
						</div>
					)}
					{idea.categories.map((cat) => (
						<IdeaCategory
							key={cat.id}
							id={cat.id}
							title={cat.name}
							words={cat.words}
							handleRemoveCategory={handleRemoveCategory}
							updateCategoryName={updateCategoryName}
							addWord={addWord}
							onRemoveWord={removeWordFromCategory}
							onClearCategory={clearCategory}
						/>
					))}
				</div>
				{showActiveBanksOverlay && (
					<ActiveBanksOverlay
						banks={banks}
						activeBanks={activeBanks}
						onToggleBank={toggleActiveBank}
						onClose={() => setShowActiveBanksOverlay(false)}
					/>
				)}

				<DragOverlay dropAnimation={null}>
					{draggingWord ? (
						<WordChip word={draggingWord.word} parentId={draggingWord.parentId} />
					) : null}
				</DragOverlay>
			</div>
		</DndContext>
	);
}
