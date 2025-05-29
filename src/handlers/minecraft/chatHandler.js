module.exports = function handleChat(packet) {
  switch (packet.type) {
    case 'chat':
      return `<${packet.source_name}> ${packet.message}`;
    case 'announcement':
      return `${packet.message}`;
    default:
      return;
  }
};
