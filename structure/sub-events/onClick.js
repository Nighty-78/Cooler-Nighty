import PermissionHandler from "../handlers/permission.js";
import { BtnInteraction } from "../handlers/sub-event.js";

export default new BtnInteraction((interaction, client) => {
  const btn = client.registeredBtns.find(b => b.id === interaction.customId);
  try {
    const passed = new PermissionHandler(btn).isAllowed(interaction);
    if (passed === true) {
      btn.click(interaction, client);
    }
    
  } catch(err) {
    console.error(err);
  }
});