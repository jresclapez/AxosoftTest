const path = require('path');
const os = require('os');

module.exports = Object.freeze({
  BASE_TWITTER_API2_URL: 'https://api.twitter.com/2',
  AUTH_TWITTER_API2_URL: 'https://api.twitter.com/oauth2/token',
  JSON_FILE_SEARCHES: path.join(os.tmpdir(), 'searches.json')
});
