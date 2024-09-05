import assert from "assert";

function ex1() {
  // 문제) check prime number
  // 1) 소수를 가지고 있는지?

  // isPrime 방법 1
  // const isPrime = (num) => {
  //   if (num == 1) return false;
  //   for (let a = 2; a < num; a++) {
  //     if (num % a == 0) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };
  // console.log(arr.map((a) => [a, isPrime(a)]));

  const isPrime = (n) => {
    if (n == 1) return false;
    return Array.from({ length: Math.sqrt(n) - 1 }, (_, i) => i + 2).every(
      (a) => n % a != 0
    );
  };

  //const hasPrime = (arr) => arr.some((a) => isPrime(a));
  const hasPrime = (arr) => arr.some(isPrime); // 위랑 같은 코드
  assert.strictEqual(hasPrime([1, 2, 3]), true);

  // 2) 소수를 가지고 있다면 출력
  const primeNumbers = (arr) =>
    arr.filter((a) => {
      isPrime(a);
    });
  primeNumbers(arr);
}

function ex2() {
  const arr2 = [1, 2, 3, 4, 5];

  const ex1 = arr2.slice(1, 2);
  console.log("🚀 ~ ex1:", ex1, arr2);

  const ex2 = arr2.slice(2);
  console.log("🚀 ~ ex2:", ex2, arr2);

  const ex3 = arr2.splice(1, 3);
  console.log("🚀 ~ ex3:", ex3, arr2);

  const ex4 = arr2.splice(1, 0, ...ex3);
  console.log("🚀 ~ ex4:", ex4, arr2);

  const ex5 = arr2.splice(2);
  console.log("🚀 ~ ex5:", ex5, arr2);

  const ex6 = arr2.splice(2, 0, ...ex5);
  console.log("🚀 ~ ex6:", ex6, arr2);

  const ex7 = arr2.splice(2, Infinity, "X", "Y", "Z", 4, 5);
  console.log("🚀 ~ ex7:", ex7, arr2); // infinity 대신 arr2.length 가능

  const ex8 = arr2.splice(2, Infinity, ...ex7);
  console.log("🚀 ~ ex8:", [...arr2, 0, 2, "X", "Y", "Z", 4, 5]);
}

function ex3() {
  const arr = [1, 2, 3, 4];
  const push = (arr, ...args) => [...arr, ...args];

  //const pop = (arr, x = 1) => arr.slice(-x); // 디폴트 입력해주기
  const pop = (arr, x = 1) => {
    const result = arr.slice(-x);
    if (result.length === 1) return result[0]; // 한개 일때는 배열의 길이를 받아서 if처리
    return result;
  };

  const unshift = (arr, ...args) => [...args, ...arr];

  const shift = (arr, x) => arr.slice(x);

  assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
  assert.deepStrictEqual(pop(arr), 4);
  assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝(꺼내 줘)!
  assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
  assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
  assert.deepStrictEqual(shift(arr, 1), [2, 3, 4]); // => ???
  assert.deepStrictEqual(shift(arr, 2), [3, 4]);
  assert.deepStrictEqual(arr, [1, 2, 3, 4]);
}

function ex4() {
  const arr = [1, 2, 3, 4];

  // 첫번째로 푼 방법 .. => splice 비순수함수 여서 assert 2개 실행 시 오류
  // const deleteArray = (arr, ...args) => {
  //   del = arr.slice(...args);
  //   for (d of del) {
  //     arr.splice(arr.indexOf(d), 1);
  //   }
  //   return arr;
  // };

  // 두번째로 푼 방법
  // const deleteArray = (arr, ...args) => {
  //   del = arr.slice(...args);
  //   for (d of del) {
  //     arr = arr.filter((a) => a !== d);
  //   }
  //   return arr;
  // };

  // 강사님 풀이 (삭제는 filter!!)
  // const deleteArray = (arr, start, end = Infinity) =>
  //   arr.filter((a, i) => i < start || i >= end);

  const deleteArray = (arr, start, end = Infinity) => {
    if (typeof start === "number")
      return arr.filter((a, i) => i < start || i >= end);
    return arr.filter((a) => a[start] !== end);
  };

  assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
  assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
  assert.deepStrictEqual(arr, [1, 2, 3, 4]);

  const Hong = { id: 1, name: "Hong" };
  const Kim = { id: 2, name: "Kim" };
  const Lee = { id: 3, name: "Lee" };
  const users = [Hong, Kim, Lee];

  assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
  assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
  assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
  assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);
}

