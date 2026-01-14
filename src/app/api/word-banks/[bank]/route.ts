import { wordBanks } from "@/data/wordBanks.server";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { bank: string } }) {
	const bank = params.bank as keyof typeof wordBanks;

	if (!wordBanks[bank]) {
		return NextResponse.json({ error: "Bank not forund" }, { status: 404 });
	}

	return NextResponse.json({
		name: bank,
		words: wordBanks[bank],
	});
}
