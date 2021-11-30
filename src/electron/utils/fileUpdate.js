const fs = require('fs').promises;

// if file not exists,   new file its created
async function fileUpdate(file, data) {
  await fs.writeFile(file, JSON.stringify(data));
}

module.exports = fileUpdate;
