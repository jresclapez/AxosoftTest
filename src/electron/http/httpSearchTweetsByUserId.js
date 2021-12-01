const { BASE_TWITTER_API_URL } = require('../constants');
const http = require('./http');

// request for tweets from a user, by user ID
const httpSearchTweetsByUserId = async (userid) => {
  const URL = `${BASE_TWITTER_API_URL}/users/${userid}/tweets`;
  const config = {
    params: {
      max_results: 100,
      'tweet.fields': 'created_at'
    }
  };
  return (await http.get(URL, config)).data;
};

module.exports = httpSearchTweetsByUserId;
