const { ipcMain, BrowserWindow } = require("electron")
const {attach, detach, refresh} = require("electron-as-wallpaper");
const path = require('path')
let wallpaper;
ipcMain.handle('ask-open-wallpaper', async (event, someArgument) => {
    const { msg, page, URL, tabType } = someArgument;
    // 配置全局变量
    global.shareVariable = {
        imgUrl: URL
    }
    // 异步操作，如果不存在窗口继续创建，否则禁止创建窗口，防止多次创建窗口
    if (!wallpaper) {
        wallpaper = new BrowserWindow({
            enableLargerThanScreen: true,
            autoHideMenuBar: true,
            fullscreen: true,
            frame: false,
            show: false,
            webPreferences: {
                backgroundThrottling: false,
                webSecurity: false, 
                nodeIntegration: true,
                contextIsolation: false,
                webviewTag: true,
            }
        })
        // wallpaper = new BrowserWindow({ 
        //     width: 800, 
        //     height: 600,
        //     webPreferences:{
        //         webSecurity: false, 
        //         nodeIntegration: true,
        //         contextIsolation: false,
        //         webviewTag: true,
        //     } 
        // })
    }

    // remote module
    if (wallpaper) {
        // require('@electron/remote/main').initialize()
        require('@electron/remote/main').enable(wallpaper.webContents)
    }
    
    await wallpaper.loadURL(path.resolve(
        __dirname,
        tabType === 'code' ? `../../page/${page}.html` : `../../page/image-wall.html`
    ))
    
    // 沉于桌面图标之下图层
    attach(wallpaper)
    // 浮于桌面图标之上图层
    // detach(wallpaper)
    wallpaper.show();
    refresh()
    return 'ok'
})

ipcMain.on('ask-close-wallpaper', (evt, arg) => {
    if (wallpaper) wallpaper.hide()
    refresh()
})