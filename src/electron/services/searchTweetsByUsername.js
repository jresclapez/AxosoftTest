const httpGetUserId = require('../http/httpGetUserId');
const httpSearchTweetsByUserId = require('../http/httpSearchTweetsByUserId');

async function searchTweetsByUsername(username) {
  const response = await httpGetUserId(username);
  if (!response.data) {
    return response;
  }
  return await httpSearchTweetsByUserId(response.data.id);
}

module.exports = searchTweetsByUsername;
