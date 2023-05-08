const { getGlobal } = require('@electron/remote')
const imgNode = document.getElementById('WallPaperImgView')

const { imgUrl } = getGlobal('shareVariable')

if (imgUrl) imgNode.src = imgUrl