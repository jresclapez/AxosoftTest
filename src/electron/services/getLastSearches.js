const getFileContent = require('../utils/getFileContent');
const fileExist = require('../utils/fileExists');
const { JSON_FILE_SEARCHES } = require('./../constants');

const getLastSearches = () => {
  if (!fileExist(JSON_FILE_SEARCHES)) return [];
  return getFileContent(JSON_FILE_SEARCHES);
};

module.exports = getLastSearches;
