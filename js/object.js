const user = {
  123: 1,
  [12345n]: 2,
  [Symbol()]: "Hong", // symbol은 따로 차면 각각 나옴
  [Symbol()]: "HongKK",
  ["name"]: "Hong",
  id: 1,
  id: 2,
};

console.log(user);
console.log(user[123]);
console.log(user[12345n]);

//const keys = Object.keys(user);
const keys = Reflect.ownKeys(user); // 심볼 포함 모든 키
console.log("🚀 ~ Reflect 사용 keys:", keys);

let symKey;
for (let i = 0; i < keys.length; i++) {
  const typ = typeof keys[i];
  console.log(keys[i], "=>", typ);

  if (typ == "symbol") {
    symkey = keys[i];
  }
}

console.log("🚀 ~ symkey:", user[symkey]);

user.addr = "Seoul"; // 추가
console.log("🚀 ~ user:", user);

// delete user.addr; // 삭제

console.log("addr" in user, user.hasOwnProperty("addr"));

console.log("user.getOwnPropSym>", Object.getOwnPropertySymbols(user));

const values = Object.values(user); // 심볼 제외
console.log("🚀 ~ values:", values);
const entries = Object.entries(user);
console.log("🚀 ~ entries:", entries);
const kkeys = Object.keys(user);
console.log("🚀 ~ kkeys:", kkeys);

console.log("-----------------------------");
// 방식1
function entriesWithSymbol(obj) {
  const rets = [];
  if (!obj || typeof obj !== "object") return [];
  for (const k of Reflect.ownKeys(obj)) {
    console.log("k=", k);
    rets.push([[k, obj[k]]]);
  }
  return rets;
}
console.log("ref.entries>>", entriesWithSymbol(user));

// 방식 2
/**
 * symbol keys들을 포함한 객체의 entries를 구하는 함수
 * @param obj
 * @returns
 */
function entriesWithSymbol2(obj) {
  if (!obj || typeof obj !== "object")
    // argument value 체크
    return [];
  const entries = Object.entries(obj); // 심볼 제외
  const onlySymbolKeys = Object.getOwnPropertySymbols(obj); // 심볼만 따로 넣기
  for (const sym of onlySymbolKeys) {
    entries.push([sym, obj[sym]]);
  }
  return entries;
}
console.log("🚀 ~ entriesWithSymbol2:", entriesWithSymbol2(user));

console.log("-----------------------------");
console.log(Object.getOwnPropertyDescriptor(user, "id"));
console.log(Object.getOwnPropertyDescriptors(user));
Object.defineProperty(user, "age", {
  value: 39,
  writable: false,
  enumerable: true,
  configurable: true,
});
user.age = 33;
console.log("🚀 ~ user.age:", user.age); // age 수정 안됨

console.log("-----------------------------");
// 요즘은 assign 대신 디스트럭처링 사용
const xobj = Object.assign({ x: 100 }, user);
console.log("🚀 ~ xobj:", xobj);
console.log("🚀 ~ user:", user);

// create 대신 getPrototypeof 사용
const cobj = Object.create(user);
console.log("🚀 ~ cobj:", cobj, cobj.__proto__);
console.log("====>", Object.getPrototypeOf(cobj));
