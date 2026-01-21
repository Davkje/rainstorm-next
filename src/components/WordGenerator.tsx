import { Word, WordBankName } from "@/models/wordBanks";
import WordChip from "./WordChip";
import { RiArrowRightSFill, RiCloseLine } from "@remixicon/react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

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
		<div className="h-full flex flex-col justify-end items-center gap-4">
			<div className="flex justify-center h-full">
				<div
					className={`w-full flex flex-col justify-center items-center transition-opacity duration-75 ${
						isWordLoading ? "opacity-0" : "opacity-100"
					}`}
				>
					{!currentWord && !isWordLoading && (
						<span className="text-rain-600 select-none text-2xl font-bold uppercase">
							Generate below
						</span>
					)}
					{!currentWord && (
						<span className="px-10 text-3xl bg-transparent font-bold flex justify-center items-center text-transparent select-none">
							TEST
						</span>
					)}
					{currentWord && (
						<SortableContext items={[`generator-${currentWord}`]} strategy={rectSortingStrategy}>
							<WordChip word={currentWord} parentId="generator" onRemove={onNewWord} />
						</SortableContext>
					)}
				</div>
			</div>
			<div className="flex sm:flex-col gap-2 sm:gap-4">
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
								<button
									key={bank}
									onClick={() => onToggleSelectedBank(bank)}
									className={`text-md px-4 py-0 capitalize ${
										isSelected
											? "text-rain-200 border-rain-500 bg-rain-800 hover:text-rain-100"
											: "text-rain-400 border-transparent bg-rain-700 hover:text-rain-100"
									} ${isCurrentBank && "!bg-rain-600 !text-rain-200"}
								`}
								>
									{bank}
								</button>
							);
						})}
					<div className="flex gap-2">
						<button
							onClick={onClearSelected}
							className={`flex items-center text-md py-0 px-4 border-rain-500 hover:border-rain-400 ${selectedBanks.length <= 0 && "text-rain-400 bg-rain-700 border-transparent hover:border-transparent"}`}
						>
							Clear <RiCloseLine />
						</button>
						<button
							onClick={() => onOpenActiveBank()}
							className="text-md px-4 py-0 capitalize flex justify-center items-center pl-5 pr-2 text-rain-400 border-transparent bg-rain-700 hover:text-rain-100"
						>
							Banks <RiArrowRightSFill />
						</button>
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
