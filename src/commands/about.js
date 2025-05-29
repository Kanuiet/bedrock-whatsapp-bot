module.exports = {
  name: 'about',
  description: 'shows information about the bot',
  usage: '/about',
  permission: 'member',
  execute({ reply }) {
    const text =
      'About:\n' +
      '```A minecraft-whatsapp bot made using Baileys and bedrock-protocol```\n\n' +
      '```github.com/Kanuiet/bedrock-whatsapp-bot```';

    reply(text);
  },
};
