import { getAllWordBanks } from "@/lib/wordBanks";

// ALL WORD BANKS WITH CONTENT
export async function GET() {
	return Response.json(getAllWordBanks());
}
