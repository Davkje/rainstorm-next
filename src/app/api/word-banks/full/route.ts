import { wordBanks } from "@/data/wordBanks.server";
import { NextResponse } from "next/server";

export async function GET() {
	const banks = Object.entries(wordBanks).map(([name, words]) => ({
		name,
		words,
	}));

	return NextResponse.json(banks);
}
