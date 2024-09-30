const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("XX");
    resolve("Ok"); // 먼저 부른 resolve => success!
    reject("error");
  }, 1000);
});

console.log("p=", p);

const ppp = p
  .then((succResult) => {
    console.log("🚀 ~ succResult:", succResult, p);
    return new Promise((resolve) => resolve("OKPPP"));
  })
  .then((y) => console.log("y=", y));

ppp.then((x) => console.log("ppp.x=", x));

p.then((x) => console.log("p.x=", x));

p.catch((error) => {
  consoleog("🚀 ~ p.then ~ error:", error);
});

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
