//console.log("-----1번--------------");
function ex1() {
  for (let i = 0.1; i < 1; i += 0.1) {
    let n = i.toFixed(1);
    console.log(Number(n));
  }
}

ex1(); // 문제 번호 묶기

console.log("-----2-1번--------------");
for (let i = 1; i <= 10; i += 1) {
  //const n = Number(Math.sqrt(i).toFixed(3));
  //console.log(Number.isInteger(n) ? "" : (i, n));
  const s = Math.sqrt(i);
  if (!Number.isInteger(s)) {
    console.log(i, s.toFixed(3));
  }
}

console.log("-----2-2번--------------");
function printIrr(x) {
  do {
    const s = Math.sqrt(x);
    console.log(x, +s.toFixed(3)); // + -> number()
    if (!(Number.isInteger(x + 1) % 1)) {
      break;
    }
    x++;
  } while (true);
}

// for( ; ; ) => for문 무한루프

printIrr(5);
printIrr(9);

const WEEK_NAMES = [..."일월화수목금토"]; // 전역변수로 빼기
//console.log("-----3번--------------");
//const WEEK_NAMES = "일월화수목금토";
function ex3() {
  const today = new Date();
  const todayWeek = today.getDay();
  //console.log("🚀 ~ todayWeek:", todayWeek);
  //console.log([...WEEK_NAMES]);
  // 방법1
  switch (todayWeek) {
    case 0:
      console.log("오늘은 일요일입니다.");
      break;
    case 1:
      console.log("오늘은 월요일입니다.");
      break;
    case 2:
      console.log("오늘은 화요일입니다.");
      break;
    case 3:
      console.log("오늘은 수요일입니다.");
      break;
    case 4:
      console.log("오늘은 목요일입니다.");
      break;
    case 5:
      console.log("오늘은 금요일입니다.");
      break;
    case 6:
      console.log("오늘은 토요일입니다.");
      break;
  }
  // 방법2
  arr = [...WEEK_NAMES];
  console.log("오늘은", arr[todayWeek], "요일입니다.");
}

console.log("-----4번--------------");
function addPoints(a, b) {
  //   const max = Math.max(a.toString().length, b.toString().length);
  //   console.log((a + b).toFixed(max - 2));
  // => addPoints(12.14, 13.28); 정답 x

  // 중복 코드 함수로 구현
  const alen = a.toString().length - Math.trunc(a).toString().length - 1;
  const blen = b.toString().length - Math.trunc(b).toString().length - 1;
  const bigger = alen > blen ? alen : blen;
  console.log((a + b).toFixed(bigger));

  // split 이용하기
  // => addPoints(10, 12,34) 경우 10 에 적용 불가능
  // -> 사용하려면, f.toString().split('.')[1]?. length ?? 0; => ? 사용
}

addPoints(0.21354, 0.1);
addPoints(12.14, 13.28);
addPoints(10, 12.445);
addPoints(-12.45, 0.34);
