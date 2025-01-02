import { IcnfQuestions } from "@/data/server/icnf/icnfQuestions";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.getAll("ids");
  return Response.json(IcnfQuestions.filter(({ id }) => ids.includes(`${id}`)));
}
