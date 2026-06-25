const { getClient } = require('../bots/minecraftBot');

let from;

module.exports = {
  name: 'list',
  description:
    'shows the names of all currently-connected players in the minecraft server',
  usage: '/list',
  permission: 'member',
  async execute({ fromJid }) {
    from = fromJid;
    getClient().queue('command_request', {
      command: '/list',
      origin: {
        type: 'player',
        uuid: '',
        request_id: '',
        player_entity_id: [0, 0],
      },
      internal: false,
      version: 'latest',
    });
  },
  getFrom,
};

function getFrom() {
  return from;
}
