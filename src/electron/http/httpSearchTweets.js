const { BASE_TWITTER_API2_URL } = require('../constants');
const { accessToken } = require('../files/userConfig.json');
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
      Authorization: 'Bearer ' + accessToken
    }
  };

  return (await axios.get(URL, config)).data;
};

module.exports = httpSearchTweets;
