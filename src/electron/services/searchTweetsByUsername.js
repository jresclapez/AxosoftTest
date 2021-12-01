const httpGetUserId = require('../http/httpGetUserId');
const httpSearchTweetsByUserId = require('../http/httpSearchTweetsByUserId');

async function searchTweetsByUsername(username) {
  const response = await httpGetUserId(username);
  if (response.data) {
    return await httpSearchTweetsByUserId(response.data.id);
  } else {
    return response;
  }
}

module.exports = searchTweetsByUsername;
