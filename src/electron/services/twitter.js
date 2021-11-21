const constants = require("./../constants");

async function http(URL, params){

    const config = {
        params,
        headers: {
            Authorization: "Beareyr " + AccessToken
        }
    }
    const axios = require("axios");
    const response = await axios.get(URL, config)
    return response.data

}

async function getTweets(username, maxResults) {

    const URL = `${constants.BASE_TWITTER_API2_URL}/tweets/search/recent?query=from%3A${username}`;

    const params = {
            "max_results": maxResults,
            "expansions": "author_id",
            "tweet.fields": "created_at,lang,conversation_id"
        }

    try {

        const response = await http(URL, params)
        return response.data

    }catch (e) {

       if (e.response.status === 401) return null;
       throw e;
    }
}

exports.getTweets = getTweets;