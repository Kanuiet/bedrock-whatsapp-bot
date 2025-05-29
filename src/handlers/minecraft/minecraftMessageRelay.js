const { log } = require('../../utils/log.js');
const config = require('../../utils/config.js');
const handleChat = require('./chatHandler.js');
const handleTranslation = require('./translationHandler.js');
const processListCommand = require('./listCommandHandler.js');

function sendLog(text) {
  const date = new Date();
  const formattedDate =
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, '0')}-` +
    `${String(date.getDay()).padStart(2, 0)} ` +
    `${String(date.getHours()).padStart(2, '0')}:` +
    `${String(date.getMinutes()).padStart(2, '0')}:` +
    `${String(date.getSeconds()).padStart(2, '0')}`;

  log('Minecraft', `when: ${formattedDate}, text: ${text}`);
}

async function processChat(sock, packet) {
  const groupIds = config.get('groupIds');
  if (!groupIds?.length) return;

  let text = null;

  if (packet.type === 'translation') {
    text = handleTranslation(packet);
  } else {
    text = handleChat(packet);
  }

  if (!text) return;

  text = `\`${text.replaceAll(/§./g, '')}\``;

  sendLog(text);

  for (const groupId of groupIds) {
    sock.sendMessage(groupId, { text: text });
  }
}

module.exports = {
  processChat,
  processCommandListOutput: processListCommand,
};
