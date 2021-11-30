const getFileContent = require('../utils/getFileContent');
const { JSON_FILE_SEARCHES } = require('./../constants');

const getLastSearches = async () => {
  return getFileContent(JSON_FILE_SEARCHES);
};

module.exports = getLastSearches;
