const getFileContent = require('../utils/getFileContent');
const fileExists = require('../utils/fileExists');
const { JSON_FILE_SEARCHES } = require('./../constants');

const getLastSearches = async () => {
  if (!(await fileExists(JSON_FILE_SEARCHES))) return [];
  return getFileContent(JSON_FILE_SEARCHES);
};

module.exports = getLastSearches;
