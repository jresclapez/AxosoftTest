const fs = require('fs').promises;

async function fileExists(file) {
  try {
    await fs.stat(file);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

module.exports = fileExists;
