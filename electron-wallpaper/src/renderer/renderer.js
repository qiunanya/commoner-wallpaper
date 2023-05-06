/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
require('./event')
require('./event/http')
require('./event/tabs')
const { dialog } = require("@electron/remote");

// dialog.showSaveDialog({
//     title: '文件保存到',
//     buttonLabel:'确定',
//     properties:['showHiddenFiles']
// }).then(res =>{
//     if (res.filePath) {
//         // 这里获得用户选择的保存路径，'布衣前端'：xxx.txt的内容
//         fs.writeFileSync(res.filePath, '布衣前端')
//     }
//     console.log(res)
// }).catch(err =>{
//     this.$Message.error(err)
// })

