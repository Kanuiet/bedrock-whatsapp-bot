const readline = require('node:readline');

async function getUserInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const input = await new Promise((resolve) => rl.question(query, resolve));
  rl.close();
  return input;
}

module.exports = { getUserInput };
