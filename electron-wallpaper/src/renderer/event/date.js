// 获取当前时间的Date对象
const now = new Date();

// 显示时间，格式为hh:mm:ss
const timeString = now.toLocaleTimeString();

// 显示日期，格式为yyyy-mm-dd
const dateString = now.toLocaleDateString();

// 显示星期几，格式为周X（0表示星期天，1表示星期一，以此类推）
const dayOfWeek = now.getDay();
const weekdayString = `周${"日一二三四五六"[dayOfWeek]}`;

// 将时间、日期和星期几合并在一起
const fullString = `${dateString} ${weekdayString}`;

// 将结果显示在页面上
document.querySelector(".date-area").textContent = fullString;