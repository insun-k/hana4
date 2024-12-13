const moment = require("moment");

const a = moment().format("LLLL"); // Tuesday, August 30, 2022 4:45 PM    ⇐⇒ .format('llll')
console.log("🚀 ~ a:", a);
const b = moment().format("MMM MMMM ddd Do D DD"); // Aug August 1st 1 01
console.log("🚀 ~ b:", b);
moment.locale("ko"); // format ⇒ 2022년 8월 30일 화요일 오후 4:45
moment().format("MMM MMMM Do D DD"); // 8월 8월 1일 1 01
const d0 = new Date(0);
const m = moment("2024-08-04");
moment(d0); // 1970년 1월 1일 목요일 오전 9:00
const fnow = m.fromNow();
console.log("🚀 ~ fnow:", fnow);

//moment.tz("America/Los_Angeles").format("LLL"); // 1969년 12월 31일 오후 4:00
moment().format("YYYY-MM-DD HH:mm:ss"); //
moment().format("YYYY-MM-DD HH:mm:ss (dd)"); //
moment().format("YYYY-MM-DD HH:mm:ss (dddd)"); //
moment().format("YY-M-D"); //
const x = moment().format("hh:mm:ss a"); //       cf.'a h시 mm분'
console.log("🚀 ~ x:", x);

moment().startOf("years"); // cf. endOf()
moment().add(3, "days"); // cf. subtract()
const after100 = moment().add(100, "days"); // cf. subtract()
console.log("🚀 ~ after100:", after100);
const d = moment().diff(moment("1973-10-05"), "M"); // 586
console.log("🚀 ~ d:", d);
const y = moment(new Date(0)).fromNow(); // 53년 전
console.log("🚀 ~ y:", y);
