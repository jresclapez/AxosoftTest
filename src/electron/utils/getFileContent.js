const fs = require('fs').promises;
const fileExists = require('../utils/fileExists');

async function getFileContent(file) {
  if (await fileExists(file)) {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  }
  return [];
}

module.exports = getFileContent;
