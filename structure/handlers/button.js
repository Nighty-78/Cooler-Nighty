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

export default class ButtonHandler {
  /**
   * @typedef {Object} ButtonHandlerOptions
   * @property {string} btnId
   * @property {*} data
   * @property {Array} [permissions]
   * @property {BtnGuildUsers} [users]
   * @property {BtnRole} [roles]
   * @property {OnButtonClick} onclick
   */
  
  /**
   * @param {ButtonHandlerOptions} options
   */
  constructor(options) {
    this.btnId = options.btnId;
    this.data = options.data;
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