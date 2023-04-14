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
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

   // 开发环境
   if (NODE_ENV === "development") {
    mainWindow.loadURL('../renderer/index.html')
    // mainWindow.webContents.openDevTools()
  } 
  else {
      mainWindow.loadFile(
        path.resolve(
          __dirname,
          '../',
          'renderer',
          'index.html'
        )
      )
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

