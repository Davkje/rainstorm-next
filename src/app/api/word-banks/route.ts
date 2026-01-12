import { wordBanks } from "@/data/wordBanks.server";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		banks: Object.keys(wordBanks),
	});
}
