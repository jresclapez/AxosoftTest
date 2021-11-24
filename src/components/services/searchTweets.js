const { ipcRenderer } = window.require('electron');

const searchTweets = async (searchText) => {
  return await ipcRenderer.invoke('searchTweets', searchText);
};

module.exports = searchTweets;
