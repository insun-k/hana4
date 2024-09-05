// mods/A.js
import { b } from "./B.js";
import defC, { c } from "./C.js";
export const afn = () => console.log("a.afn!!"); // 이 위치 OK! ModuleTable 선등록)

console.log("AAAAAA");

console.log("---------------");
b();
console.log("---------------");
c();
console.log("---------------");
defC();

l; // export const afn = () => console.log('a.afn!!'); // TDZ Error (uninitialize)
