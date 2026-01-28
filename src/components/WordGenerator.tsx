import { Word, WordBankName } from "@/models/wordBanks";
import WordChip from "./WordChip";
import { RiArrowLeftSFill, RiArrowRightSFill, RiCloseLine } from "@remixicon/react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Tooltip from "./ui/Tooltip";
import { useState } from "react";

type Props = {
	currentWord: Word | null;
	currentBank: WordBankName | null;
	activeBanks: WordBankName[];
	selectedBanks: WordBankName[];
	onToggleSelectedBank: (bank: WordBankName) => void;
	onClearSelected: () => void;
	onNewWord: () => void;
	isWordLoading: boolean;
	areBanksLoading: boolean;
	onOpenActiveBank: () => void;
};

export default function WordGenerator({
	currentWord,
	currentBank,
	activeBanks,
	selectedBanks,
	onToggleSelectedBank,
	onClearSelected,
	onNewWord,
	isWordLoading,
	areBanksLoading,
	onOpenActiveBank,
}: Props) {
	const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

	return (
		<div className="h-full flex flex-col justify-end items-center gap-2 sm:gap-4">
			<div className="flex justify-center h-full">
				<div
					className={`w-full flex flex-col justify-center items-center transition-opacity duration-75 ${
						isWordLoading ? "opacity-0" : "opacity-100"
					}`}
				>
					{/* HIDDEN PLACEHOLDER */}
					{!currentWord && isWordLoading && (
						<span className="px-10 py-3 text-3xl uppercase font-bold flex justify-center items-center text-transparent select-none">
							PLACEHOLDER
						</span>
					)}
					{!currentWord && !isWordLoading && (
						<span className="text-rain-500 px-10 py-3 text-3xl select-none font-bold uppercase text-center">
							Generate below
						</span>
					)}
					{currentWord && (
						<SortableContext items={[`generator-${currentWord}`]} strategy={rectSortingStrategy}>
							<WordChip word={currentWord} parentId="generator" onRemove={onNewWord} />
						</SortableContext>
					)}
				</div>
			</div>
			<div className="flex flex-col w-full gap-2 sm:gap-2">
				{/* GEN BUTTON */}
				<button
					className="bg-transparent hover:bg-rain-600/20 border-rain-600 hover:border-rain-500/60 justify-center w-full px-8 py-4 sm:py-8 text-xl uppercase font-extrabold"
					onClick={() => onNewWord()}
				>
					New Word
				</button>
				{/* FILTERS AND BANKS */}
				<div className="flex flex-col items-center p-2 gap-2 border-2 rounded-lg w-full border-rain-600 bg-linear-to-b from-transparent to-rain-900/10">
					<div className="flex w-full rounded-lg justify-between gap-2">
						<div className="flex w-max sm:gap-2">
							<Tooltip position="topleft" text="View or hide filters">
								<button
									role="button"
									onClick={() => setFiltersOpen((prev) => !prev)}
									className="btn--link h-full flex pl-2 gap-1 justify-center items-center text-rain-300 hover:text-rain-100"
								>
									<span className="btn--link text-sm  uppercase leading-5">Select Filters</span>
									{filtersOpen ? <RiArrowLeftSFill /> : <RiArrowRightSFill />}
								</button>
							</Tooltip>
							{selectedBanks.length > 0 && (
								<>
									<Tooltip text="Clear active filters">
										<button
											disabled={selectedBanks.length <= 0}
											onClick={onClearSelected}
											className="flex items-center h-full text-sm gap-1 uppercase leading-5 p-2 sm:px-4 bg-rain-700 text-rain-300 border-none hover:text-rain-100 hover:bg-rain-600"
										>
											{/* <span> Clear filter: {selectedBanks.length}</span> */}
											<span>Clear</span>
											<RiCloseLine />
										</button>
									</Tooltip>
								</>
							)}
						</div>
						<Tooltip text="Select Wordbanks" position="topright">
							<button
								onClick={() => onOpenActiveBank()}
								className="flex items-center text-sm uppercase leading-5 min-h-10 rounded-lg px-2 sm:px-4 py-2 bg-transparent text-rain-300 border-none hover:text-rain-100 hover:bg-rain-600"
							>
								Active Banks
							</button>
						</Tooltip>
					</div>
					{filtersOpen && (
						<div
							className={`flex flex-wrap gap-2 justify-center w-full transition-opacity duration-300 ${
								areBanksLoading ? "opacity-0" : "opacity-100"
							}`}
						>
							{activeBanks
								.slice()
								.sort((a, b) => a.localeCompare(b))
								.map((bank) => {
									const isSelected = selectedBanks.includes(bank);
									const isCurrentBank = currentBank === bank;
									return (
										<Tooltip key={bank} text="Toggle filter">
											<button
												onClick={() => onToggleSelectedBank(bank)}
												className={`text-sm rounded-lg uppercase font-normal px-4 py-0 ${
													isSelected
														? "text-rain-200 border-rain-500/70 bg-rain-800/50 hover:text-rain-100 hover:border-rain-500"
														: "text-rain-300/60 border-transparent bg-rain-700 hover:text-rain-100"
												} ${isCurrentBank && "!bg-rain-600/80 !text-rain-200"}
								`}
											>
												{bank}
											</button>
										</Tooltip>
									);
								})}
							{activeBanks.length === 0 && (
								<span className="text-lg uppercase text-rain-600">Select Wordbanks</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
