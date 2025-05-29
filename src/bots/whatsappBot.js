const {
  default: makeWASocket,
  useMultiFileAuthState,
} = require('@whiskeysockets/baileys');
const P = require('pino');
const { handleMessage } = require('../handlers/whatsapp/messageHandler');
const {
  handleConnectionUpdate,
} = require('../handlers/whatsapp/connectionUpdateHandler');
const { log } = require('../utils/log');

let whatsappBot;

function getWASocket() {
  return whatsappBot;
}

function sendLog(remoteJid, userJid, pushName, msg, msgTimestamp) {
  const date = new Date(msgTimestamp);
  const formattedDate =
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, '0')}-` +
    `${String(date.getDay()).padStart(2, 0)} ` +
    `${String(date.getHours()).padStart(2, '0')}:` +
    `${String(date.getMinutes()).padStart(2, '0')}:` +
    `${String(date.getSeconds()).padStart(2, '0')}`;

  log(
    'WhatsApp',
    `when: ${formattedDate} from: ${remoteJid}, user_id: ${userJid}, push_name: ${pushName}, message: ${msg}`,
  );
}

async function startWhatsAppBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');

  whatsappBot = makeWASocket({
    auth: state,
    logger: P({ level: 'silent' }),
  });

  whatsappBot.ev.on('creds.update', saveCreds);

  whatsappBot.ev.on('connection.update', (update) => {
    handleConnectionUpdate(update);
  });

  // Listen for WhatsApp chat
  whatsappBot.ev.on('messages.upsert', async ({ messages }) => {
    if (!messages[0].message) return;

    const remoteJid = messages[0].key.remoteJid;
    const fromMe = messages[0].key.fromMe;
    const userJid = messages[0].key.participant;
    const pushName = messages[0].pushName
      ? messages[0].pushName
      : 'whatsapp_user';
    const msgTimestamp = messages[0].messageTimestamp * 1000;
    const msg =
      messages[0].message?.conversation ||
      messages[0].message?.extendedTextMessage?.text ||
      '(not a text)';

    sendLog(remoteJid, userJid, pushName, msg, msgTimestamp);
    handleMessage(whatsappBot, msg, remoteJid, fromMe, userJid, pushName);
  });
}

module.exports = {
  getWASocket,
  startWhatsAppBot,
};
