// import { createClient } from "pexels";
const { createClient } = require('pexels')
const openBtn = require("../ipc/open-child-win")

const client = createClient('JFb8VVT9d8VLxWdjzY7lxs38njPTFeWe4FE9hktLk5LThVGxrQW3uJE4');
let query = 'Nature';
let currentPage = 1, totalPage=0, UL;
// query: Nature、Tigers、People

const parent = document.getElementById('pexels-content-view')
// 初始化分页参数
const previous_page = document.getElementById('previous_page')
const next_page = document.getElementById('next_page')
const page_num = document.getElementById('page_num')
const total_num = document.querySelector('.total_num')
const input = document.querySelector('.input')
const search_btn = document.querySelector('.search-btn')

function getPageData() {
    if (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild)
    }
    client.photos.search({ query, page: currentPage, per_page: 32 }).then(res => {
        if (res) {
            const { photos, total_results } = res;
            totalPage = total_results / 32;
            total_num.innerText = `总页数：${totalPage}`
            const data = photos.map(mp => {
                return {
                    imgUrl: mp.src.large,
                    tiny: mp.src.tiny,
                    original: mp.src.original
                }
            })

            UL = document.createElement('ul')
            UL.setAttribute('class', 'wallpaper-list-widget')
                
            for (let i = 0; i < data.length; i++) {
                const LI = document.createElement('li')
                LI.setAttribute('title', '设置为壁纸')
                LI.setAttribute('id', 'pexelsImgItem')
                const img = document.createElement('img')
                img.src = data[i].tiny
                img.setAttribute('id', 'pexelsImgItem')
                LI.append(img)
                UL.append(LI)
                LI.onclick = function(event) {
                    // localStorage.setItem('currentImg', data[i].imgUrl)
                    openBtn.openChildWind(event, 'img', data[i].original)
                }
            }
            parent.appendChild(UL)
        }
    });
}

// 搜索图片
search_btn.addEventListener('click', () => {
    query = input.value
    currentPage = 1
    getPageData()
})

// 初始化请求数据
getPageData()

page_num.innerText = currentPage;

previous_page.onclick = function () {
    if (currentPage > 1) {
        currentPage--;
        console.log(currentPage, 'pre');
    }
    page_num.innerText = currentPage;
    getPageData()
}
next_page.onclick = function () {
    if (currentPage && currentPage < totalPage) {
        currentPage++;
        console.log(currentPage, 'next');
    }
    page_num.innerText = currentPage;
    getPageData()
}