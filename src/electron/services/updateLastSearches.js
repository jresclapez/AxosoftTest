const { JSON_FILE_SEARCHES } = require('../constants');
const { fileUpdate } = require('./files');

function updateLastSearches(searchText, searchDate) {
  fileUpdate(JSON_FILE_SEARCHES, function (lastSearches) {
    const searches = lastSearches.filter((item) => item.search !== searchText);

    while (searches.length >= 5) {
      searches.shift();
    }

    searches.push({
      search_text: searchText,
      searched_at: searchDate
    });

    return JSON.stringify(searches);
  });
}

module.exports = updateLastSearches;
