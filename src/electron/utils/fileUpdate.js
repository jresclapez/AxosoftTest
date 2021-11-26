const fs = require('fs');
const fileExists = require('./fileExists');
// if file not exists,   new file its created
function fileUpdate(file, formatFunction) {
  if (!fileExists(file)) {
    fs.openSync(file, 'wx');
  }
  const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  fs.writeFileSync(file, formatFunction(data));
}

module.exports = fileUpdate;
