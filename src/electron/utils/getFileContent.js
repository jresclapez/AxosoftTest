const fs = require('fs');

function getFileContent(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

module.exports = getFileContent;
