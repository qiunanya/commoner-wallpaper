const openBtn = require("../ipc/open-child-win")
const closeWallBtn = require("../ipc/close-wallpaper")
const openChildbtn = document.getElementById('openChildbtn')
openChildbtn.onclick = function (event) {
    openBtn.openChildWind(event)
}

const settingWallpaperBtn = document.getElementById('settingWallpaper')
settingWallpaperBtn.onclick = function (event) {
    openBtn.openChildWind(event)
}

// close wallpaper
const closeWallpaperBtn = document.getElementById('closeWallpaper')
closeWallpaperBtn.onclick = function (event) {
    closeWallBtn.closeWallPaper(event)
}

// image
const settingWallpaperImgBtn = document.getElementById('settingWallpaperImg')
settingWallpaperImgBtn.onclick = function(event) {
    openBtn.openChildWind(event)
}