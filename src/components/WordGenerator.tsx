import { wordBanks } from "@/data/wordBanks";
import { Word, WordBankName } from "@/models/ideas";
import WordChip from "./WordChip";

type Props = {
	currentWord: Word;
	setCurrentWord: (word: Word) => void;
	getRandomWord: (customBank?: WordBankName) => void;
	bank: WordBankName;
	setBank: (bank: WordBankName) => void;
};

export default function WordGenerator({ currentWord, getRandomWord, bank, setBank }: Props) {
	const changeBank = (newBank: WordBankName) => {
		setBank(newBank);
		getRandomWord(newBank);
	};

	return (
		<div className="h-full flex flex-col justify-end items-center gap-4">
			<div className="flex justify-center h-full">
				<div className="flex flex-col justify-center">
					<WordChip word={currentWord} parentId="generator" />
				</div>
			</div>
			<div className="flex flex-wrap gap-2 justify-center w-full">
				{Object.keys(wordBanks).map((bankName) => (
					<button
						key={bankName}
						className={`btn--primary flex-0 py-2 px-4 rounded-xl text-md capitalize border-rain-400 ${
							bankName === bank ? "" : "text-rain-400 border-rain-500"
						} hover:border-rain-400 hover:text-rain-200`}
						onClick={() => changeBank(bankName as WordBankName)}
					>
						{bankName}
					</button>
				))}
			</div>

			<button
				className="btn--primary w-full px-8 py-8  text-xl uppercase font-extrabold"
				onClick={() => getRandomWord()}
			>
				New Word
			</button>
		</div>
	);
}
