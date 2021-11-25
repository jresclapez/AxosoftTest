const fs = require('fs');

function fileExist(file) {
  return fs.existsSync(file);
}

module.exports = fileExist;
