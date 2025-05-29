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
        player_entity_id: undefined,
      },
      internal: false,
      version: 86,
    });
  },
  getFrom,
};

function getFrom() {
  return from;
}
