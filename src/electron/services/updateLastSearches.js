const { JSON_FILE_SEARCHES } = require('../constants');
const fileUpdate = require('../utils/fileUpdate');
const getFileContent = require('../utils/getFileContent');

// storage of last 5 searches in the OS temporal path
async function updateLastSearches(searchText) {
  const lastSearches = await getFileContent(JSON_FILE_SEARCHES);

  const searches = lastSearches.filter(
    (item) => item.searchText.toLowerCase() !== searchText.toLowerCase()
  );

  while (searches.length >= 5) {
    searches.pop();
  }

  searches.unshift({ searchText: searchText });

  await fileUpdate(JSON_FILE_SEARCHES, searches);
}

module.exports = updateLastSearches;
