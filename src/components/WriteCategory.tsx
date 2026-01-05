import { Category } from "@/models/ideas";

type Props = {
	categories: Category[];
};

export default function WriteCategory({ categories }: Props) {
	return (
		<>
			<div className="flex flex-col h-full gap-4 rounded-lg">
				{categories.map((category) => (
					<div key={category.id} className="flex flex-col gap-1 text-left text-2xl">
						<div className="flex gap-2">
							<label className="text-3xl" htmlFor={category.id}>
								{category.name}
							</label>
							<div className="flex gap-2 flex-wrap">
								{category.words.map((word) => (
									<div key={word} className="flex justify-center items-center gap-2">
										<p className="capitalize text-slate-600 flex justify-center items-center">
											{word}
										</p>
									</div>
								))}
							</div>
						</div>
						<textarea
							name={category.name}
							id={category.id}
							className="border-2 border-slate-600 p-2 rounded-lg resize-none placeholder-slate-700"
							placeholder={`${category.words.join(", ")}...?`}
							rows={3}
						></textarea>
					</div>
				))}
			</div>
		</>
	);
}
