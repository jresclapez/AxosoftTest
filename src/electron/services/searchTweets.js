const httpSearchTweets = require('../http/httpSearchTweets');
const updateLastSearches = require('./updateLastSearches');
const searchTweetsByUsername = require('./SearchTweetsByUsername');
const isTwitterUsername = require('../utils/isTwitterUsername');

async function searchTweets(searchText) {
  await updateLastSearches(searchText);
  if (isTwitterUsername(searchText)) {
    return await searchTweetsByUsername(searchText);
  }
  return await httpSearchTweets(searchText);
}

module.exports = searchTweets;
