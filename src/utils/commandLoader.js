const fs = require('node:fs');
const path = require('node:path');

const commands = new Map();
const commandDir = path.join(__dirname, '..', 'commands');
const files = fs.readdirSync(commandDir);

for (const file of files) {
  const command = require(path.join(commandDir, file));
  if (command?.name) {
    commands.set(command.name, command);
  }
}

module.exports = commands;
