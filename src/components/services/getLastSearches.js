const { ipcRenderer } = window.require('electron');

const getLastSearches = async () => {
  return await ipcRenderer.invoke('getLastSearches');
};

module.exports = getLastSearches;
