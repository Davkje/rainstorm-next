import { NextRequest, NextResponse } from "next/server";
import { getAllWordBanks } from "@/lib/wordBanks";

// GET BANK
export async function GET(_req: NextRequest, { params }: { params: Promise<{ bank: string }> }) {
	const { bank } = await params;

	// FIND BANK IN ALL BANKS
	const banks = getAllWordBanks();
	const found = banks.find((b) => b.name === bank);

	if (!found) {
		return NextResponse.json({ error: "Bank not found" }, { status: 404 });
	}

	return NextResponse.json(found);
}
