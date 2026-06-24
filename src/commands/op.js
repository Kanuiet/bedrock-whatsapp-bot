const { formatPhoneNumber } = require('../utils/formatPhoneNumber');

module.exports = {
  name: 'op',
  description: 'grants operator status to a whatsapp user',
  usage: '/op <phoneNumber>',
  permission: 'operator',
  async execute({ args, fromJid, reply, config, sock }) {
    if (!args.length) {
      reply('You need to include a phone number . Usage: /op <phoneNumber>');
      return;
    }

    if (fromJid.includes('@s.whatsapp.net')) {
      reply(`You can't use this command in a user chat.`);
      return;
    }

    const groupMeta = await sock.groupMetadata(fromJid);
    const participants = groupMeta.participants;
    const members = [];

    for (const participant of participants) {
      members.push(participant.id);
    }

    let phoneNumber = args.join(' ');
    phoneNumber = formatPhoneNumber(phoneNumber);

    const userJid = `${phoneNumber}@s.whatsapp.net`;

    // return if the user is not part of the group chat
    if (!members.includes(userJid)) {
      reply('No targets matched selector');
      return;
    }

    if (config.hasValue('operators', { groupJid: fromJid, userJid: userJid })) {
      reply(`@${phoneNumber} is already an operator.`, [userJid]);
      return;
    }

    try {
      config.append('operators', { groupJid: fromJid, userJid: userJid });
      reply(`Opped: @${phoneNumber}`, [userJid]);
    } catch (err) {
      console.log(
        `An error occurred while trying to add @${phoneNumber} as an operator: ${err}`,
      );
      reply(`Couldn't add @${phoneNumber} as an operator. Try again later.`, [
        userJid,
      ]);
    }
  },
};
