import { ButtonInteraction } from "discord.js";
import Client from "../client.js";

/**
 * @param {ButtonInteraction} interaction - Button interaction
 * @param {Client} client - New instance of Client
 */
function OnButtonClick(interaction, client) {}

/**
 * @typedef {Object} BtnUser
 * @property {string} id
 * @property {boolean} allow
 */

/**
 * @typedef {Object} BtnGuildUsers
 * @property {string} guildId
 * @property {BtnUser[]} [userArr]
 */

/**
 * @typedef {Object} BtnRole
 * @property {string} guildId
 * @property {string[]} roleIds
 */

export default class Button {
  /**
   * @typedef {Object} ButtonHandlerOptions
   * @property {string} id
   * @property {Array} [permissions]
   * @property {BtnGuildUsers} [users]
   * @property {BtnRole} [roles]
   * @property {OnButtonClick} onclick
   */
  
  /**
   * @param {ButtonHandlerOptions} options
   */
  constructor(options) {
    this.id = options.id;
    this.permissions = options.permissions;
    this.users = options.users;
    this.roles = options.roles;
    this.onclick = options.onclick;
  }
  
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  click(interaction, client) {
    this.onclick(interaction, client);
  }
}