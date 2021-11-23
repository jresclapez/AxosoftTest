const {getTweets} = require("./twitter")
const {saveSearch} = require("./files")

class IpcService {

    async  handle  (event, channel, request) {
        event.sender.send(`${channel}_response`, await getTweets(request))
        saveSearch(request, Date.now())
    }


}
exports.IpcService = new IpcService;