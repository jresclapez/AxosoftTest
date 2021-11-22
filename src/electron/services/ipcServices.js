const {getTweets} = require("./twitter")



class IpcServiceE {

    async  handle  (event, request) {
        event.sender.send("twitter_response", await getTweets(request))
    }
}
exports.IpcServiceE = new IpcServiceE;