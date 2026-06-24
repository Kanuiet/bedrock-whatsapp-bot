const { Boom } = require('@hapi/boom');
const { DisconnectReason } = require('@whiskeysockets/baileys');
const { log } = require('../../utils/log.js');
const { reconnect } = require('../../utils/reconnect.js');

/**
 * Handles the connection close from WhatsApp.
 *
 * @param {*} lastDisconnect
 */
function handleConnectionClose(lastDisconnect) {
  const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  const { startWhatsAppBot } = require('../../bots/whatsappBot.js');

  switch (reason) {
    case DisconnectReason.badSession:
      log(
        'WhatsApp',
        `Invalid session detected. Please delete the folder 'auth/' and scan the QR code again.`,
      );
      return process.exit(1); // To remove warning from the biome lint.

    case DisconnectReason.connectionLost:
      reconnect(
        'WhatsApp',
        'Lost connection to the WhatsApp server.',
        startWhatsAppBot,
      );
      break;

    case DisconnectReason.connectionClosed:
      reconnect('WhatsApp', 'Connection closed.', startWhatsAppBot);
      break;

    case DisconnectReason.connectionReplaced:
      log(
        'WhatsApp',
        'This session has been replaced by another connection. Please close the other session first.',
      );
      return process.exit(1); // To remove warning from the biome lint.

    case DisconnectReason.forbidden:
      log(
        'WhatsApp',
        `Access denied. Please delete the folder 'auth/' and scan the QR code again.`,
      );
      return process.exit(1); // To remove warning from the biome lint.

    case DisconnectReason.loggedOut:
      log(
        'WhatsApp',
        `You have been logged out. Please delete the folder 'auth/' and scan the QR code to log in again.`,
      );
      return process.exit(1); // To remove warning from the biome lint.

    case DisconnectReason.multideviceMismatch:
      reconnect(
        'WhatsApp',
        'Multi-device mismatch. Please close other active sessions first.',
        startWhatsAppBot,
      );
      break;

    case DisconnectReason.restartRequired:
      reconnect(
        'WhatsApp',
        'WhatsApp bot requires a restart.',
        startWhatsAppBot,
      );
      break;

    default:
      log('WhatsApp', `Disconnected due to an unknown reason (${reason}).`);
      return process.exit(1); // To remove warning from the biome lint.
  }
}

/**
 * Handles the connection update from WhatsApp.
 *
 * @param {*} update
 */
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
