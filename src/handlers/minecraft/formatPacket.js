const { getDeathMessage } = require('../../deathMessageTemplate.js');
const { formatEntityName } = require('../../utils/formatEntityName.js');

/**
 * Formats the Minecraft chat packet.
 *
 * @param {packet} packet
 * @returns {string} the formatted Minecraft chat
 */
function formatChatPacket(packet) {
  switch (packet.type) {
    case 'chat':
      return `<${packet.source_name}> ${packet.message}`;
    case 'announcement':
      return `${packet.message}`;
    default:
      return;
  }
}

/**
 * Formats the minecraft events packet.
 *
 * @param {*} packet
 * @returns {string} The formatted event packet
 */
function formatEventPacket(packet) {
  if (
    !packet.message.startsWith('death.') &&
    packet.message !== '§e%multiplayer.player.left' &&
    packet.message !== '§e%multiplayer.player.joined'
  ) {
    return null;
  }

  if (packet.message === '§e%multiplayer.player.left')
    return `${packet.parameters[0]} left the game.`;

  if (packet.message === '§e%multiplayer.player.joined')
    return `${packet.parameters[0]} joined the game.`;

  let entityName = packet.parameters[0] ?? null;
  let attackerName = packet.parameters[1] ?? null;
  const itemName = packet.parameters[2] ?? null;

  if (attackerName?.startsWith('%entity.')) {
    attackerName = formatEntityName(attackerName);
  }

  if (entityName?.startsWith('%entity.')) {
    entityName = formatEntityName(entityName);
  }

  return getDeathMessage(packet.message, entityName, attackerName, itemName);
}

module.exports = {
  formatChatPacket,
  formatEventPacket,
};
