import { WordBank } from "@/models/wordBanks";

export default async function WordsPage() {
	const res = await fetch("http://localhost:3000/api/word-banks/full", {
		cache: "no-store",
	});

	if (!res.ok) {
		return <p>Failed to load word banks</p>;
	}

	const data: WordBank[] = await res.json();

	return (
		<>
			<h1 className="text-3xl font-bold uppercase text-center">Words</h1>
			<p className="text-xl text-center">Här ska man kunna se alla ord</p>
			<div className="grid grid-cols-4">
				{data.map((bank) => (
					<div key={bank.name} className="p-4">
						<h2 className="text-2xl font-extrabold uppercase">{bank.name}</h2>

						<ul className="grid">
							{bank.words.map((word) => (
								<li className="text-xl uppercase" key={word}>
									{word}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</>
	);
}
