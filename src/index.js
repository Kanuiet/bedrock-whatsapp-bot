const { startWhatsAppBot } = require('./bots/whatsappBot.js');
const { startMinecraftBot } = require('./bots/minecraftBot.js');
const { getUserInput } = require('./utils/userInput.js');
const { reconnect } = require('./utils/reconnect.js');
const { log } = require('./utils/log.js');
const config = require('./utils/config.js');

async function checkIpPort() {
  let ip;
  let port;

  while (true) {
    const ipInput = (
      await getUserInput('Type your Minecraft server IP: ')
    ).trim();

    // Check if the ip is valid
    if (
      ipInput.match(
        /^(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/,
      )
    ) {
      ip = ipInput;
      break;
    }

    log(
      'Minecraft',
      'Invalid IP address. Please enter a valid address (e.g., 127.0.0.1 or example.com).',
    );
  }

  while (true) {
    const portInput = await getUserInput(
      'Type your Minecraft server port (Default: 19132): ',
    );

    // Default port
    if (portInput.trim() === '') {
      port = 19132;
      break;
    }

    port = Number.parseInt(portInput, 10);

    if (!Number.isNaN(port) && port > 0 && port < 65536) break;

    log('Minecraft', 'Invalid port. Please enter a number between 1 and 65536');
  }

  config.set('bedrockServer.ip', ip);
  config.set('bedrockServer.port', port);
}

async function checkBotName() {
  let name;

  while (true) {
    const nameInput = await getUserInput(
      'Type your Minecraft bot name (Default: Server): ',
    );

    // Default bot name
    if (nameInput.trim() === '') {
      name = 'Server';
      break;
    }

    name = nameInput;
    break;
  }

  config.set('botName', name);
}

// Load config
async function init() {
  config.load();

  if (
    config.get('bedrockServer.ip') === null ||
    config.get('bedrockServer.port') === null
  ) {
    await checkIpPort();
  }

  if (config.get('botName') === null) {
    await checkBotName();
  }
}

// Main function
async function start() {
  await init();

  try {
    startWhatsAppBot();
  } catch (err) {
    reconnect(
      'Minecraft',
      `An error occurred while starting the WhatsApp bot: ${err}`,
      startWhatsAppBot,
    );
  }

  try {
    startMinecraftBot();
  } catch (err) {
    reconnect(
      'Minecraft',
      `An error occurred while starting the Minecraft bot: ${err}`,
      startMinecraftBot,
    );
  }
}

start();
