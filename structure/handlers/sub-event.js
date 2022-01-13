import {
  CommandInteraction,
  ButtonInteraction,
  SelectMenuInteraction
} from "discord.js";
import Client from "../client.js";

/**
 * @param {CommandInteraction} interaction - Slash command interaction
 * @param {Client} client - New instance of Client
 */
function RunCmd(interaction, client) {}

/**
 * @param {ButtonInteraction} interaction - Button interaction
 * @param {Client} client - New instance of Client
 */
function RunBtn(interaction, client) {}

/**
 * @param {SelectMenuInteraction} interaction - Select menu interaction
 * @param {Client} client - New instance of Client
 */
function RunSelectMenu(interaction, client) {}

export class CmdInteraction {
  /**
   * @param {RunCmd} run - Event run function
   */
  constructor(run) {
    this.type = "CMD";
    this.run = run;
  }
}

export class BtnInteraction {
  /**
   * @param {RunBtn} run - Event run function
   */
  constructor(run) {
    this.type = "BTN";
    this.run = run;
  }
}

export class SelectInteraction {
  /**
   * @param {RunSelectMenu} run - Event run function
   */
  constructor(run) {
    this.type = "SELECT";
    this.run = run;
  }
}