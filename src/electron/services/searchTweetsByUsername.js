const updateLastSearches = require('./updateLastSearches');
const httpGetUserId = require('../http/httpGetUserId');
const httpSearchTweetsByUserId = require('../http/httpSearchTweetsByUserId');

async function searchTweetsByUsername(username) {
  const response = await httpGetUserId(username);
  if (response.data) {
    return await httpSearchTweetsByUserId(response.data.id);
  }

  await updateLastSearches(`@${username}`);
}

module.exports = searchTweetsByUsername;
