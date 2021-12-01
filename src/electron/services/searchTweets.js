const httpSearchTweets = require('../http/httpSearchTweets');
const updateLastSearches = require('./updateLastSearches');
const SearchTweetsByUsername = require('./SearchTweetsByUsername');
const isTwitterUsername = require('../utils/isTwitterUsername');

async function searchTweets(searchText) {
  await updateLastSearches(searchText);

  if (isTwitterUsername(searchText)) {
    return await SearchTweetsByUsername(searchText);
  } else {
    return await httpSearchTweets(searchText);
  }
}

module.exports = searchTweets;
