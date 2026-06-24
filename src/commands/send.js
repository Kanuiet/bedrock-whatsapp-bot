const { getClient } = require('../bots/minecraftBot');

module.exports = {
  name: 'send',
  description: 'send your message to the minecraft server',
  usage: '/send <message>',
  permission: 'member',
  execute({ args, pushName, reply }) {
    if (!args.length) {
      reply('You need to include a message. Usage: /send <message>');
      return;
    }

    const message = args.join(' ');
    const client = getClient();

    client.queue('text', {
      type: 'chat',
      needs_translation: false,
      source_name: client.username || '',
      message: `<§a${pushName}§r> ${message}`,
      xuid: '',
      platform_chat_id: '',
      filtered_message: '',
    });
  },
};
