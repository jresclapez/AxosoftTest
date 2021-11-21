const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const url = require('url')
global.AccessToken = "AAAAAAAAAAAAAAAAAAAAAFYGWAEAAAAAHRiSObOsPrmCtxEoCxVXlwJMeKE%3DWoUtvwyMbQTrsUbxNCPQgL0kAxwOvSfsV9ZI1FLF64SRpNuXyy"



let dev = false
if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
    dev = true
}

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 675,
        toolbar: false,
        titleBarStyle: "hiddenInset",
        minWidth: 800,
        minHeight: 600,
        backgroundColor: "#1A2933",
        fullscreenable: false,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    let indexPath

    if (dev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: '../index.html',
            slashes: true
        })
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, 'dist', '../index.html'),
            slashes: true
        })
    }

    win.loadURL(indexPath)

    win.once('ready-to-show', () => {
        win.show()

        // Open the DevTools automatically if developing
        if (dev) {
            const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

            installExtension(REACT_DEVELOPER_TOOLS)
                .catch(err => console.log('Error loading React DevTools: ', err))
            win.webContents.openDevTools()
        }
    })
}

app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    const getData = require("./services/twitter")
    ipcMain.on('anything-asynchronous', (event, request) => {
        let date_ob = new Date();
    console.log("[Main] Request received: ",date_ob) // prints "async ping"
  //      console.log(Buffer.from("BC2lByVev3Es69b9pJUvvU38N:u1LMWosIssCWQADNLNZa9vdlUbnH5y2y4it6bpVanXBfSsdDqZ").toString('base64'));
        getData.getTweets("bbcmundo", 50).then(data => {
            event.reply('asynchronous-reply', data)
        });

    })


    // ipcMain.on('anything-synchronous', (event, request) => {
    //     console.log("[Main] Request received: ",request) // prints "async ping"
    //     event.returnValue = 'pong'
    // })
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






// const  getTweetsByUsername = await require("./services/getTweetsByUsername");

