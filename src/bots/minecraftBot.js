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

function sendMessage(name, message) {
  getClient().queue('command_request', {
    command: `/tellraw @a {"rawtext":[{"text":"<§a${name}§r> ${message}"}]}`,
    origin: {
      type: 'player',
      uuid: '',
      request_id: '',
      player_entity_id: [0, 0],
    },
    internal: false,
    version: 'latest',
  });
}

/**
 * Starts the Minecraft bot.
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
    log('Minecraft', 'Minecraft bot connected!');
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
    reconnect(
      'Minecraft',
      `Kicked from the server: ${packet.message}`,
      startMinecraftBot,
    );
  });

  bedrockBot.on('close', () => {
    reconnect('Minecraft', 'Connection closed.', startMinecraftBot);
  });

  bedrockBot.on('error', (error) => {
    reconnect(
      'Minecraft',
      `Connection error: ${error.message}`,
      startMinecraftBot,
    );
  });
}

module.exports = {
  startMinecraftBot,
  getClient,
  sendMessage,
};
