// mods/C.js
import { callDepth, b } from "./B.js";
import { afn } from "./A.js";

console.log("CCCC");

export function c(depth = 0) {
  console.log(`${callDepth(depth)}C-c`);
  b(depth + 1);
}
export default (depth = 0) => {
  console.log(`${callDepth(depth)}C-def`);
  afn();
};
