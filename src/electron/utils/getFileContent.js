const fs = require('fs').promises;

async function getFileContent(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

module.exports = getFileContent;
