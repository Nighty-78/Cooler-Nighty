import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import { TextCommand, SlashCommand } from "./handlers/command.js";
import Button from "./handlers/button.js";
import {
  Client as DjsClient,
  ClientOptions,
  Collection,
  CommandInteraction,
  ButtonInteraction,
  SelectMenuInteraction
} from "discord.js";
import {
  CmdInteraction,
  BtnInteraction,
  SelectInteraction
} from "./handlers/sub-event.js";
import {
  registerTextCommands,
  registerButtons,
  registerEvents
} from "./register.js";
import fs from "fs";

export default class Client extends DjsClient {
  /**
   * @typedef {Object} PrivateConfigOptions
   * @property {string} token
   * @property {string} clientId
   */
  
  /**
   * @typedef {Object} Configuration
   * @property {string} prefix
   * @property {string} version
   * @property {PrivateConfigOptions} private
   * @property {boolean} testMode
   * @property {string} testGuild
   */
  
  /**
   * @param {ClientOptions} options - Client options
   * @param {Configuration} config - Bot configuration
   */
  constructor(options, config) {
    super(options);
    /**
     * @type {Collection<string, TextCommand>}
     */
    this.commands = new Collection();
    
    /**
     * @type {Collection<string, SlashCommand>}
     */
    this.slashCmds = new Collection();
    
    /**
     * @type {Collection<string, Button>}
     */
    this.registeredBtns = new Collection();
    
    /**
     * @type {Configuration}
     */
    this.config = config;
    
    /**
     * @type {Object[]}
     */
    this.slashCmdData = [];
    
    /**
     * @typedef {Object} SubEventListeners
     * @property {CmdInteraction[]} cmdInteraction
     * @property {BtnInteraction[]} btnInteraction
     * @property {SelectInteraction[]} selectInteraction
     */
    
    /**
     * @type {SubEventListeners}
     */
    this._subEvents = {
      cmdInteraction: [],
      btnInteraction: [],
      selectInteraction: []
    }
    
    this.rest = new REST({ version: 9 }).setToken(this.config.private.token);
  }
  
  async start() {
    try {
      await registerTextCommands(this);
      await registerButtons(this);
    
      const unfilteredSlash = await fs.promises.readdir("./structure/slash-cmds");
      const slashCmdFiles = await unfilteredSlash.filter(file => file.endsWith(".js"));
      const slashPromises = await slashCmdFiles.map(async(file) => {
        const { default: slash } = await import(`./slash-cmds/${file}`);
        return slash;
      });
      
      /**
       * @type {SlashCommand}
       */
      const slashCmds = await Promise.all(slashPromises);
      
      for (let i = 0; i < slashCmds.length; i++) {
        await this.slashCmds.set(slashCmds[i].name, slashCmds[i]);
        await this.slashCmdData.push(slashCmds[i].data);
      }
      
      await this.removeAllListeners();
      
      this.on("ready", async() => {
        if (this.config.testMode === true) {
          const guild = this.config.testGuild;
          const clientId = this.config.private.clientId;
          await this.rest.put(Routes.applicationGuildCommands(clientId, guild), {
            body: this.slashCmdData
          });
          
          delete this.slashCmdData;
        } else {
          const clientId = this.config.private.clientId;
          await this.rest.put(Routes.applicationCommands(clientId), {
            body: this.slashCmdData
          });
          
          delete this.slashCmdData;
        }
        for (const cmd of slashCmds) {
          console.log(`[Client] - Successfully registered [/] command: ${cmd.name}`);
        }
      });
      
      await registerEvents(this);
      
      const unfilteredSubEvents = await fs.promises.readdir("./structure/sub-events");
      const subEventFiles = await unfilteredSubEvents.filter(file => file.endsWith(".js"));
      
      for (const file of subEventFiles) {
        /**
         * @type {(CmdInteraction | BtnInteraction | SelectInteraction)}
         */
        const { default: subEvent } = await import(`./sub-events/${file}`);
        
        if (subEvent.type === "CMD") {
          await this._subEvents.cmdInteraction.push(subEvent);
        }
        
        if (subEvent.type === "BTN") {
          await this._subEvents.btnInteraction.push(subEvent);
        }
        
        if (subEvent.type === "SELECT") {
          await this._subEvents.selectInteraction.push(subEvent);
        }
      }
      
      await this.login(token);
    } catch(err) {
      console.error(err);
    }
  }
  
  /**
   * @param {("CMD" | "BTN" | "SELECT")} type
   * @param {(CommandInteraction | ButtonInteraction | SelectMenuInteraction)} interaction
   */
  emitSubEvent(type, interaction) {
    if (type === "CMD") {
      for (let i = 0; i < this._subEvents.cmdInteraction.length; i++) {
        const event = this._subEvents.cmdInteraction[i];
        event.run(interaction, this);
      }
    }
    
    if (type === "BTN") {
      for (let i = 0; i < this._subEvents.btnInteraction.length; i++) {
        const event = this._subEvents.btnInteraction[i];
        event.run(interaction, client);
      }
    }
    
    if (type === "SELECT") {
      for (let i = 0; i < this._subEvents.selectInteraction.length; i++) {
        const event = this._subEvents.selectInteraction[i];
        event.run(interaction, this);
      }
    }
  }
}