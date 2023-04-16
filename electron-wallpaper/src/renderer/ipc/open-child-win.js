const { ipcRenderer } = require("electron")
exports.openChildWind = (event) => {
    console.log(event);
    const someArgument = { msg: '请求打开墙纸窗口'}
    ipcRenderer.invoke('ask-open-wallpaper', someArgument).then((result) => {
        console.log(result, event, 999999);
    })
}