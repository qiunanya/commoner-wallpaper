// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

   // 开发环境
   if (NODE_ENV === "development") {
    mainWindow.loadURL('./index.html')
    // mainWindow.webContents.openDevTools()
  } 
  else {
      // 生产环境：确保文件网址格式正确, 使用Node
      // fileURLToPath: 此函数可确保正确解码百分比编码字符，并确保跨平台有效的绝对路径字符串。
      const baseUrl = require('url').fileURLToPath(`file://${path.join(__dirname, './index.html')}`)
      mainWindow.loadURL(baseUrl)
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
