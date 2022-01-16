import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../handlers/command.js";

/**
 * @returns {Promise<number>}
 */
function getInteractionPing(interaction, reply) {
  return new Promise((resolve, reject) => {
    resolve(reply.createdTimestamp - interaction.createdTimestamp);
  });
}

export default new SlashCommand({
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency"),
  users: [
    {
      guildId: "923432047287107646",
      userArr: [
        { id: "815464623905439744", allow: true }
      ]
    }
  ],
  async run(interaction, client) {
    await interaction.deferReply();
    const i = await interaction.editReply("Pong!");
    const ping = await getInteractionPing(interaction, i);
    
    await interaction.followUp(`WebSocket ping: ${client.ws.ping}\nInteraction ping: ${ping}`);
  }
});