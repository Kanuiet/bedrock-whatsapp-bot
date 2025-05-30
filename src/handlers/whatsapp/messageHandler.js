const commands = require('../../utils/commandLoader.js');
const config = require('../../utils/config.js');

function isOperator(fromJid, userJid, fromMe) {
  return (
    config.hasValue('operators', { groupJid: fromJid, userJid: userJid }) ||
    fromMe
  );
}

/**
 * Handles incoming messages from WhatsApp.
 *
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {string} message
 * @param {string} fromJid - remoteJid
 * @param {boolean} fromMe
 * @param {string} userJid - remoteJid
 * @param {string} pushName
 */
async function handleMessage(
  sock,
  message,
  fromJid,
  fromMe,
  userJid,
  pushName,
) {
  if (!message.startsWith('/')) return;

  const reply = (text, mentionedJid = new Array()) => {
    sock.sendMessage(fromJid, { text: text, mentions: mentionedJid });
  };
  const [cmdName, ...args] = message.slice(1).split(' ');
  const cmd = commands.get(cmdName.toLowerCase());

  if (!cmd) {
    reply(`Unknown command: /${cmdName}. Try \`/help\``);
    return;
  }

  if (cmd.permission === 'operator') {
    if (!isOperator(fromJid, userJid, fromMe)) {
      reply(`Incorrect permission level for command: \`/${cmd.name}\``);
      return;
    }
  }

  try {
    await cmd.execute({
      args,
      fromJid,
      pushName,
      reply,
      commands,
      config,
      sock,
    });
  } catch (err) {
    console.error(err);
    reply('An error occurred while attempting to perform the command');
  }
}

module.exports = { handleMessage };
