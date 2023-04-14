// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const {attach, detach, refresh} = require("electron-as-wallpaper");
const CustomWindow = require('../scripts/cust-window.js');

const path = require('path')
let mainWindow;
function createWindow() {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
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
            enableRemoteModule: true,
            webSecurity: false, 
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // development
    if (!app.isPackaged) {
        mainWindow.loadURL(path.resolve(
            __dirname,
            '../',
            'renderer',
            'index.html'
        ))
        // mainWindow.webContents.openDevTools()
        console.log('development', app.isPackaged);
    }
    // production
    else {
        console.log('production', app.isPackaged);
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
    // if (mainWindow) attach(mainWindow);
    // not wallpaper effect
    if (mainWindow) detach(mainWindow);
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    refresh();
})

