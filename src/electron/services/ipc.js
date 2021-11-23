const {getTweets} = require("./twitter")
const {saveSearch, getSearches} = require("./files")

class IpcService {

    constructor(channel){
        this.channel = channel;
    }

    async handle  (event, request) {

        if (this.channel === "twitter"){
            const response = await getTweets(request)
            event.sender.send(`${this.channel}_response`, response )
            response ? saveSearch(request, Date.now()) : null;
        }

        if (this.channel === "infoSearch"){
            event.sender.send(`${this.channel}_response`, await getSearches() )

        }
    }
}

exports.IpcService =  IpcService;