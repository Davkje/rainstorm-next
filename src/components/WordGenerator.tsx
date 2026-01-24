import { Word, WordBankName } from "@/models/wordBanks";
import WordChip from "./WordChip";
import { RiArrowRightSFill, RiCloseLine } from "@remixicon/react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Tooltip from "./ui/Tooltip";

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
	return (
		<div className="h-full flex flex-col justify-end items-center gap-2 sm:gap-4">
			<div className="flex justify-center h-full">
				<div
					className={`w-full flex flex-col justify-center items-center transition-opacity duration-75 ${
						isWordLoading ? "opacity-0" : "opacity-100"
					}`}
				>
					{!currentWord && (
						<span className="px-10 text-3xl bg-transparent font-bold flex justify-center items-center text-transparent select-none">
							HIDDEN
						</span>
					)}
					{!currentWord && !isWordLoading && (
						<span className="text-rain-600 select-none text-2xl font-bold uppercase">
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
			<div className="flex flex-col-reverse sm:flex-col-reverse w-full gap-2 sm:gap-2">
				<div className="flex flex-col items-center p-2 gap-2 border-2 rounded-xl w-full border-rain-600 bg-linear-to-b from-transparent to-rain-900/10">
					<div className="flex w-full rounded-xl justify-between gap-2">
						<div className="flex gap-4 justify-center items-center">
							<span className="text-md text-rain-300 uppercase pl-2 font-bold leading-3.5">
								Select Filters
							</span>
							{selectedBanks.length > 0 && (
								<>
									<Tooltip text="Clear active filters">
										<button
											disabled={selectedBanks.length <= 0}
											onClick={onClearSelected}
											className="flex items-center gap-1 uppercase leading-3.5 font-bold text-md py-2 px-4 bg-rain-700 text-rain-300 border-none hover:text-rain-100 hover:bg-rain-600"
										>
											Clear filters:
											<span>{selectedBanks.length}</span>
											<RiCloseLine />
										</button>
									</Tooltip>
								</>
							)}
						</div>
						<Tooltip text="Select Wordbanks">
							<button
								onClick={() => onOpenActiveBank()}
								className="flex items-center text-md uppercase leading-3.5 font-bold rounded-xl py-2 pl-4 pr-2 bg-transparent text-rain-300 border-none hover:text-rain-100 hover:bg-rain-600"
							>
								Active Banks <RiArrowRightSFill />
							</button>
						</Tooltip>
					</div>
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
									<Tooltip key={bank} text="Activate filter">
										<button
											onClick={() => onToggleSelectedBank(bank)}
											className={`text-md uppercase px-4 py-0 ${
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
						{/* <div className="flex gap-2">
							<Tooltip text="Clear active filters">
								<button
									disabled={selectedBanks.length <= 0}
									onClick={onClearSelected}
									className="flex items-center text-md py-0 px-4 text-rain-200 border-rain-500/70 bg-rain-800/50 hover:text-rain-100 hover:border-rain-500 disabled:text-rain-300/60 disabled:bg-rain-700 disabled:border-transparent disabled:cursor-default"
								>
									Clear <RiCloseLine />
								</button>
							</Tooltip>
							<Tooltip text="Select Wordbanks">
								<button
									onClick={() => onOpenActiveBank()}
									className="text-md px-4 py-0 capitalize flex justify-center
								items-center pl-5 pr-2 text-rain-300/60 border-transparent bg-rain-700
							 hover:text-rain-100"
								>
									Banks <RiArrowRightSFill />
								</button>
							</Tooltip>
						</div> */}
					</div>
				</div>
				<button
					className="btn--primary justify-center w-full px-8 py-8 text-xl uppercase font-extrabold"
					onClick={() => onNewWord()}
				>
					New Word
				</button>
			</div>
		</div>
	);
}
