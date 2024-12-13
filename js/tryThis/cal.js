// const moment = require("moment");

// moment.locale("ko");
// const y = moment().format("YYYY");
// const m = moment().format("MMMM");

// const mom = moment("y-m-01").format("YYYY-MM-DD");
// console.log("🚀 ~ mom:", mom);

const today = new Date();
const first = new Date(today.getFullYear(), today.getMonth(), 1);
const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
console.log("🚀 ~ last:", last);

console.log(first); // 1=>화요일

const lastDate = last.getDate(); // 해당 월 총 일 수
const firstDay = first.getDay(); // 해당 월 1일 요일

// count = 0
// for (let i = 0; i < lastDate; i++) {
//     for(let j = 0; j < 7; j++){
//         id (firstDay <= )
//     }
// }
