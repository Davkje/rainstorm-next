import { NextRequest, NextResponse } from "next/server";
import { getRandomWordFromBank, getWordBankNames } from "@/lib/wordBanks";
import { WordBankName } from "@/models/wordBanks";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const bank = searchParams.get("bank");
	const exclude = searchParams.get("exclude") ?? undefined;

	if (!bank) {
		return NextResponse.json({ error: "Missing bank" }, { status: 400 });
	}

	const validBanks = getWordBankNames();

	if (!validBanks.includes(bank as WordBankName)) {
		return NextResponse.json({ error: "Invalid bank" }, { status: 400 });
	}

	try {
		const word = getRandomWordFromBank(bank as WordBankName, exclude);

		return NextResponse.json({ word });
	} catch (error) {
		return NextResponse.json({ error: `Failed to generate word ${error}` }, { status: 500 });
	}
}
