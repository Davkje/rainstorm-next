import { getAllWordBanks } from "@/lib/wordBanks";

export async function GET() {
	return Response.json(getAllWordBanks());
}
