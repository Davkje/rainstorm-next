import { getWordBankNames } from "@/lib/wordBanks";

export async function GET() {
	return Response.json({ banks: getWordBankNames() });
}
