/**
 * Formats a phone number (e.g., '@xxxxxxxxxxxxx' or '+xx xxx-xxxx-xxxx') to 'xxxxxxxxxxxxx'.
 *
 * @param {string} raw
 * @returns {string} A formatted phone number without symbols and spaces.
 */
function formatPhoneNumber(raw) {
  return raw
    .replaceAll('@', '')
    .replaceAll('+', '')
    .replaceAll('-', '')
    .replaceAll(' ', '');
}

module.exports = { formatPhoneNumber };
