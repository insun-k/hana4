import assert from "assert";

function ex1() {
  // setTimeout(function () {
  //   console.log("depth1", new Date());
  //   setTimeout(function () {
  //     console.log("depth2", new Date());
  //     setTimeout(function () {
  //       console.log("depth3", new Date());
  //       throw new Error("Already 3-depth!!");
  //     }, 3000);
  //   }, 2000);
  // }, 1000);

  // console.log("START!", new Date());

  const depthTimer = (depth) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`depth${depth}`, new Date());
        if (depth >= 3) reject("Already 3-depth!!");
        resolve(depth + 1);
      }, depth * 1000);
    });

  depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);

  //   const promi = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const now = new Date();
  //       resolve(now);
  //       reject("No");
  //     }, 1000);
  //   });

  // //  console.log("START!", new Date());

  //   promi
  //     .then((x) => {
  //       console.log("depth1", x);
  //       return promi;
  //     })
  //     .then(() => {
  //       setTimeout(() => {
  //         console.log("depth2", new Date());
  //         return promi;
  //       }, 2000);
  //     })
  //     .then(() => {
  //       setTimeout(() => {
  //         console.log("depth3", new Date());
  //         throw new Error("Already 3-depth!!");
  //       }, 3000);
  //     });
}

// then의 리턴 => promise타입
// then 함수 속 : return = Promise.resolve, throw = Promise.reject

function ex2() {
  const promiseFn = (id = 1) =>
    new Promise((resolve, reject) => {
      console.log("id>>", id);
      if (id < 7) resolve(id + 1);
      reject(new Error("어디로?" + id));
    });

  promiseFn(1)
    .then((res) => {
      console.log("res1>>", res);
      promiseFn(res); // Need Return the Promise Object!!
      // return이 없어서 undefined 리턴한 상태
      // if (ret instanceof Promise) return ret;
      // else return Promise.resolve(ret);
    })
    .then((res) => {
      console.log("res2>>", res); // res가 undefined 이라면 ⇒ 여기서 throw 하면 될까?
      if (res === undefined) throw new Error("xxxx");
    })
    .catch((err) => console.log("Error!!>>", err));
}

function ex3() {
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

  const promiseAll = (promises) =>
    new Promise((resolve, reject) => {
      const results = [];
      let cntToRun = promises.length;
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        (promise instanceof Promise ? promise : Promise.resolve(promise))
          .then((succ) => {
            results[i] = succ;
            if ((cntToRun -= 1) === 0) resolve(results);
          })
          .catch((error) => reject(error));
      }
    });

  promiseAll([randTime(1), randTime(2), randTime(3)])
    .then((arr) => {
      console.table(arr);
      assert.deepStrictEqual(arr, vals);
    })
    .catch(console.error);

  console.log("--------------------------------");
  promiseAll([randTime(11), Promise.reject("RRR"), randTime(33)])
    .then((array) => {
      console.table(array);
      console.log(JSON.stringify(array, null, " "));
      console.log("여긴 과연 호출될까?!");
    })
    .catch((error) => {
      console.log("reject!!!!!!>>", error);
    });

  // Promise.all 사용
  // Promise.all([randTime(1), randTime(2), randTime(3)])
  //   .then((arr) => {
  //     console.table(arr);
  //     assert.deepStrictEqual(arr, vals);
  //   })
  //   .catch(console.error);

  // Promise.allSettled 사용
  // Promise.allSettled([randTime(11), Promise.reject("RRR"), randTime(33)])
  //   .then((array) => {
  //     console.table(array);
  //     console.log(JSON.stringify(array, null, " "));
  //     console.log("여긴 과연 호출될까?!");
  //   })
  //   .catch((error) => {
  //     console.log("reject!!!!!!>>", error);
  //   });
}

ex3();
