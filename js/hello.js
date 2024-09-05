console.log("Hello, World!");
let a = 1;
let b = 2;
let c = (a++, b++);
let d = (a--, b + a);
console.log("🚀 ~ d:", d);

function f() {
  console.log("xxxx");
  return undefined;
}

x = f();
console.log("🚀 ~ x:", x);

let aa = 0b1010;
let bb = 0b1100;
const and = aa & bb;
console.log("🚀 ~ cc:", and.toString(2));

const or = aa | bb;
console.log("🚀 ~ or:", or.toString(2));

const xor = aa ^ bb;
console.log("🚀 ~ xor:", xor.toString(2));

const R = 1;
const W = 2;
const E = 4; // 0b001, 0b010, 0b100
let auth = parseInt("011", 2);
console.log("🚀 ~ auth:", auth);
console.log("auth-bin>>", "0b0${auth.toString(2)}");
const hasWriteAuth = auth & W;
console.log("🚀 ~ hasWriteAuth:", hasWriteAuth);
const hasExeAuth = auth & E;
console.log("🚀 ~ hasExeAuth:", hasExeAuth);
const hasReadAndExeAuth = auth & (R | E);
auth = auth ^ E; // XOR

dt = new Date();
console.log(dt.getTime());

a;
