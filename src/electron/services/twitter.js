const constants = require("./../constants");

async function http(URL, params){

    const config = {
        params,
        headers: {
            Authorization: "Bearer " + AccessToken
        }
    }
    const axios = require("axios");
    const response = await axios.get(URL, config)
    return response.data

}

async function getTweets(target) {

    const URL = `${constants.BASE_TWITTER_API2_URL}/tweets/search/recent?query=${target}`;

    const params = {
        "max_results": 20,
        "tweet.fields": "created_at,lang,conversation_id"
    }

    return await http(URL, params)

}

exports.getTweets = getTweets;