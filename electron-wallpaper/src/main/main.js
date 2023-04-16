"use strict"
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const {attach, detach, refresh} = require("electron-as-wallpaper");
const CustomWindow = require('../scripts/cust-window.js');
const path = require('path')
require('./event/handle.js')

let mainWindow;
// hot reloader config
try {
    require('electron-reloader')(module);
} catch (_) { }

function createWindow() {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

    // main windows
    mainWindow = CustomWindow.createWindow()
    // remote module
    require('@electron/remote/main').initialize()
    require('@electron/remote/main').enable(mainWindow.webContents)

    const IS_DEVELOPMENT = !app.isPackaged;
    // development
    if (IS_DEVELOPMENT) {
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

