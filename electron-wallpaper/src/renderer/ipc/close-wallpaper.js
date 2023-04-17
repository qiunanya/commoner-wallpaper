const { ipcRenderer } = require("electron")

exports.closeWallPaper = function (params) {
    console.log(params);
    ipcRenderer.send('ask-close-wallpaper')
}