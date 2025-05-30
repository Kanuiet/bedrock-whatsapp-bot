const { formatChatPacket, formatEventPacket } = require('./formatPacket.js');
const { processListCommand } = require('./listCommandHandler.js');
const { log } = require('../../utils/log.js');
const config = require('../../utils/config.js');

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

/**
 * Process Minecraft packet and send it to WhatsApp chat.
 *
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {*} packet 
 */
async function processChat(sock, packet) {
  const groupIds = config.get('groupIds');
  if (!groupIds?.length) return;

  let text = null;

  if (packet.type === 'translation') {
    text = formatEventPacket(packet);
  } else {
    text = formatChatPacket(packet);
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
