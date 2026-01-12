import { wordBanks } from "@/data/wordBanks.server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const bank = searchParams.get("bank");
	const exclude = searchParams.get("exclude");

	const banks = bank ? [bank] : Object.keys(wordBanks);

	let allWords = banks.flatMap((bank) => wordBanks[bank as keyof typeof wordBanks] ?? []);

	if (exclude) {
		const filtered = allWords.filter((word) => word !== exclude);

		if (filtered.length > 0) {
			allWords = filtered;
		}
	}

	if (allWords.length === 0) {
		return NextResponse.json({ error: "No words found" }, { status: 404 });
	}

	const word = allWords[Math.floor(Math.random() * allWords.length)];

	return NextResponse.json({ word });
}
