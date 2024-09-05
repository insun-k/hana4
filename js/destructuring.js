//swap
let a = 1;
let b = 2;
let t = a;
a = b;
b = t;
console.log("🚀 old - a b:", a, b);

a = 1;
b = 2;
[b, a] = [a, b];
console.log("🚀 old - a b:", a, b);

console.log("----------------------");
const arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];
console.log("🚀 ~ arr:", arr);

console.log("----------------------");
// error
// let r = q * 10;
// let q;

// 선언 후 사용 - 가능
let r; // = undefined;
let q; // = undefined;
r = q * 10;
q = 1;

let aaa = bbb * 10;
let bbb;
