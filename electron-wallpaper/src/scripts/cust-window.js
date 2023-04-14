const path = require('path')

class BaseInfo {
    constructor() {
        this.icon = path.resolve(
            __dirname,
            '../',
            'asset',
            'logo/icon.ico'
        ),
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
    constructor() {
        // 给父类传递参数
        super()
    }
}

exports.createWindow = function (test = null) {
    return new createWindow()
}