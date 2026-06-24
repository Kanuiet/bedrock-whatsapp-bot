const { formatPhoneNumber } = require('../utils/formatPhoneNumber.js');

module.exports = {
  name: 'deop',
  description: 'revokes operator status from a whatsapp user',
  usage: '/deop <phoneNumber>',
  permission: 'operator',
  async execute({ args, fromJid, reply, config, sock }) {
    if (!args.length) {
      reply('You need to include a phone number. Usage: /op <phoneNumber>');
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

    if (!members.includes(userJid)) {
      reply('No targets matched selector');
      return;
    }

    if (
      !config.hasValue('operators', { groupJid: fromJid, userJid: userJid })
    ) {
      reply(`@${phoneNumber} is not an operator.`, [userJid]);
      return;
    }

    try {
      config.remove('operators', { groupJid: fromJid, userJid: userJid });
      reply(`De-opped: @${phoneNumber}`, [userJid]);
    } catch (err) {
      console.log(
        `An error occurred while trying to remove @${phoneNumber} as an operator: ${err}`,
      );
      reply(
        `Couldn't remove @${phoneNumber} from the operator. Try again later.`,
        [userJid],
      );
    }
  },
};
