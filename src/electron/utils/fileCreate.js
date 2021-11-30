const fs = require('fs').promises;

async function fileCreate(file) {
  const fileHandle = await fs.open(file, 'wx');
  await fileHandle.close();
}

module.exports = fileCreate;
