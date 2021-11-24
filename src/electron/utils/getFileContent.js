const fs = require('fs');

function getFileContent(file) {
  return fs.readFileSync(file, 'utf8');
}

module.exports = getFileContent;
