const getTweets = require('./twitter');
const updateLastSearches = require('./updateLastSearches');

async function searchTweets(searchText) {
  // updateLastSearches(searchText);

  return await getTweets(searchText);
}

module.exports = searchTweets;
