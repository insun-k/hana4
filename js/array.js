import assert from "assert";

const hong = { id: 1, name: "Hong" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };

const users = [hong, kim, lee, park];
const inxKim = users.indexOf(kim);
console.log("🚀 ~ inxKim:", inxKim);

// ** findIndex
console.log("-------------------");
//const find3 = (id) => a.id == id;
// 고차함수 이해하기
const findId = (id) => (a) => a.id == id;
// 콜백함수로 인덱스 찾기
const inxId2 = users.findIndex(findId(3));
console.log("🚀 ~ inxId2:", inxId2);

// 뒤에서 찾기
const idxId1 = users.findLastIndex(findId(3));
console.log("🚀 ~ idxId1:", idxId1);

// ** forEach
console.log("-------------------");
//users.forEach((a, i, users)) // 기본 세팅, 인자 골라서 사용
users.forEach((a) => console.log(a.id, a.name)); // => 콜백함수

const arr = [2, 3, 4, 2, 5];
const isOdd = (n) => n % 2 != 0;

// for (const val of arr) {
//   console.log(isOdd(val));
// }
// 위 for문 대신 forEach 사용
arr.forEach((a) => console.log(isOdd(a)));

// ** find
// find는 값을 찾아줌 (인덱스 리턴 x)
const kim2 = users.find((user) => user.name == "Kim");
console.log("🚀 ~ kim2:", kim2);
const hong2 = users.findLast((user) => user.name == "Hong");
console.log("🚀 ~ hong2:", hong2);

// ** filter
console.log("-------------------");
const hasIUsers = users.filter((user) => user.name.includes("i"));
console.log("🚀 ~ hasIUsers:", hasIUsers);

// ** map
const names = users.map((a) => a.name);
console.log("🚀 ~ names:", names);

console.log("-------------------");
// 문제) objs의 각 원소를 reduce를 이용해 합쳐보세요
const objs = [{ id: 1 }, { name: "Hong" }, { addr: "Seoul", id: 5 }];
const obj = objs.reduce((acc, o) => ({ ...acc, ...o })); // 괄호 씌워주면 괄호로 인식
console.log("🚀 ~ obj:", obj);
assert.deepStrictEqual(obj, { id: 5, name: "Hong", addr: "Seoul" });
