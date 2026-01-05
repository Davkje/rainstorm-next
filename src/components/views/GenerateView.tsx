import { Category, WordBankName } from "@/models/ideas";
import WordGenerator from "../WordGenerator";
import IdeaCategory from "../IdeaCategory";

type Props = {
	categories: Category[];
	bank: WordBankName;
	isDraggingWord: boolean;
	overCategoryId: string | null;
	draggingFrom: string | null;
	generatedWord: string;
	getRandomWord: () => void;
	setBank: (bank: string) => void;
	setGeneratedWord: (word: string) => void;
};

export default function GenerateView({
	categories,
	isDraggingWord,
	overCategoryId,
	draggingFrom,
	generatedWord,
	getRandomWord,
	bank,
	setBank,
	setGeneratedWord,
}: Props) {
	return (
		<div className="grid grid-cols-2 gap-4 grow">
			<WordGenerator
				currentWord={generatedWord}
				setCurrentWord={setGeneratedWord}
				getRandomWord={getRandomWord}
				bank={bank}
				setBank={setBank}
			/>

			<div className="flex flex-col gap-4">
				{categories.map((category) => (
					<IdeaCategory
						key={category.id}
						id={category.id}
						title={category.name}
						words={category.words}
						isDraggingWord={isDraggingWord}
						overCategoryId={overCategoryId}
						draggingFrom={draggingFrom}
					/>
				))}
			</div>
		</div>
	);
}
