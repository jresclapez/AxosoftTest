const { JSON_FILE_SEARCHES } = require('../constants');
const fileUpdate = require('../utils/fileUpdate');

function updateLastSearches(searchText) {
  fileUpdate(JSON_FILE_SEARCHES, function (lastSearches) {
    if (!lastSearches) {
      lastSearches = '[]';
    }
    const searches = JSON.parse(lastSearches).filter(
      (item) => item.searchText.toLowerCase() !== searchText.toLowerCase()
    );

    while (searches.length >= 5) {
      searches.pop();
    }

    searches.unshift({ searchText: searchText });

    return JSON.stringify(searches);
  });
}

module.exports = updateLastSearches;
