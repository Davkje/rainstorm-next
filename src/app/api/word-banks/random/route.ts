import { getRandomWordFromBank } from "@/lib/wordBanks";
import { WordBankName } from "@/models/wordBanks";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const bank = searchParams.get("bank") as WordBankName | null;
	const exclude = searchParams.get("exclude") ?? undefined;

	if (!bank) {
		return new Response("Missing bank", { status: 400 });
	}

	const word = getRandomWordFromBank(bank, exclude);
	return Response.json({ word });
}
