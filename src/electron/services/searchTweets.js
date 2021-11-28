const httpSearchTweets = require('../http/httpSearchTweets');
const updateLastSearches = require('./updateLastSearches');

async function searchTweets(searchText) {
  await updateLastSearches(searchText);
  return await httpSearchTweets(searchText);
}

module.exports = searchTweets;
