const { log } = require("./log");

const isReconnecting = {
  whatsapp: false,
  minecraft: false,
};

async function tryReconnect(service, reconnectFunction) {
  try {
    if (typeof reconnectFunction !== 'function') return;
    await reconnectFunction();
  } catch (err) {
    log(service, `Failed to reconnect: ${err}`);
  }
}

/**
 * Reconnecting Minecraft or WhatsApp bot
 *
 * @param {string} service 
 * @param {string} reason 
 * @param {botStartFunction} reconnectFunction - Either 'startWhatsAppBot' or 'startMinecraftBot'
 */
function reconnect(service, reason, reconnectFunction) {
  if (isReconnecting[service]) return;
  isReconnecting[service] = true;

  log(service, reason);
  log(service, 'Reconnecting...');
  setTimeout(async () => {
    isReconnecting[service] = false;
    await tryReconnect(service, reconnectFunction);
  }, 5000);
}

module.exports = { reconnect };
