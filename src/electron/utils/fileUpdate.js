const fs = require('fs').promises;
const fileExists = require('./fileExists');

// if file not exists,   new file its created
async function fileUpdate(file, onRead) {
  if (!(await fileExists(file))) {
    await fs.open(file, 'wx');
  }
  const data = await fs.readFile(file, { encoding: 'utf8', flag: 'r' });
  await fs.writeFile(file, onRead(data));
}
module.exports = fileUpdate;
