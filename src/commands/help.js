module.exports = {
  name: 'help',
  description: 'provides list of commands',
  usage: '/help <page>',
  permission: 'member',
  execute({ args, reply, commands }) {
    const itemsPerPage = 7;
    const commandsList = Array.from(commands.values());
    const totalPages = Math.ceil(commandsList.length / itemsPerPage);

    // if args is NaN
    const int = Number.parseInt(args[0], 10) || 1;
    // if args is 0 below
    let page = int < 1 ? 1 : int;

    if (page > totalPages) {
      page = totalPages;
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageCommands = commandsList.slice(start, end);

    const header = `--- Showing help page ${page} of ${totalPages} (/help <page>) ---\n`;
    const content = pageCommands
      .map((cmd) => `\`\`\`${cmd.usage} - ${cmd.description}\`\`\``)
      .join('\n');

    reply(header + content);
  },
};
