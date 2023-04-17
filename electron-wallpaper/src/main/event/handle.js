const { ipcMain, BrowserWindow } = require("electron")
const {attach, detach, refresh} = require("electron-as-wallpaper");
const path = require('path')
let wallpaper;
ipcMain.handle('ask-open-wallpaper', async (event, someArgument) => {
    refresh()
    const { URL } = someArgument;
    // 异步操作
    wallpaper = new BrowserWindow({
		enableLargerThanScreen: true,
		autoHideMenuBar: true,
        fullscreen: true,
		frame: false,
		show: false,
		webPreferences: {
			backgroundThrottling: false,
		}
	})
    await wallpaper.loadURL(path.resolve(
        __dirname,
        `../../page/${URL}.html`
    ))
    // 沉于桌面图标之下图层
    attach(wallpaper)
    // 浮于桌面图标之上图层
    // detach(wallpaper)
    wallpaper.show();
    return 'ok'
})

ipcMain.on('ask-close-wallpaper', (evt, arg) => {
    if (wallpaper) wallpaper.close()
    refresh()
})