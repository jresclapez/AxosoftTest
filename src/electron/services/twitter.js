const constants = require("./../constants");
const {access_token} = require("./../files/userConfig")

async function http(URL, params){

    const config = {
        params,
        headers: {
            Authorization: "Bearer " + access_token
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


    try{
        return await http(URL, params);

    }catch(e){
        return e;
    }
}

exports.getTweets = getTweets;