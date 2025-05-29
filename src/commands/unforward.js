module.exports = {
  name: 'unforward',
  description: 'stop forwarding minecraft chat messages to this group chat',
  usage: '/unforward',
  permission: 'operator',
  execute({ fromJid, reply, config }) {
    if (!config.hasValue('groupIds', fromJid)) {
      reply('Forwarding is already turned off for this group chat.');
      return;
    }

    try {
      config.remove('groupIds', fromJid);
      reply('This group chat will no longer receive Minecraft chat messages.');
    } catch (err) {
      console.error(
        `An error occurred while trying to save current config to ${config.getPath()}: ${err}`,
      );
      reply(`Couldn't stop forwarding Minecraft chat. Try again later.`);
    }
  },
};
