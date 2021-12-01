const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const url = require('url');
const getLastSearches = require('./services/getLastSearches');
const searchTweets = require('./services/searchTweets');
const searchTweetsByUsername = require('./services/searchTweetsByUsername');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 675,
    toolbar: false,
    titleBarStyle: 'hiddenInset',
    minWidth: 800,
    minHeight: 600,
    title: 'Axosoft Technical Test',
    backgroundColor: '#7aaeff',
    fullscreenable: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const indexPath = url.format({
    protocol: 'http:',
    host: 'localhost:8080',
    pathname: '../index.html',
    slashes: true
  });

  win.loadURL(indexPath);

  win.once('ready-to-show', () => {
    win.show();
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// ipcMain method to listen to requests from the react app

ipcMain.handle('getLastSearches', async () => {
  return await getLastSearches();
});

ipcMain.handle('searchTweets', async (event, searchText) => {
  return await searchTweets(searchText);
});

ipcMain.handle('searchTweetsByUsername', async (event, username) => {
  return await searchTweetsByUsername(username);
});
