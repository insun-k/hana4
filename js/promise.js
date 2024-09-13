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

// .cat((error) => {
//   consoleog("🚀 ~ p.then ~ error:", error);
// });
