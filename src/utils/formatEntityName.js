// %entity.zombie_villger_v2.name -> Zombie Villager
function formatEntityName(raw) {
  return raw 
    .replace('%entity.', '')
    .replace('_v2', '')
    .replace('.name', '')
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = formatEntityName;
