function isTwitterUsername(text) {
  return /^@[A-Za-z0-9_]{1,15}$/.test(text.trim());
}

module.exports = isTwitterUsername;
