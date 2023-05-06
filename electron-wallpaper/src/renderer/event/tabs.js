const tab_list = document.querySelector('.left-tab-list');
const menuList = tab_list.querySelectorAll('li');
const contentPanle = document.querySelectorAll('.page-item');

for (let i = 0; i < menuList.length; i++) {
    menuList[i].setAttribute('index', i);
    // 绑定事件
    menuList[i].onclick = function (event) {
        menuList.forEach((el, j) => {
            if (i === j) menuList[i].classList.add('active')
            else menuList[j].classList.remove('active')
        })

        contentPanle.forEach((panle, index) => {
            if (i === index) panle.style.display = 'block'
            else panle.style.display = 'none'
        })
    }
}