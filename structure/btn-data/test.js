import Button from "../handlers/button.js";

export default new Button({
  id: "test_btn",
  async onclick(interaction, client) {
    interaction.reply("You pressed the Test Button");
  }
});