// function counter() {
//   let count = 0;
//   return function X() {
//     count += 1;
//     return count;
//   };
// }
// const counter1 = counter();
// const counter2 = counter();

// console.log(counter1()); // 1
// console.log(counter1()); // 2
// console.log(counter2()); // 1

console.log("------------------------");

function currentCount() {
  let currCount = 0;
  return {
    connect() {
      currCount += 1;
    },
    disconnect() {
      currCount -= 1;
    },
    getCount() {
      return currCount;
    },
    get count() {
      return currCount;
    },
  };
}

const actions = ["입장", "입장", "입장", "퇴장", "입장", "퇴장"];
const counter = currentCount();
for (const action of actions) {
  action === "입장" ? counter.connect() : counter.disconnect();
  console.log(`${action} -> 현재 입장객: ${counter.count} 명`);
}
console.log("Current User Count=", counter.count);

console.log("------------------------");
// 재귀함수 사용 x
let sum = 0;
for (let i = 0; i <= 100; i++) {
  sum += i;
}
console.log(sum);

// 재귀함수로 구현
function addTo100(a) {
  if (a == 100) return a;
  return a + addTo100(a + 1);
}
console.log(addTo100(1));

// TCO로 구현
function addTo100TCO(a, sum = 0) {
  if (a == 100) return sum + 100;
  return addTo100TCO(a + 1, sum + a);
}
console.log("TCO : ", addTo100TCO(1));

console.log("-----------연습문제-------------");
function makeArray(n) {
  if (n == 1) return [1];
  return [...makeArray(n - 1), n];
}

function makeReverseArray(n) {
  if (n == 1) return [1];
  return [n, ...makeReverseArray(n - 1)];
}

// TCO
function makeArrayTCO1(n, acc = []) {
  if (n == 1) return [1, ...acc];
  return makeArrayTCO1(n - 1, [n, ...acc]);
}

function makeArrayTCO2(n, acc = []) {
  const t = [n, ...acc];
  if (n == 1) return t;
  return makeArrayTCO2(n - 1, t);
}

console.log(makeArray(10));
console.log(makeReverseArray(5));

console.log("TCO1 = ", makeArrayTCO1(5));
console.log("TCO2 = ", makeArrayTCO2(5));

console.log("-----------연습문제-------------");
// 피보나치 수열 - 반복문 (3 버전)
// 배열 사용 (내 코드)
function loopFibonacci1(k) {
  // const arr = [];
  // arr[0] = 0;
  // arr[1] = 1;

  const arr = [0, 1];

  for (let i = 2; i <= k; i++) {
    arr[i] = arr[i - 2] + arr[i - 1];
  }

  return arr[k];
}

function loopFibonacci2(k) {
  let prev = 0;
  let curr = 1;

  if (k <= 1) return k;
  for (let i = 2; i <= k; i++) {
    let t = prev;
    prev = curr;
    curr = t + curr;
  }
  return curr;
}

// arr = [prev, curr] => 디스트럭처링 사용(SWAP)
function loopFibonacci3(k) {
  const arr = [0, 1];

  for (let i = 2; i <= k; i++) {
    [arr[0], arr[1]] = [arr[1], arr[0] + arr[1]];
  }

  return arr[1];
}

// 피보나치 수열 - 재귀함수 (성능 떨어짐)
function resursiveFibonacci(k) {
  if (k < 2) {
    return k;
  } else {
    return resursiveFibonacci(k - 2) + resursiveFibonacci(k - 1);
  }
}

// 피보나치 수열 - memoized 함수
function memoized(fn) {
  const cache = {};
  return function (k) {
    return cache[k] ?? (cache[k] = fn(k));
  };
}

const memoizedFibonacci = memoized(function (n) {
  if (n < 2) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log("loopFibonacci1", loopFibonacci1(15));
console.log("resursiveFibonacci", resursiveFibonacci(15));
console.log("memoizedFibonacci", memoizedFibonacci(15));
