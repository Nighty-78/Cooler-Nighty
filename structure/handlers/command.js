import { Message, CommandInteraction } from "discord.js";
import Client from "../client.js";

class CommandStructure {
  constructor(options) {
    this.name = options.name.toLowerCase(); // Required string option for both types
    this.adminOverride = options.adminOverride || true;
    this.run = options.run; // Run function for the command
  }
}

/**
 * @param {Message} msg - Discord message
 * @param {string[]} args - Text command arguments
 * @param {Client} client - New instance of Client
 */
function TextCommandRun(msg, args, client) {}

/**
 * @param {CommandInteraction} interaction - Slash command interaction
 * @param {Client} client - New instance of Client
 */
function SlashCommandRun(interaction, client) {}

/**
 * @typedef {Object} CmdUser
 * @property {string} id
 * @property {boolean} allow
 */

/**
 * @typedef {Object} CmdGuildUsers
 * @property {string} guildId
 * @property {CmdUser[]} [userArr]
 */

/**
 * @typedef {Object} CmdRole
 * @property {string} guildId
 * @property {string[]} roleIds
 */

export class TextCommand extends CommandStructure {
  /**
   * @typedef {Object} TextCmdOptions
   * @property {string} name
   * @property {string[]} [aliases]
   * @property {string} description
   * @property {boolean} [adminOverride]
   * @property {Array} [permissions]
   * @property {CmdGuildUsers[]} [users]
   * @property {CmdRole[]} [roles]
   * @property {TextCommandRun} run
   */
  
  /**
   * @param {TextCmdOptions} options
   */
  constructor(options) {
    super(options);
    this.aliases = options.aliases;
    this.description = options.description; // A nice description
    this.permissions = options.permissions; // Very simple permission handling...
    this.users = options.users; // Disable perms for some users from some guilds...
    this.roles = options.roles; // Allow usage for people with these guild roles
  }
  
  /**
   * @param {Client} client - A Client
   */
  refresh(client) {
    client.commands.set(this.name, this);
  }
  
  /**
   * @param {string} name
   */
  changeName(name) {
    this.name = name;
  }
}

export class SlashCommand extends CommandStructure {
  /**
   * @typedef {Object} SlashCmdOptions
   * @property {string} name
   * @property {*} data
   * @property {boolean} [adminOverride]
   * @property {Array} [permissions]
   * @property {CmdGuildUsers[]} [users]
   * @property {CmdRole[]} [roles]
   * @property {SlashCommandRun} run
   */
  
  /**
   * @param {SlashCmdOptions} options
   */
  constructor(options) {
    super(options);
    this.data = options.data.toJSON(); // New instance of SlashCommandBuilder toJSON
    this.permissions = options.permissions; // Also some simple permission handling
    this.users = options.users; // Same for both slash and text
    this.roles = options.roles; // Same for both slash and text
  }
}