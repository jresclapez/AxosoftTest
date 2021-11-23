const path = require('path')

module.exports = Object.freeze({

    BASE_TWITTER_API2_URL : 'https://api.twitter.com/2',
    AUTH_TWITTER_API2_URL : 'https://api.twitter.com/oauth2/token',
    JSON_FILE_SEARCHES : path.join(__dirname, '/files/searches.json'),
    JSON_FILE_USERCONFIG : path.join(__dirname, '/files/userConfig.json')
})