function ex5() {
  const hong = { id: 1, name: "Hong" };
  const choi = { id: 5, name: "Choi" };
  const kim = { id: 2, name: "kim" };
  const lee = { id: 3, name: "Lee" };
  const park = { id: 4, name: "Park" };
  const users = [kim, lee, park]; // 오염되면 안됨!!

  users.addUser = function (newer) {
    return [...this, newer];
  };

  users.removeUser = function (toRemoveUser) {
    return this.filter((user) => user.id !== toRemoveUser.id);
  };

  users.changeUser = function (fromUser, toUser) {
    return users.map((user) => (user.id == fromUser.id ? toUser : user));
  };

  ["addUser", "removeUser", "chageUser"].forEach((fn) =>
    Object.defineProperty(users, fn, {
      enumerable: false,
    })
  );

  users.addUser(hong); // [kim, lee, park, hong]
  users.removeUser(lee); // [kim, park]
  users.changeUser(kim, choi);

  assert.deepStrictEqual(users.addUser(hong), [kim, lee, park, hong]);
  assert.deepStrictEqual(users, [kim, lee, park]);

  assert.deepStrictEqual(users.removeUser(lee), [kim, park]);
  assert.deepStrictEqual(users, [kim, lee, park]);

  assert.deepStrictEqual(users.changeUser(kim, choi), [choi, lee, park]);
  assert.deepStrictEqual(users, [kim, lee, park]);
}

function ex6() {
  // ex1
  const arr = [1, 2, 3, true];
  const ret1 = arr.map((a) => `${a}`);
  //const ret1 = arr.map(String);
  assert.deepStrictEqual(ret1, ["1", "2", "3", "true"]);

  // ex2
  const classNames = (...args) => {
    const newArr = args.reduce((s, str) => `${s}${str}`);
    return [...newArr].filter((a) => a !== " ").join(" ");
  };

  // 강사님 풀이
  // const classNames = (...args) =>
  //   args
  //     .map((a) => a.trim())
  //     .filter(Boolean)
  //     .join(" ");

  assert.strictEqual(classNames("", " a b c ", "d ", "", "e"), "a b c d e");
  assert.strictEqual(classNames("", " a   b   c ", "d ", "", "e"), "a b c d e");
}

function ex7() {
  const kim = { id: 2, name: "kim" };
  const lee = { id: 3, name: "Lee" };
  const park = { id: 4, name: "Park" };
  const users = [kim, lee, park]; // 오염되면 안됨!!

  //initValue = arr[0] => arr 가 null이거나 undefined이면 사용 불가
  const reduce = (arr, fn, initValue) => {
    if (!arr || !Array.isArray(arr)) return [];

    let i = 0;

    // if (!initValue) {
    //   acc = arr[0];
    //   i = 1;
    // }

    // 위에 코드 간결하게 (쉼표 연산자 사용)
    let acc = initValue ?? ((i = 1), arr[0]); // ?? 대신 || 사용 ? => x

    for (; i < arr.length; i++) {
      acc = fn(acc, arr[i]);
    }

    return acc;
  };
  console.log(reduce([1, 2, 3], (a, b) => a + b, 0)); // 6이면 통과!

  reduce([1, 2, 3, 4, 5], (a, b) => a + b); // 15면 통과!
  reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1); // 120이면 통과!
  reduce([2, 2, 2], (a, b) => a * b); // 8이면 통과!
  reduce([3, 3, 3], (a, b) => a * b, 0); // 0이면 통과!
  //reduce(users, (acc, user) => acc + user.name); // [object Object]LeePark

  const a10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assert.deepStrictEqual(
    reduce(a10, (acc, cur) => acc + cur, 0),
    a10.reduce((acc, cur) => acc + cur, 0)
  );

  assert.deepStrictEqual(
    reduce(users, (acc, user) => acc + user.name),
    users.reduce((acc, user) => acc + user.name)
  );
}

