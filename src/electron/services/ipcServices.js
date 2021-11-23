const {getTweets} = require("./twitter")
const {saveSearch} = require("./electron")

class IpcServiceE {

    async  handle  (event, request) {
        event.sender.send("twitter_response", await getTweets(request))
        saveSearch(request)
    }


}
exports.IpcServiceE = new IpcServiceE;