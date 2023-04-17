const { app, BrowserWindow } = require('electron');
const path = require('path')

class BaseInfo {
    constructor() {
        this.icon = path.resolve( __dirname,'../../public/logo.ico')
        this.webPreferences = {
            enableRemoteModule: true,
            webSecurity: false, 
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js')
        }
    }
}

class createWindow extends BaseInfo {
    constructor(width, height) {
        // 给父类传递参数
        super()
        this.width = width
        this.height = height
    }
}

exports.createWindow = function (width = 800, height = 600) {
    return new BrowserWindow({ ...new createWindow(width, height)})
}