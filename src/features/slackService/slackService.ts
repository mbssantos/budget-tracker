import { IncomingWebhook } from "@slack/webhook";

// Read a url from the environment variables
const url = process.env.SLACK_WEBHOOK_URL;

if (!url) {
  throw new Error(`Slack URL is not defined`);
}

const webhook = new IncomingWebhook(url);

export type UserContactProps = {
  name: string;
  email: string;
  msg: string;
};

const SlackService = {
  async sendMessage(text: string) {
    await webhook.send({ text });
  },

  async userContact(props: UserContactProps) {
    const message = [
      `User *${props.name}* (${props.email}) says:`,
      "```" + props.msg + "```",
    ];

    return SlackService.sendMessage(message.join("\n"));
  },
};

export default SlackService;
