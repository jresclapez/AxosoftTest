const path = require('path');
const os = require('os');

module.exports = Object.freeze({
  BASE_TWITTER_API_URL: 'https://api.twitter.com/2',
  JSON_FILE_SEARCHES: path.join(os.tmpdir(), 'searches.json')
});
