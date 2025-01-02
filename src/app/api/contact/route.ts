import { SlackService } from "@/features/slackService";
import { UserContactProps } from "@/features/slackService/slackService";
import { type NextRequest } from "next/server";

const minLength = 5;
const maxLength = 4000;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as UserContactProps;

  if (!data?.email || !data.msg || !data.name) {
    return new Response("Invalid parameter", { status: 400 });
  }

  if (
    data.email.length < minLength ||
    data.msg.length < minLength ||
    data.name.length < minLength
  ) {
    return new Response("invalid length", {
      status: 400,
    });
  }

  const totalLength = data.email.length + data.msg.length + data.name.length;
  if (totalLength > maxLength) {
    return new Response("Too long", { status: 400 });
  }

  // send message to slack
  await SlackService.userContact(data);

  // return success
  return new Response("success", { status: 200 });
}
