const { BASE_TWITTER_API2_URL } = require('../constants');
require('dotenv').config();
const axios = require('axios');

const httpSearchTweets = async (searchText) => {
  const URL = `${BASE_TWITTER_API2_URL}/tweets/search/recent`;

  const config = {
    params: {
      max_results: 30,
      'tweet.fields': 'created_at,lang,conversation_id',
      query: searchText
    },
    headers: {
      Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
    }
  };

  return (await axios.get(URL, config)).data;
};

module.exports = httpSearchTweets;
