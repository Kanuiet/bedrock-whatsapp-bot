const {
  processChat,
  processCommandListOutput,
} = require('../handlers/minecraft/minecraftMessageRelay.js');
const { reconnect } = require('../utils/reconnect.js');
const { log } = require('../utils/log.js');
const bedrock = require('bedrock-protocol');
const config = require('../utils/config.js');

let bedrockBot;

function getClient() {
  return bedrockBot;
}

/**
 * Starts Minecraft bot.
 */
function startMinecraftBot() {
  const { getWASocket } = require('../bots/whatsappBot.js');
  const { getFrom } = require('../commands/list.js');
  const ip = config.get('bedrockServer.ip');
  const port = config.get('bedrockServer.port');
  const botName = config.get('botName');

  // Close current connection
  bedrockBot?.close();

  // Connect to minecraft server
  bedrockBot = bedrock.createClient({
    host: ip,
    port: port,
    username: botName || '@',
    offline: true,
    skipPing: true,
  });

  bedrockBot.on('join', () => {
    log('Minecraft' ,'Minecraft bot connected!');
  });

  // Listen for minecraft server chat
  bedrockBot.on('text', (packet) => {
    processChat(getWASocket(), packet);
  });

  // Listen for bot's command output
  bedrockBot.on('command_output', (packet) => {
    processCommandListOutput(getWASocket(), getFrom(), packet);
  });

  bedrockBot.on('kick', (packet) => {
    reconnect('minecraft', `Kicked from the server: ${packet.message}`, startMinecraftBot);
  });

  bedrockBot.on('close', () => {
    reconnect('minecraft', 'Connection closed.', startMinecraftBot);
  });

  bedrockBot.on('error', (error) => {
    reconnect('minecraft', `Connection error: ${error.message}`, startMinecraftBot);
  });
}

module.exports = {
  startMinecraftBot,
  getClient,
};
