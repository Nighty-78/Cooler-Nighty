import Discord from "discord.js";
import Client from "../client.js";

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function RunFn(client, ...eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
export default class Event {
  /**
   * @param {K} name
   * @param {RunFn<K>} run
   */
  constructor(name, run) {
    this.name = name;
    this.run = run;
  }
}