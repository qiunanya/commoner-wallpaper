// import { createClient } from "pexels";
const { createClient } = require('pexels')
const openBtn = require("../ipc/open-child-win")

const client = createClient('JFb8VVT9d8VLxWdjzY7lxs38njPTFeWe4FE9hktLk5LThVGxrQW3uJE4');
const query = 'Nature';
// query: Nature、Tigers、People

const parent = document.getElementById('pexels-list-view')
client.photos.search({ query, per_page: 30 }).then(res => {
    if (res) {
        const { photos } = res;
        const data = photos.map(mp => {
            return {
                imgUrl: mp.src.large,
                tiny: mp.src.tiny,
                small: mp.src.small
            }
        })
        const UL = document.createElement('ul')
            UL.setAttribute('class', 'wallpaper-list-widget')
        for (let i = 0; i < data.length; i++) {
            const LI = document.createElement('li')
            LI.setAttribute('title', '设置为壁纸')
            LI.setAttribute('id', 'pexelsImgItem')
            const img = document.createElement('img')
            img.src = data[i].small
            img.setAttribute('id', 'pexelsImgItem')
            LI.append(img)
            UL.append(LI)
            LI.onclick = function(event) {
                // localStorage.setItem('currentImg', data[i].imgUrl)
                openBtn.openChildWind(event, 'img', data[i].imgUrl)
            }
        }
        parent.append(UL)
    }

});