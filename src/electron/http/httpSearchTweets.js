const { BASE_TWITTER_API_URL } = require('../constants');
const http = require('./http');

// request for recent tweets matching introduced text
const httpSearchTweets = async (searchText) => {
  const URL = `${BASE_TWITTER_API_URL}/tweets/search/recent`;
  const config = {
    params: {
      query: searchText,
      max_results: 100,
      'tweet.fields': 'created_at'
    }
  };

  return (await http.get(URL, config)).data;
};

module.exports = httpSearchTweets;
