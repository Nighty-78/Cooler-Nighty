import Event from "../handlers/event.js";

export default new Event("interactionCreate", (client, interaction) => {
  if (interaction.isCommand()) {
    client.emitSubEvent("CMD", interaction);
    return;
  }
  if (interaction.isButton()) {
    client.emitSubEvent("BTN", interaction);
    return;
  }
  if (interaction.isSelectMenu()) {
    client.emitSubEvent("SELECT", interaction);
    return;
  }
});