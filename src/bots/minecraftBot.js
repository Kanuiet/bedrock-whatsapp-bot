const {
  processChat,
} = require('../handlers/minecraft/minecraftMessageRelay.js');
const { reconnect } = require('../utils/reconnect.js');
const { log } = require('../utils/log.js');
const bedrock = require('bedrock-protocol');
const config = require('../utils/config.js');

const player_list = new Map();

let bedrockBot;

function getClient() {
  return bedrockBot;
}

function getPlayerList() {
  return player_list;
}

/**
 * Starts the Minecraft bot.
 */
function startMinecraftBot() {
  const { getWASocket } = require('../bots/whatsappBot.js');
  const ip = config.get('bedrockServer.ip');
  const port = config.get('bedrockServer.port');
  const botName = config.get('botName');

  // Close current connection
  bedrockBot?.close();

  // Connect to minecraft server
  bedrockBot = bedrock.createClient({
    host: ip,
    port: port,
    username: botName || 'Server',
    profilesFolder: 'auth_mc',
    offline: config.get('offlineMode'),
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
  // bedrockBot.on('command_output', (packet) => {
  // });

  bedrockBot.on('player_list', (packet) => {
    const action = packet.records.type;
    if (action === 'add') {
      for (const player of packet.records.records) {
        player_list.set(player.uuid, player.username);
      }
    } else if (action === 'remove') {
      for (const player of packet.records.records) {
        player_list.delete(player.uuid);
      }
    }
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
  getPlayerList,
};
