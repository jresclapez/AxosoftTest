const { getTweets } = require('./twitter');
const { saveSearch, getFileContent } = require('./files');
const { JSON_FILE_SEARCHES } = require('./../constants');

class IpcService {
  constructor(channel) {
    this.channel = channel;
  }

  async reply(request) {
    if (this.channel === 'twitter') {
      const response = await getTweets(request);
      if (response.data) {
        saveSearch(request, Date.now());
      }

      return response;
    }

    if (this.channel === 'infoSearch') {
      return await getFileContent(JSON_FILE_SEARCHES);
    }
  }

  async handle(event, request) {
    event.sender.send(`${this.channel}_response`, await this.reply(request));
  }
}

exports.IpcService = IpcService;
