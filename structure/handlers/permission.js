import {
  Message,
  CommandInteraction,
  ButtonInteraction
} from "discord.js";
import { TextCommand, SlashCommand } from "./command.js";
import Button from "./button.js";

export default class PermissionHandler {
  /**
   * @param {(TextCommand | SlashCommand | Button)} command - Can be a button
   */
  constructor(command) {
    this.command = command;
  }
  
  /**
   * Checks someone is allowed to use a command or a button
   * @param {(Message | CommandInteraction | ButtonInteraction)} msg
   */
  isAllowed(msg) {
    if (this.command.permissions && this.command.permissions.length !== 0) {
      const o = this.command.adminOverride;
      if (!msg.member.permissions.has(this.command.permissions, o)) return false;
    }
    
    
    if (this.command.roles && this.command.roles.length !== 0) {
      const guildRoles = this.command.roles.find(r => r.guildId === msg.guild.id);
      if (guildRoles && guildRoles.roleIds && guildRoles.roleIds.length) {
        let bool = true;
        for (let i = 0; i < guildRoles.roleIds.length; i++) {
          if (!msg.member.roles.cache.has(guildRoles.roleIds[i])) {
            bool = false;
            break;
          }
        }
        
        if (bool === false) {
          return false;
        }
      }
    }
    
    if (this.command.users && this.command.users.length !== 0) {
      const guildUsers = this.command.users.find(u => u.guildId === msg.guild.id);
      if (guildUsers && guildUsers.userArr && guildUsers.userArr.length) {
        const userArr = guildUsers.userArr;
        // Supports both interactions and messages... i think...
        const foundUser = userArr.find(u => u.id === msg.member.user.id);
        if (!foundUser) return true;
        
        if (foundUser.allow === false) {
          return false;
        }
        
        return true;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}