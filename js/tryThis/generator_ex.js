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
  constructor(station1, station2) {
    this.station1 = station1;
    this.station2 = station2;

    const idx1 = LINE2.indexOf(station1);
    console.log("🚀 ~ Subway ~ constructor ~ idx1:", idx1);
    const idx2 = LINE2.indexOf(station2);
  }

  saveArr() {
    const arr = [];
    console.log(this.idx1);
    for (let i = this.idx1; i <= this.idx2; i++) {
      arr.push(LINE2[i]);
    }
    return arr;
  }
  //   *[Symbol.iterator]() {
  //     for (let i = this.idx1; i <= this.idx2; i++) {
  //       console.log(LINE2[i]);
  //     }
  //   }
}

const routes = new Subway("문래", "신림");
console.log(routes.saveArr());
// const it1 = routes[Symbol.iterator]();
// console.log(it1.next());
// console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
// console.log(it1.next()); // { value: '문래', done: false }
