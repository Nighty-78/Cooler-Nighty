import { TextCommand } from "../handlers/command.js";
import { Permissions } from "discord.js";

export default new TextCommand({
  name: "ping",
  aliases: ["latency"],
  description: "Check client WebSocket ping and message ping.",
  adminOverride: true,
  permissions: [
    Permissions.FLAGS.SEND_MESSAGES
  ],
  roles: [
    {
      guildId: "923432047287107646",
      roleIds: ["925418026159996990"]
    }
  ],
  users: [
    {
      guildId: "923432047287107646",
      userArr: [
        { id: "815464623905439744", allow: true }
      ]
    }
  ],
  async run(msg, args, client) {
    const wsPing = client.ws.ping;
    const m = await msg.reply("Calculating ping...");
    const ping = m.createdTimestamp - msg.createdTimestamp;
    m.edit(`WebSocket ping: ${wsPing}ms\nMessage ping: ${ping}ms`);
  }
});