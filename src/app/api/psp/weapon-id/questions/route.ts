import { WeaponIdQuestions } from "@/data/server/psp/weaponIdQuestions";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.getAll("ids");
  return Response.json(
    WeaponIdQuestions.filter(({ id }) => ids.includes(`${id}`))
  );
}
