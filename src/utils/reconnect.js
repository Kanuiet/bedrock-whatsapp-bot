const { log } = require("./log");

const isReconnecting = {
  whatsapp: false,
  minecraft: false,
};

function format(service) {
  let serviceName;
  if (service === 'minecraft') {
    serviceName = 'Minecraft';
  } else {
    serviceName = 'WhatsApp';
  }

  return serviceName;
}

async function tryReconnect(service, reconnectFunction) {
  try {
    if (typeof reconnectFunction !== 'function') return;
    await reconnectFunction();
  } catch (err) {
    log(service, `Failed to reconnect: ${err}`);
  }
}

function reconnect(service, reason, reconnectFunction) {
  if (isReconnecting[service]) return;
  const serviceF = format(service);
  isReconnecting[service] = true;

  log(serviceF, reason);
  log(serviceF, 'Reconnecting...');
  setTimeout(async () => {
    isReconnecting[service] = false;
    await tryReconnect(service, reconnectFunction);
  }, 5000);
}

module.exports = { reconnect };
