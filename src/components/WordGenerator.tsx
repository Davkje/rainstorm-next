import { Word, WordBankName } from "@/models/wordBanks";
import WordChip from "./WordChip";

type Props = {
	currentWord: Word;
	banks: WordBankName[];
	activeBank: WordBankName;
	onChangeBank: (bank: WordBankName) => void;
	onNewWord: () => void;
};

export default function WordGenerator({
	currentWord,
	banks,
	activeBank,
	onChangeBank,
	onNewWord,
}: Props) {
	return (
		<div className="h-full flex flex-col justify-end items-center gap-4">
			<div className="flex justify-center h-full">
				<div className="flex flex-col justify-center">
					<WordChip word={currentWord} parentId="generator" />
				</div>
			</div>
			<div className="flex flex-wrap gap-2 justify-center w-full">
				{banks.map((bank) => (
					<button
						key={bank}
						onClick={() => onChangeBank(bank)}
						className={`btn--primary flex-0 py-2 px-4 rounded-xl text-md capitalize border-rain-400 ${
							activeBank === bank ? "" : "text-rain-400 border-rain-500"
						} hover:border-rain-400 hover:text-rain-200`}
					>
						{bank}
					</button>
				))}
			</div>

			<button
				className="btn--primary w-full px-8 py-8  text-xl uppercase font-extrabold"
				onClick={() => onNewWord()}
			>
				New Word
			</button>
		</div>
	);
}
