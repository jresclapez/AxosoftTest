const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const url = require('url')
const {IpcServiceE} = require("./services/ipcServices")

//global.AccessToken = "AAAAAAAAAAAAAAAAAAAAAFYGWAEAAAAAHRiSObOsPrmCtxEoCxVXlwJMeKE%3DWoUtvwyMbQTrsUbxNCPQgL0kAxwOvSfsV9ZI1FLF64SRpNuXyy"
//      console.log(Buffer.from("BC2lByVev3Es69b9pJUvvU38N:u1LMWosIssCWQADNLNZa9vdlUbnH5y2y4it6bpVanXBfSsdDqZ").toString('base64'));



function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 675,
        toolbar: false,
        titleBarStyle: "hiddenInset",
        minWidth: 800,
        minHeight: 600,
        backgroundColor: "#ccf7ff",
        fullscreenable: false,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })


    indexPath = url.format({
        protocol: 'http:',
        host: 'localhost:8080',
        pathname: '../index.html',
        slashes: true
    })


    win.loadURL(indexPath)

    win.once('ready-to-show', () => {
        win.show()

        const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

        installExtension(REACT_DEVELOPER_TOOLS)
            .catch(err => console.log('Error loading React DevTools: ', err))
        win.webContents.openDevTools()

    })
}

app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    const channel = IpcServiceE;
    ipcMain.on("twitter", (event, request) => channel.handle(event, request));


})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


app.on('activate', () => {
    // On macOS it's common to re-create a window in the components when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})