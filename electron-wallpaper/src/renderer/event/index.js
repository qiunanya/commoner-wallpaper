const openBtn = require("../ipc/open-child-win")
const openChildbtn = document.getElementById('openChildbtn')
openChildbtn.onclick = function (event) {
    openBtn.openChildWind(event)
}