// const afterTime = (sec) =>
//   new Promise((resolve, reject) => setTimeout(resolve, sec * 500, sec));

// const r1 = await afterTime(1);
// console.log("🚀 ~ r1:", r1);

// function f1() {
//   afterTime(0.5).then(console.log);
// }

// async function f2() {
//   const r2 = await afterTime(1);
//   console.log("🚀 ~ f2 ~ f2:", r2);
//   return r2;
// }

// const rf1 = f1();
// const rf2 = await f2();
// console.log(rf1, rf2);

// console.log("-----------------------------");
// // [1,2,3] 다 찍힘
// const odds = [1, 2, 3].filter(async (val) => {
//   const r = await afterTime(val);
//   console.log(r);
//   return r % 2 === 1;
// });

// // [1,3]
// console.log("odds=", odds);
// const ps = [1, 2, 3].map(afterTime);

// const rrr = (await Promise.all(ps)).filter((n) => n % 2);
// console.log("🚀 ~ rrr:", rrr);

// console.log("-----------------------------");
// async function sleep(n) {
//   await new Promise((reslove) => setTimeout(reslove, n * 2000));
// }

// console.log("-----------------------------");
// function getApple() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve("apple"), 1000);
//   });
// }
// function getBanana() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve("banana"), 1000);
//   });
// }

// async function getFruites() {
//   const apple = getApple();
//   const banana = getBanana();

//   let a = await apple;
//   let b = await banana;
//   console.log(`${a}, ${b}`);
// }

// getFruites();
