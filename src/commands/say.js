const { getClient, getPlayerList } = require('../bots/minecraftBot');

module.exports = {
  name: 'say',
  description: 'send your message to the minecraft server',
  usage: '/say <message>',
  permission: 'member',
  execute({ args, pushName, reply }) {
    if (!args.length) {
      reply('You need to include a message. Usage: /say <message>');
      return;
    }

    const message = args.join(' ');
    const client = getClient();

    //Bypass `insufficient permissions for selector expansion` when cheat disable
    //Still need to be OP though
    for (const player of getPlayerList().values()) {
      client.queue('command_request', {
        command: `/tellraw @p[name=${player}] {"rawtext":[{"text":"<§a${pushName}§r> ${message}"}]}`,
        origin: {
          type: 'player',
          uuid: '',
          request_id: '',
          player_entity_id: [0, 0],
        },
        internal: false,
        version: 'latest',
      });
    }
  },
};
