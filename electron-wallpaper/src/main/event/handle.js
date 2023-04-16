const { ipcMain, BrowserWindow } = require("electron")
const path = require('path')

ipcMain.handle('ask-open-wallpaper', async (event, someArgument) => {
    // 异步操作
    // return JSON.stringify(CustomWindow.createWindow())
    const wallpaper = new BrowserWindow({
		enableLargerThanScreen: true,
		autoHideMenuBar: false,
		frame: true,
		show: true,
		webPreferences: {
			backgroundThrottling: false,
		}
	})
    // await wallpaper.loadURL(__dirname, "./src/page/wallpaper.html")
    await wallpaper.loadURL(path.resolve(
        __dirname,
        '../',
        '../page/wallpaper.html'
    ))
    return 'ok'
})