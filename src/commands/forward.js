module.exports = {
  name: 'forward',
  description: 'forward minecraft chat messages to this group chat',
  usage: '/forward',
  permission: 'operator',
  execute({ fromJid, reply, config }) {
    if (config.hasValue('groupIds', fromJid)) {
      reply('Minecraft chat is already forwarded to this group chat.');
      return;
    }

    try {
      config.append('groupIds', fromJid);
      reply(
        `This group chat will now receive Minecraft chat messages from ${config.get('bedrockServer.ip')}.`,
      );
    } catch (err) {
      console.error(
        `An error occurred while trying to save current config to ${config.getPath()}: ${err}`,
      );
      reply(
        `Couldn't start forwarding Minecraft chat to this group chat. Try again later.`,
      );
    }
  },
};
