import { getAllWordBanks } from "@/lib/wordBanks";

export default async function WordsPage() {
	const data = getAllWordBanks();

	return (
		<>
			<h1 className="text-3xl font-bold uppercase text-center">Words</h1>
			<p className="text-xl text-center">This is all the word banks and words.</p>

			<div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3">
				{data.map((bank) => (
					<div key={bank.name} className="p-4">
						<h2 className="text-2xl font-extrabold uppercase">{bank.name}</h2>
						<ul>
							{bank.words.map((word) => (
								<li key={word}>{word}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</>
	);
}
