import { getWordBankNames } from "@/lib/wordBanks";

// GET WORD BANK NAMES
export async function GET() {
	return Response.json({ banks: getWordBankNames() });
}
