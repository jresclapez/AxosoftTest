const httpSearchTweets = require('../http/httpSearchTweets');
const updateLastSearches = require('./updateLastSearches');
const httpGetUserId = require('../http/httpGetUserId');
const httpSearchTweetsByUserId = require('../http/httpSearchTweetsByUserId');

async function searchTweets(searchText) {
  await updateLastSearches(searchText);

  if (searchText.charAt(0) === '@') {
    const response = await httpGetUserId(searchText.substring(1));
    if (response.data) {
      return await httpSearchTweetsByUserId(response.data.id);
    }
  } else {
    return await httpSearchTweets(searchText);
  }
}

module.exports = searchTweets;
