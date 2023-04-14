// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const {attach, detach, refresh} = require("electron-as-wallpaper");

const path = require('path')
let mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.resolve(
            __dirname,
            '../',
            'asset',
            'logo/icon.ico'
        ),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 开发环�?
    if (!app.isPackaged) {
        mainWindow.loadURL(path.resolve(
            __dirname,
            '../',
            'renderer',
            'index.html'
        ))
        // mainWindow.webContents.openDevTools()
        console.log('开发环�?', app.isPackaged);
    }
    // 生产�??
    else {
        console.log('生产�??', app.isPackaged);
        mainWindow.loadFile(
            path.resolve(
                __dirname,
                '../',
                'renderer',
                'index.html'
            )
        )
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    if (mainWindow) attach(mainWindow);
    // detach(mainWindow);
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    refresh();
})