function ex8() {
  const square = (a) => a ** 2;
  const sqrt = (a) => Math.sqrt(a);
  const cube = (a) => a ** 3;
  const arr = [1, 2, 3, 4, 5];
  const r5 = arr.map(square).map(sqrt).map(cube);

  const baseJobs = [square, sqrt, cube];
  const r6 = arr.map((a) => baseJobs.reduce((acc, job) => job(acc), a));
  //console.log("🚀 ~ r6:", r6);

  const aJobs = [square, sqrt, cube];
  const bJobs = [cube, square];

  const robot = (arr, jobs) => {
    return arr.map((a) => jobs.reduce((acc, job) => job(acc), a));
  };

  assert.deepStrictEqual(robot(arr, aJobs), [1, 8, 27, 64, 125]);
  assert.deepStrictEqual(robot(arr, bJobs), [1, 64, 729, 4096, 15625]);
}

function ex9() {
  const range = (start, end, step = start > end ? -1 : 1) => {
    if (step === 0 || start === end) return [start];

    // 비정상 처리
    //if ((start > end && step > 0) || (start < end && step < 0)) return [];
    if ((start - end) * step > 0) return [];

    // if (end === undefined) {
    //   if (start > 0) {
    //     end = start;
    //     start = 1;
    //   } else if (start < 0) {
    //     end = -1;
    //   } else {
    //     end = 0;
    //   }
    // }

    // // 위 코드(if문) 리펙토링
    // let tmp = start;
    // end = end ?? (start > 0 ? ((start = 1), tmp) : start < 0 ? -1 : 0);
    //end = end ?? (start > 0 ? ((start = 1), tmp) : start % 2);

    const results = [];
    for (let i = start; start > end ? i >= end : i <= end; i += step) {
      results.push(i);
    }
    return results;
  };

  assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
  assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

  assert.deepStrictEqual(range(5, 5, 0), [5]);
  assert.deepStrictEqual(range(1, 5, 0), [1]);
  assert.deepStrictEqual(range(5, 5, -1), [5]);
  assert.deepStrictEqual(range(5, 5), [5]);
  assert.deepStrictEqual(range(0, 0, 5), [0]);
  assert.deepStrictEqual(range(1, 5, -1), []);

  assert.deepStrictEqual(range(1, 5, 6), [1]);
  assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
  assert.deepStrictEqual(range(-3), [-3, -2, -1]);

  assert.deepStrictEqual(range(5, 1, 1), []);
  assert.deepStrictEqual(range(0, -1), [0, -1]);
  assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
  assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
  assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

  assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
  assert.deepStrictEqual(range(0), [0]);
  assert.deepStrictEqual(range(0, 0), [0]);
  assert.deepStrictEqual(range(2, 1, -5), [2]);
  assert.deepStrictEqual(range(0, -1, -5), [0]);
  assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
  assert.deepStrictEqual(
    range(50),
    Array.from({ length: 50 }, (_, i) => i + 1)
  );
  assert.deepStrictEqual(
    range(1, 150, 3),
    Array.from({ length: 50 }, (_, i) => i * 3 + 1)
  );
}

function ex10() {
  // O(n^2) 풀이
  const keyPairN2 = (arr, n) => {
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i] + arr[j] == n) return [i, j];
      }
    }
  };

  const keyPair = (arr, n) => {
    const cache = {}; // {짝이 되는 값 : 짝의 index}
    for (let i = 0; i < arr.length; i += 1) {
      const val = arr[i];
      if (val in cache) return [cache[val], i];
      cache[n - val] = i;
    }
  };

  //console.log(keyPair([1, 3, 4, 5], 7)); // [1, 2]
  // keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
  // keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
  // keyPair([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]
  // // cf. O(n^2) ⇒ ⇒ ⇒ O(N) || O(logN)
  assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
  assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
  assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
  assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
}
