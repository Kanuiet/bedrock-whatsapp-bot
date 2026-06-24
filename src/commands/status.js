const config = require('../utils/config.js');
const bedrock = require('bedrock-protocol');
const ping = require('ping');

module.exports = {
  name: 'status',
  description: 'shows the current status for any minecraft bedrock server',
  usage: '/status <ip> <port>',
  permission: 'member',
  async execute({ args, reply }) {
    let ip = args[0];
    let port = args[1] ? Number.parseInt(args[1], 10) : 19132;

    if (!args.length) {
      ip = config.get('bedrockServer.ip');
      port = config.get('bedrockServer.port');
    }

    let text;

    const res = await ping.promise.probe(ip);
    await bedrock
      .ping({ host: ip, port: port })
      .then((serverStatus) => {
        text =
          `Status for ${ip}:${port}:\n` +
          `\`\`\`MOTD:       ${serverStatus.motd}\`\`\`\n` +
          `\`\`\`Version:    ${serverStatus.version}\`\`\`\n` +
          `\`\`\`Players:    ${serverStatus.playersOnline}/${serverStatus.playersMax}\`\`\`\n` +
          `\`\`\`Gamemode:   ${serverStatus.gamemode}\`\`\`\n` +
          `\`\`\`Level Name: ${serverStatus.levelName}\`\`\`\n` +
          `\`\`\`Protocol:   ${serverStatus.protocol}\`\`\`\n` +
          `\`\`\`Latency:    ${res.time} ms\`\`\``;
      })
      .catch(() => {
        if (res.host) {
          text = `Connection to server timed out. (${ip}:${port})`;
        } else {
          text = `Server appears to be offline or unreachable. (${ip}:${port})`;
        }
      });

    reply(text);
  },
};
