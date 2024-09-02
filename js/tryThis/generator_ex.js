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
