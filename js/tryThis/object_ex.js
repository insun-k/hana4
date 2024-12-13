import assert from "assert";

function ex1() {
  const arr = [100, 200, 300, 400, 500, 600, 700];
  console.log("-----1-1번-----");
  for (const k in arr) {
    console.log(k);
  }

  console.log("-----1-2번-----");
  for (const v in arr) {
    console.log(arr[v]);
  }

  const obj = {
    name: "Kim",
    addr: "Yongsan",
    level: 1,
    role: 9,
    receive: false,
  };

  console.log("-----1-3번-----");
  for (const k in obj) {
    console.log(k);
  }

  console.log("-----1-4번-----");
  for (const v in obj) {
    console.log(v);
  }

  console.log("-----1-5번-----");
  for (const value of Object.values(obj)) {
    console.log(value);
  }

  console.log("-----1-6번-----");
  Object.defineProperty(obj, "level", {
    enumerable: false, // 열거 불가능
  });
  console.log(obj);

  console.log("-----1-7번-----");
  //   Object.defineProperty(obj, "role", {
  //     enumerable: true,
  //     writable: false,
  //     configurable: false,
  //   });
  Object.freeze(obj);
  Object.defineProperty(obj, "role", { writable: false });
  obj.role = 11;
  console.log(obj);
}

function ex2() {
  const data = [
    ["A", 10, 20],
    ["B", 30, 40],
    ["C", 50, 60, 70],
  ];
  function makeObjectFromArray(array) {
    const newObj = {};
    for (const [k, ...v] of array) {
      newObj[k] = v;
    }
    return newObj;
    //   for (let i = 0; i < array.length; i++) {
    //     const [[a, ...rest], ,] = array;
    //     newObj.a = rest;
    //     delete array[i];
    //   }
  }
  const dataObj = makeObjectFromArray(data);
  console.log("makeObjectFromArray", dataObj);

  function makeArrayFromObject(obj) {
    const newArr = [];
    for (const key in obj) {
      newArr.push([key, ...obj[key]]);
    }
    return newArr;
  }
  console.log("makeArrayFromObject", makeArrayFromObject(dataObj));
}

function sallowCopy(obj) {
  const kim = { nid: 3, nm: "Kim", addr: "Pusan" };
  const newKim = {};
  for (const k in kim) {
    newKim[k] = kim[k];
  }
  newKim.addr = "Daegu";
  console.log(kim.addr !== newKim.addr);
}

//sallowCopy();

// deep Copy
function isObject(obj) {
  return obj && typeof obj === "object";
}

const Kim = { nid: 3, nm: "Kim", addr: { city: "Pusan" }, [Symbol()]: "sym" };

function copyObject(obj) {
  if (!isObject(obj)) return obj;
  const newer = {};
  //   for (const k of obj) {
  //     newer[k] = copyObject(obj[k]); // 재귀
  //   }

  for (const k in Reflect.ownKeys(obj)) {
    newer[k] = copyObject(obj[k]);
  }
  return newer;
}
const newKim = copyObject(Kim);
assert.deepStrictEqual(Kim, newKim);
newKim.addr.city = "Daegu";
assert.notDeepStrictEqual(Kim, newKim);
console.log("shallow>>", Kim.addr.city !== newKim.addr.city); // true면 통과!
console.log("🚀  kim newKim:", Kim, newKim);
