import { getAllWordBanks } from "@/lib/wordBanks";

export default function WordsPage() {
	const data = getAllWordBanks();

	return (
		<div className="flex flex-col items-center text-center tracking-wide">
			<h1 className="text-3xl font-bold uppercase">Words</h1>
			<p className="text-md font-light leading-snug tracking-wide text-rain-300 mb-6 max-w-[600px]">
				This is a list of all word banks and their words.
			</p>

			<div className="grid gap-4 w-full max-w-[1000px] md:grid-cols-2 lg:grid-cols-3">
				{data.map((bank) => (
					<div
						key={bank.name}
						className="border border-rain-600 rounded-lg p-4 flex flex-col items-center text-center hover:bg-rain-700 transition-colors duration-200"
					>
						<h2 className="text-2xl font-bold uppercase mb-2">{bank.name}</h2>
						<ul className="text-rain-100 list-disc list-inside">
							{bank.words.map((word) => (
								<li key={word}>{word}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
