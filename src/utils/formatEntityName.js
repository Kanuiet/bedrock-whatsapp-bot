/**
 * Format entity name (e.g., '%entity.zombie_villager_v2.name') to Zombie Villager
 *
 * @param {string} raw 
 * @returns {string} A formatted entity name
 */
function formatEntityName(raw) {
  return raw 
    .replace('%entity.', '')
    .replace('_v2', '')
    .replace('.name', '')
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = { formatEntityName };
