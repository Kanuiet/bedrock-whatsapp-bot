const { getPlayerList } = require('../bots/minecraftBot');

module.exports = {
  name: 'list',
  description:
    'shows the names of all currently-connected players in the minecraft server',
  usage: '/list',
  permission: 'member',
  async execute({ reply }) {
    const player_list = getPlayerList();
    const text =
      `There are ${player_list.size} players online:\n` +
      [...player_list.values()]
        .map((name, i) => `\`\`\`${i + 1}. ${name.trim()}\`\`\``)
        .join('\n');
    reply(text);
  },
};
