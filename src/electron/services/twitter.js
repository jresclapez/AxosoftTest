const constants = require("./../constants");
const {access_token, api_key, api_secret} = require("./../files/userConfig")
const {saveToken} = require("./files")

async function http(URL, config){

    if (!config.headers)
    {
        const {access_token} = require("./../files/userConfig")
        config = {
            ...config,
            headers: {
                Authorization: "Bearer " + access_token
            }
        }
    }

    const axios = require("axios");
    return await axios.get(URL, config)


}

async function getTwitterTokenAccess(){

    const URL = constants.AUTH_TWITTER_API2_URL;

    const token = `${api_key}:${api_secret}`
    const token_B64 = Buffer.from(token).toString('base64').replace('\r\n','')

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": "Basic " + token_B64
        }
    }

    try{
        return await http(URL, config)

    }catch(e){
        if (e.response.status === 401)
            console.log(e)
            return e;
    }
}


async function getTweets(target) {

    const URL = `${constants.BASE_TWITTER_API2_URL}/tweets/search/recent?query=${target}`;

    const config = {
            params : {
                "max_results": 20,
                "tweet.fields": "created_at,lang,conversation_id"
            }
    }

    try{
        return await http(URL, config);


    }catch(e){
        if (e.response.statusText === 'Unauthorized'){

            try {
                const response = await getTwitterTokenAccess();
                console.log(response)
                const access_token = response.data.access_token;
                saveToken(access_token)
                return await http(URL, config);
            } catch(e){
                console.log( e);
                return e;
            }
        }
        else
            return e;
    }
}

exports.getTweets = getTweets;