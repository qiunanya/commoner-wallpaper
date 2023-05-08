const { ipcRenderer } = require("electron")
exports.openChildWind = (event, type, URL) => {
    const { id } = event.target
    if (type === 'code' && !id) return
    const someArgument = { msg: '请求打开墙纸窗口', page: id, URL, tabType: type }
    ipcRenderer.invoke('ask-open-wallpaper', someArgument).then((result) => {
        // console.log(result, event, 999999);
    })
}