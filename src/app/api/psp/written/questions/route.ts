import { LupaWrittenQuestions } from "@/data/server/psp/lupaWrittenQuestions";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.getAll("ids");
  return Response.json(
    LupaWrittenQuestions.filter(({ id }) => ids.includes(`${id}`))
  );
}
