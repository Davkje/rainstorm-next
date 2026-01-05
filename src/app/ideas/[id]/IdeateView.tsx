export default function IdeateView() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold">Ideate view (coming soon)</h1>
		</div>
	);
}

// import IdeaCategory from "@/components/IdeaCategory";
// import WordGenerator from "@/components/WordGenerator";
// import { Category, WordBankName } from "@/models/ideas";

// type Props = {
// 	categories: Category[];
// 	bank: WordBankName;
// 	isDraggingWord: boolean;
// 	overCategoryId: string | null;
// 	draggingFrom: string | null;
// 	generatedWord: string;
// 	getRandomWord: () => void;
// 	setBank: (bank: string) => void;
// 	setGeneratedWord: (word: string) => void;
// };

// export default function IdeateView({
// 	categories,
// 	isDraggingWord,
// 	overCategoryId,
// 	draggingFrom,
// 	generatedWord,
// 	getRandomWord,
// 	bank,
// 	setBank,
// 	setGeneratedWord,
// }: Props) {
// 	return (
// 		<div className="grid grid-cols-2 gap-4 grow">
// 			<WordGenerator
// 				currentWord={generatedWord}
// 				setCurrentWord={setGeneratedWord}
// 				getRandomWord={getRandomWord}
// 				bank={bank}
// 				setBank={setBank}
// 			/>

// 			<div className="flex flex-col gap-4">
// 				{categories.map((category) => (
// 					<IdeaCategory
// 						key={category.id}
// 						id={category.id}
// 						title={category.name}
// 						words={category.words}
// 						isDraggingWord={isDraggingWord}
// 						overCategoryId={overCategoryId}
// 						draggingFrom={draggingFrom}
// 					/>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
