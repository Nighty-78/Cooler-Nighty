import PermissionHandler from "../handlers/permission.js";
import { CmdInteraction } from "../handlers/sub-event.js";

export default new CmdInteraction((interaction, client) => {
  const command = client.slashCmds.find((cmd) => {
    return cmd.name === interaction.commandName;
  });
  
  if (!command) return interaction.reply("Something really bad happened while running this command...");
  
  const isAllowed = new PermissionHandler(command).isAllowed(interaction);
  
  if (isAllowed === false) {
    return interaction.reply({ content: "You do not have the required permissions for this command", ephemeral: true });
  } else {
    command.run(interaction, client);
  }
});