// export async function getRandomWord(bank?: string) {
// 	const url = bank ? `/api/word-banks/random?bank=${bank}` : `/api/word-banks/random`;

// 	const res = await fetch(url);
// 	if (!res.ok) throw new Error("Failed to fetch word");

// 	const data = await res.json();
// 	return data.word as string;
// }
