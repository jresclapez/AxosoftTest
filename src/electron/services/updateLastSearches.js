const { JSON_FILE_SEARCHES } = require('../constants');
const fileUpdate = require('../utils/fileUpdate');

function updateLastSearches(searchText) {
  fileUpdate(JSON_FILE_SEARCHES, function (lastSearches) {
    if (!lastSearches) {
      lastSearches = '[]';
    }
    const searches = JSON.parse(lastSearches).filter(
      (item) => item.search !== searchText
    );

    while (searches.length >= 5) {
      searches.pop();
    }

    searches.unshift({ search_text: searchText });

    return JSON.stringify(searches);
  });
}

module.exports = updateLastSearches;
