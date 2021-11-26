const { BASE_TWITTER_API_URL } = require('../constants');
require('dotenv').config();
const axios = require('axios');

// request for recent tweets matching introduced text
const httpSearchTweets = async (searchText) => {
  const query =
    searchText.charAt(0) === '@'
      ? 'from:' + searchText.substring(1)
      : searchText;

  const URL = `${BASE_TWITTER_API_URL}/tweets/search/recent?query=${query}`;

  const config = {
    params: {
      max_results: 30,
      'tweet.fields': 'created_at'
    },
    headers: {
      Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
    }
  };

  return (await axios.get(URL, config)).data;
};

module.exports = httpSearchTweets;
