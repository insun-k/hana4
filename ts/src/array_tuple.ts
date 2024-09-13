let getNames: () => string[];
let nameGetters: (() => string)[];

const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// noUncheckedIndexedAccess : True
console.log(oneToTen[400]?.toFixed(2));

// * 인덱스 시그니처
interface SomeInterface {
  [key: string]: number;
}
// type SomeInterface = {
//     [key: string]: number;
// }

let is: SomeInterface = {
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

let xyz = "xzy" as const;
//xyz = 'zzz'    // let에 as const 붙이면 값 할당  불가

const getNameAgeTupe = (): [string, number] => {
  return ["Lim", 20];
};

const na = getNameAgeTupe(); // na의 타입은 [string, number]

const getNameAgeArr = () => ["Lim", 30];
// => (string | number)[] 배열로 추론

const getNameAgeTuple = () => ["Jang", 30] as const;
// => [string, number] & readonly 튜플로 추론
