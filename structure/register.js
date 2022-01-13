import Client from "./client.js";
import Event from "./handlers/event.js";
import { TextCommand } from "./handlers/command.js";
import fs from "fs";

const fsPromises = fs.promises;

/**
 * @param {Client} client - New instance of Client...
 */
export async function registerTextCommands(client) {
  const unfilteredTxtCmdFiles = await fsPromises.readdir("./structure/text-cmds");
  const txtCmdFiles = await unfilteredTxtCmdFiles.filter(file => file.endsWith(".js"));
  const txtCmdPromises = await txtCmdFiles.map(async(file) => {
    const { default: txt } = await import(`./text-cmds/${file}`);
    return txt;
  });
  
  /**
   * @type {TextCommand[]}
   */
  const txtCmds = await Promise.all(txtCmdPromises);
  
  for (let i = 0; i < txtCmds.length; i++) {
    await client.commands.set(txtCmds[i].name, txtCmds[i]);
    console.log(`[Client] - Successfully registered command: "${txtCmds[i].name}"`);
  }
}

/**
 * @param {Client} client - Client...
 */
export async function registerEvents(client) {
  const unfilteredFiles = await fsPromises.readdir("./structure/events");
  const files = await unfilteredFiles.filter(file => file.endsWith(".js"));
  
  for (let i = 0; i < files.length; i++) {
    /**
     * @type {Event}
     */
    const { default: event } = await import(`./events/${files[i]}`);
    client.on(event.name, event.run.bind(null, client));
  }
}