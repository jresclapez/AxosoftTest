const { ipcRenderer } = window.require('electron');

const searchTweetsByUsername = async (username) => {
  return await ipcRenderer.invoke('searchTweetsByUsername', username);
};

module.exports = searchTweetsByUsername;
