import assert from "assert";

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("XX");
//     resolve("Ok"); // 먼저 부른 resolve => success!
//     reject("error");
//   }, 1000);
// });

// console.log("p=", p);

// const ppp = p
//   .then((succResult) => {
//     console.log("🚀 ~ succResult:", succResult, p);
//     return new Promise((resolve) => resolve("OKPPP"));
//   })
//   .then((y) => {
//     console.log("y=", y);
//     // return "xxx";
//   });

// ppp.then((x) => console.log("ppp.x=", x));   // => ppp의 return 값이 없어서

// p.then((x) => console.log("p.x=", x));

// p.catch((error) => {
//   consoleog("🚀 ~ p.then ~ error:", error);
// });

// const promiseFn = (id) =>
//   new Promise((resolve, reject) => {
//     console.log("id>>", id);
//     if (id < 5) resolve(id + 1);
//     else reject(new Error("???" + id));
//   });

// promiseFn(1)
//   .then((res) => {
//     console.log("res1>>", res);
//     return promiseFn(res);
//   })
//   .then((res) => {
//     console.log("res2>>", res);
//     return promiseFn(res);
//   })
//   .then((res) => promiseFn(res))
//   .then(promiseFn)
//   .catch((error) => console.log(error));

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// const randTime = () =>
//   new Promise((resolve, reject) => {
//     const sec = rand(1, 4) * 500;
//     setTimeout(() => {
//       console.log("sec=", sec);
//       resolve(sec);
//     }, sec);
//   });

// const p = false;
// console.time("promi");
// if (p) {
//   Promise.all([randTime(), randTime(), randTime()]).then(() =>
//     console.timeEnd("promi")
//   );
// } else {
//   randTime()
//     .then((x) => {
//       return randTime();
//     })
//     .then(() => {
//       return randTime();
//     })
//     .then(() => {
//       return randTime();
//     })
//     .then(() => console.timeEnd("promi"));
// }

// Promise.allSettled([randTime(1), Promise.reject("Error!"), randTime(2)])
//   .then(console.table)
//   .catch(console.log);

// setTimeout(() => console.log("c1"), 0);
// Promise.resolve().then(console.log("c2")).then(console.log("c3"));

// const sampleUrl = "https://jsonplaceholder.typicode.com/users/1";
// const myFetch = (url) => fetch(url).then((res) => res.json());

// myFetch(sampleUrl).then((id, name) => console.log("user>>", id, name));

const randTime = (val) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

Promise.all([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.table(arr);
    // assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);

// Promise.all([randTime(11), Promise.reject("RRR"), randTime(33)])
//   .then((array) => {
//     console.log("여긴 과연 호출될까?!");
//   })
//   .catch((error) => {
//     console.log("reject!!!!!!>>", error);
//   });
