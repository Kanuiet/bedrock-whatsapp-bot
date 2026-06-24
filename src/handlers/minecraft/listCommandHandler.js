/**
 * Formats the Minecraft command 'list' and send it to WhatsApp chat.
 *
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {string} from - remoteJid
 * @param {*} packet
 */
function processListCommand(sock, from, packet) {
  // playerNums = [playersOnline, playersMax]
  // playerNames = ['Steve', 'Alex', ...]
  const playerNums = packet.output[0].parameters;
  const playerNames = packet.output[1].parameters[0].split(',');

  const header = `There are ${playerNums.join('/')} players online:\n`;

  // ```1. Steve```
  // ```2. Alex```
  // ```3. ...```
  const list = playerNames
    .map((name, i) => `\`\`\`${i + 1}. ${name.trim()}\`\`\``)
    .join('\n');

  sock.sendMessage(from, { text: header + list });
}

module.exports = { processListCommand };
