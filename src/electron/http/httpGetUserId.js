const { BASE_TWITTER_API_URL } = require('../constants');
const http = require('./http');

// request for recent tweets matching introduced text
const httpGetUserId = async (username) => {
  username = username.charAt(0) === '@' ? username.substring(1) : username;
  const URL = `${BASE_TWITTER_API_URL}/users/by/username/${username}`;
  return (await http.get(URL)).data;
};

module.exports = httpGetUserId;
