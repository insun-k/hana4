"use strict";
const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// noUncheckedIndexedAccess : True
console.log(oneToTen[400]?.toFixed(2));
// type SomeInterface = {
//     [key: string]: number;
// }
let is = {
    one: 1,
    two: 2,
    //three: "tree",
};
is["one"]?.toFixed(2); // OK
is["four"]?.toFixed(2); // false: OK, but Runtime Error in JS!
is["four"]?.toFixed(2); // true: Error in TS Compiling!
const nums1 = [1, 2, 3, 4, 5];
const nums2 = [10, 20, 30, 40, 50];
const result1 = nums1.concat(nums2);
// 당연히 result1은 number[]
const strings1 = ["lim", "eun", "ha"];
//const result2 = result1.concat(strings1);
const result2 = [...result1, ...strings1];
console.log("🚀 ~ result2:", result2);
