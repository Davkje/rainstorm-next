interface addCatProps {
	addCategory: () => void;
}

export default function AddCategoryBtn({ addCategory }: addCatProps) {
	return (
		<button
			onClick={addCategory}
			className="p-2 text-lg text-rain-400 border-2 rounded-xl text-center"
		>
			Create new category
		</button>
	);
}
