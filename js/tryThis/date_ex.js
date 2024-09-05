const moment = require("moment");
import assert from "assert";

// 내 풀이 - moment 사용
function ex1() {
  const s = moment().diff(moment("1970-01-01"), moment("1970-01-02"));
  console.log("1번)", s);

  const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());
  const randArr = [];
  //const todayMonth = moment().format("MM");
  for (let i = 0; i < 5; i++) {
    const mom = moment().date(rand(1, 30));
    randArr.push(mom);
  }
  randArr.sort(function (a, b) {
    return b - a;
  });

  const Arr = randArr.map((date) => date.format("YYYY-MM-DD"));
  console.log("2번)", Arr);

  const d = moment("2025-09-03").format("dddd");
  console.log("3번)", d);

  const f = moment().add(100, "days");
  console.log("4번)", f);
}

// 강사님 풀이 - Date 사용
function e1() {
  const d1 = new Date("1970-01-01T15:00:00.000Z");
  const d2 = new Date("1970-01-02T15:00:00.000Z");
  return (d2.getTime() - d1.getTime()) / 1000;
}

function e2() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  d.setDate(1);
  d.setDate(0);
  const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());
  const lastDate = d.getDate();
  let randDates = [];
  do {
    randDates.push(rand(1, lastDate));
    randDates = [...new Set(randDates)];
  } while (randDates.length < 5);

  // const r1 = Array(5)
  //   .fill(0)
  //   .map(() => rand(1, lastDate));
  console.log("🚀 ~ e2 ~ d:", d, lastDate, randDates);

  return randDates.sort((a, b) => (b > a ? 1 : -1));
}

const nextYear = new Date();
nextYear.setFullYear(nextYear.getFullYear() + 1);
console.log("🚀 ~ nextYear:", nextYear);
const nextYearWekk = "일월화수목금토"[nextYear.getDay()];
console.log("🚀 ~ nextYearWekk:", nextYearWekk);

const after100 = new Date();
console.log("🚀 ~ after100:", after100.toDateString());
after100.setDate(after100.getDate() + 100);
console.log("🚀 ~ after100:", after100.toDateString());
