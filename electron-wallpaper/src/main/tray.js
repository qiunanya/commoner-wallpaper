const { Tray, Menu, app } = require('electron')
const path = require("path")
let customWindows;
exports.customTray = function (mainWindow) {
    customWindows = mainWindow;
    const tray = new Tray(path.resolve(__dirname, '../../public/logo.ico'))
    const contextMenu = Menu.buildFromTemplate([
        { 
            label: '打开应用', 
            type: 'checkbox', 
            click: ()=>{
                customWindows.setSkipTaskbar(true)
                customWindows.show()
            }
        },
        // { 
        //     label: '个人中心', 
        //     type: 'checkbox',
        //     click: ()=>{
        //         mainWindow.webContents.send('href','/personal-main')
        //     }
        // },
        // { label: '设置', type: 'checkbox' },
        { 
            label: '退出', 
            type: 'checkbox',
            click: () => {
                // 主窗口设置为null防止内存溢出
                customWindows = null 
                app.exit()
            }        
        }
    ])
    tray.setToolTip('布衣前端壁纸.')
    tray.setContextMenu(contextMenu)
    // 托盘图标被双击事件
    tray.on('double-click', () => {
        customWindows.setSkipTaskbar(true)
        customWindows.show()
    })
}