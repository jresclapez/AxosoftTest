const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const url = require('url');
const getLastSearches = require('./services/getLastSearches');
const searchTweets = require('./services/searchTweets');

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
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
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

    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
      console.log('Error loading React DevTools: ', err)
    );
    win.webContents.openDevTools();
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

ipcMain.handle('getLastSearches', async () => {
  return await getLastSearches();
});

ipcMain.handle('searchTweets', async (event, searchText) => {
  return await searchTweets(searchText);
});
