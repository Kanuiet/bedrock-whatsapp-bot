function formatPhoneNumber(raw) {
  return raw
    .replaceAll('@', '')
    .replaceAll('+', '')
    .replaceAll('-', '')
    .replaceAll(' ', '');
}

module.exports = { formatPhoneNumber };
