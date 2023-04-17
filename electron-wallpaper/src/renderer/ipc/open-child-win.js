const { ipcRenderer } = require("electron")
exports.openChildWind = (event) => {
    const someArgument = { msg: '请求打开墙纸窗口', URL: 'time-wall'}
    ipcRenderer.invoke('ask-open-wallpaper', someArgument).then((result) => {
        console.log(result, event, 999999);
    })
}