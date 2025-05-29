const { Boom } = require('@hapi/boom');
const { DisconnectReason } = require('@whiskeysockets/baileys');
const { reconnect } = require('../../utils/reconnect.js');
const { log } = require('../../utils/log.js');

function handleConnectionClose(lastDisconnect) {
  const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  const { startWhatsAppBot } = require('../../bots/whatsappBot.js');

  switch (reason) {
    case DisconnectReason.badSession:
      log(
        'WhatsApp',
        `Invalid session detected. Please delete the folder 'auth/' and scan the QR code again.`,
      );
      return process.exit(1);

    case DisconnectReason.connectionLost:
      reconnect(
        'whatsapp',
        'Lost connection to the WhatsApp server.',
        startWhatsAppBot,
      );
      break;

    case DisconnectReason.connectionClosed:
      reconnect('whatsapp', 'Connection closed.', startWhatsAppBot);
      break;

    case DisconnectReason.connectionReplaced:
      log(
        'WhatsApp',
        'This session has been replaced by another connection. Please close the other session first.',
      );
      return process.exit(1);

    case DisconnectReason.forbidden:
      log(
        'WhatsApp',
        `Access denied. Please delete the folder 'auth/' and scan the QR code again.`,
      );
      return process.exit(1);

    case DisconnectReason.loggedOut:
      log(
        'WhatsApp',
        `You have been logged out. Please delete the folder 'auth/' and scan the QR code to log in again.`,
      );
      return process.exit(1);

    case DisconnectReason.multideviceMismatch:
      reconnect(
        'whatsapp',
        'Multi-device mismatch. Please close other active sessions first.',
        startWhatsAppBot,
      );
      break;

    case DisconnectReason.restartRequired:
      reconnect(
        'whatsapp',
        'WhatsApp bot requires a restart.',
        startWhatsAppBot,
      );
      break;

    default:
      log('WhatsApp', `Disconnected due to an unknown reason (${reason}).`);
      return process.exit(1);
  }
}

function handleConnectionUpdate(update) {
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    log('WhatsApp', 'Please scan the QR code');
    require('qrcode-terminal').generate(qr, { small: true });
  }

  if (connection === 'open') {
    log('WhatsApp', 'WhatsApp bot connected!');
  }

  if (connection === 'close') {
    handleConnectionClose(lastDisconnect);
  }
}

module.exports = { handleConnectionUpdate };
