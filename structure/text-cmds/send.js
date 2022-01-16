import { TextCommand } from "../handlers/command.js";
import { MessageActionRow, MessageButton } from "discord.js";

export default new TextCommand({
  name: "send",
  aliases: ["test"],
  description: "Sends a button...",
  async run(msg, args, client) {
    const testBtn = new MessageButton()
      .setCustomId("test_btn")
      .setStyle("PRIMARY")
      .setLabel("Test Button");
    const testRow = new MessageActionRow().addComponents(testBtn);
    
    await msg.reply({
      content: "Click this, Not suspicious at all!",
      components: [testRow]
    });
  }
});