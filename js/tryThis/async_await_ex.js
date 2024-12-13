// 문제 1)
const vals = [1, 2, 3];
const randTime = (val) =>
  new Promise((resolve) => {
    const rtime = Math.random() * 1000;
    console.log("start>>", val, rtime);
    setTimeout(() => {
      console.log("run>>", val);
      resolve(val);
    }, rtime);
  });

// await, async 사용한 promise
const promiseAllSync = async (promises) => {
  let idx = 0;
  const results = [];

  for (const promise of promises) {
    promise.catch((err) => err);
  }

  for (const promise of promises) {
    results[idx++] = await promise;
  }
  //   for (const promise of promises) {
  //     results[idx++] = await promise;
  //   }
  return results;
};

// 기존 Promise
// const promiseAll = (promises) =>
//   new Promise((resolve, reject) => {
//     const results = [];
//     let cntToRun = promises.length;
//     for (let i = 0; i < promises.length; i++) {
//       const promise = promises[i];
//       (promise instanceof Promise ? promise : Promise.resolve(promise))
//         .then((succ) => {
//           results[i] = succ;
//           if ((cntToRun -= 1) === 0) resolve(results);
//         })
//         .catch((error) => reject(error));
//     }
//   });

const arr = await promiseAllSync([randTime(1), randTime(2), randTime(3)]);
console.table(arr);

try {
  const array = await promiseAllSync([
    randTime(11),
    Promise.reject("RRR"),
    randTime(33),
  ]);
  console.table(array);
  console.log(JSON.stringify(array, null, " "));
  console.log("여긴 과연 호출될까?!");
} catch (error) {
  console.log("reject>>", error);
}

console.log("---------------------------------------");
// 문제 2)
const BASE_URL = "https://jsonplaceholder.typicode.com";

const myFetch = async (path) => {
  const res = await fetch(`${BASE_URL}/${path}`);
  return res.json();
};

const getUserPosts = async (userId) => myFetch(`users/${userId}`);
