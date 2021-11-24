const {
  BASE_TWITTER_API2_URL,
  AUTH_TWITTER_API2_URL
} = require('./../constants');
const { apiKey, apiKeySecret } = require('./../files/userConfig');

async function http(URL, config) {
  if (!config.headers) {
    const { accessToken } = require('./../files/userConfig');
    config = {
      ...config,
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };
  }

  const axios = require('axios');
  const response = await axios.get(URL, config);
  return response.data;
}

async function getTweets(target) {
  const URL = `${BASE_TWITTER_API2_URL}/tweets/search/recent?query=${target}`;

  const config = {
    params: {
      max_results: 30,
      'tweet.fields': 'created_at,lang,conversation_id'
    }
  };

  try {
    return await http(URL, config);
  } catch (e) {
    if (e.response.status === 400) {
      return false;
    }
    return e;
  }
}

async function getTokenAccess() {
  const token = `${apiKey}:${apiKeySecret}`;
  const tokenBase64 = Buffer.from(token).toString('base64');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Basic ' + tokenBase64
    }
  };

  return await http(AUTH_TWITTER_API2_URL, config);
}

module.exports = getTweets;
exports.getTokenAccess = getTokenAccess;
