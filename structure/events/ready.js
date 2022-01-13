import Event from "../handlers/event.js";

export default new Event("ready", (client) => {
  client.user.setActivity("You | +!help won\'t work :)", {
    type: "WATCHING"
  });
  console.log("[Client] - Bot is ready!");
});