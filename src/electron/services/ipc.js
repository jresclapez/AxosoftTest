const {getTweets} = require("./twitter")
const {saveSearch, getSearches} = require("./files")

class IpcService {

    constructor(channel, actions){
        this.channel = channel;
    }

    async  handle  (event, request) {

        if (this.channel === "twitter"){
            event.sender.send(`${this.channel}_response`,  getTweets(request))
            saveSearch(request, Date.now())
        }

        if (this.channel === "infoSearch"){

            event.sender.send(`${this.channel}_response`, getSearches() )

        }
    }
}

exports.IpcService =  IpcService;