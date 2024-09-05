const { extname } = require("path");

function ex1_add() {
  const readline = require("readline");
  const { stdin: input } = require("process");

  function* add() {
    const x = yield "첫 번째 수?";
    const y = yield "두 번째 수?";
    // console.log(`x = ${x}, y = ${y}`);
    return x + y;
  }

  const rl = readline.createInterface({ input }); // output 제거 => 두번씩 출력 막기
  const itAdd = add();
  console.log(itAdd.next().value);

  rl.on("line", (answer) => {
    const { value, done } = itAdd.next(+answer);
    if (done) {
      // True 이면 (끝)
      console.log("Total:", value);
      rl.close();
    } else {
      console.log(value);
    }
  }).on("close", () => {
    process.exit();
  });

  // console.log(itAdd.next(1).value);
  // console.log(itAdd.next(2).value);
}

import assert from "assert";
const { stat } = require("fs");

const LINE2 = [
  "신도림",
  "성수",
  "신설동",
  "용두",
  "신답",
  "용답",
  "시청",
  "충정로",
  "아현",
  "이대",
  "신촌",
  "공항철도",
  "홍대입구",
  "합정",
  "당산",
  "영등포구청",
  "문래",
  "대림",
  "구로디지털단지",
  "신대방",
  "신림",
  "봉천",
  "서울대입구",
  "낙성대",
  "사당",
  "방배",
  "서초",
  "교대",
  "강남",
  "역삼",
  "선릉",
  "삼성",
  "종합운동장",
  "신천",
  "잠실",
  "잠실나루",
  "강변",
  "구의",
  "건대입구",
  "뚝섬",
  "한양대",
  "왕십리",
  "상왕십리",
  "신당",
  "동대문역사문화공원",
  "을지로4가",
  "을지로3가",
  "을지로입구",
];
class Subway {
  #station1; // private
  #station2;
  #didEnd = false;
  #currIdx;

  constructor(station1, station2) {
    // this.station1 = station1;
    // this.station2 = station2;

    // this.idx1 = LINE2.indexOf(station1);
    // this.idx2 = LINE2.indexOf(station2);

    this.#station1 = station1;
    this.#currIdx = LINE2.indexOf(station1);
    this.#station2 = station2;
  }

  nextStation() {
    if (this.#currIdx === LINE2.length) this.#currIdx = 0;
    //this.#didEnd = this.#currIdx === LINE2.indexOf(this.#station2)
    const currStation = LINE2[this.#currIdx++];
    this.#didEnd = currStation === this.#station2;
    return currStation;
  }

  *[Symbol.iterator]() {
    // if (this.idx1 > this.idx2) {
    //   for (let i = this.idx1; i < LINE2.length; i++) {
    //     yield LINE2[i];
    //   }
    //   for (let i = 0; i <= this.idx2; i++) {
    //     yield LINE2[i];
    //   }
    // } else {
    //   for (let i = this.idx1; i <= this.idx2; i++) {
    //     yield LINE2[i];
    //   }
    // }

    while (true) {
      if (this.#didEnd) {
        this.#didEnd = false;
        this.#currIdx = LINE2.indexOf(this.#station1);
        break;
      }

      yield this.nextStation();
    }
  }

  toString() {
    return `${this.#station1}역에서 출발하여 ${
      this.#station2
    }역까지가는 중. 현재는 `;
  }
}

const routes = new Subway("문래", "신림");
//console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
assert.deepStrictEqual(
  [...routes],
  ["문래", "대림", "구로디지털단지", "신대방", "신림"]
);

const it1 = routes[Symbol.iterator]();
["문래", "대림", "구로디지털단지", "신대방", "신림"].forEach((value) => {
  assert.deepStrictEqual(it1.next(), { value, done: false });
});

console.log("---------------------------------");
const routes2 = new Subway("구로디지털단지", "성수"); // 32개 정거장
//console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']

const it2 = routes2[Symbol.iterator]();
let count2 = 0;
while (true) {
  count2 += 1;
  const x = it2.next();
  //console.log(x);
  if (x.done) break;
}
assert.deepStrictEqual(count2 - 1, 32);

const route3 = new Subway("문래", "합정");
const it3 = route3[Symbol.iterator]();
assert.deepStrictEqual([...route3].length, 46);

const route4 = new Subway("신도림", "을지로입구");
