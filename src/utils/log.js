/**
 * Log output with colored text
 *
 * @param {string} service 
 * @param {string} text 
 */
function log(service, text) {
  switch (service) {
    case 'Minecraft':
      console.log(`[\x1b[33m${service}\x1b[0m] ${text}`);
      break;
    case 'WhatsApp':
      console.log(`[\x1b[32m${service}\x1b[0m] ${text}`);
      break;
    default:
      console.log(`[${service}] ${text}`)
  }
}

module.exports = { log };
