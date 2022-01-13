import PermissionHandler from "../handlers/permission.js";
import Event from "../handlers/event.js";

export default new Event("messageCreate", (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(client.config.prefix)) return;
  
  const msg = message.content.toLowerCase();
  const args = msg.substring(client.config.prefix.length).split(/ +/);
  const command = client.commands.find((cmd) => {
    if (cmd.name === args[0]) {
      return cmd.name === args[0];
    }
    
    return cmd.aliases.includes(args[0]);
  });
  
  if (!command) return;
  
  const isAllowed = new PermissionHandler(command).isAllowed(message);
  
  if (isAllowed === false) return message.reply("You don\'t have the right permissions!");
  
  command.run(message, args, client);
});