import { getAllWordBanks } from "@/lib/wordBanks";

export default function WordsPage() {
	// ALL WORDS
	const data = getAllWordBanks();

	return (
		<div className="p-2 flex flex-col items-center text-center tracking-wide">
			<h1 className="text-2xl font-bold uppercase">Words</h1>
			<p className="text-md font-normal leading-snug tracking-wide mb-6 max-w-[600px]">
				This is a list of all word banks and their words.
			</p>

			<div className="grid gap-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{data.map((bank) => (
					<div
						key={bank.name}
						className="p-4 flex flex-col items-center text-center tracking-wider"
					>
						<h2 className="text-xl font-normal uppercase mb-2">{bank.name}</h2>
						<ul className="text-rain-300 uppercase">
							{bank.words.map((word) => (
								<li className="hover:text-rain-100 cursor-default" key={word}>
									{word}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
