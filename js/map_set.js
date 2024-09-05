// map 예제
const wm = new WeakMap();
const m = new Map();
let obj1 = { id: 1 };
let x = { id: 10 };
{
  const obj2 = { id: 2 };

  wm.set(obj1, 1);
  m.set(obj1, 1);
  wm.set(obj2, x);
  m.set(obj2, x);
  console.log(wm, wm.has(obj1));
  console.log(m, m.has(obj1));

  obj1 = null; // obj1 주소 변경!
  obj2.id = 3;
  x = { id: 100 };
  // x.id = 100;
  console.log("---------------------------");
  console.log(wm, wm.has(obj1), wm.has(obj2));
  console.log(m, m.has(obj1), m.has(obj2));
} // wm만 전역이라면 obj1, obj2는 GC!!

console.log("--------------------------");
console.log(m.size, wm.size); // 2, undefined
console.log(wm, wm.has(obj1));
console.log(m, m.has(obj1));
console.log("m.keys>>", [...m.keys()]);
console.log("m.values>>", [...m.values()], obj1, x);

// set 예제
console.log("=================================");
// WeakSet vs Set
const ws = new WeakSet();
const s = new Set();
{
  let obj3 = { id: 1 };
  const obj4 = { id: 2 };
  ws.add(obj3);
  ws.add(obj4);

  obj3 = null; // obj1 주소 변경
  console.log(ws, ws.has(obj3));

  s.add(obj3);
  s.add(obj4);
  console.log(s, s.has(obj3));
} // ws만 전역이라면 obj1, obj2는 GC!!
console.log(s.size, ws.size);
