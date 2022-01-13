import "dotenv/config.js";
import { Intents } from "discord.js";
import Client from "./structure/client.js";
import importJSONData from "./data/reader.js";

import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
}, importJSONData("config"));

client.start();
server.listen(PORT, () => console.log(`[Server] - Listening to port: ${PORT}`));