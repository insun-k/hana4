// Think Together
const regexp = /senior|coding/gi;
if (regexp.test("Junior Developer")) console.log("1 OK");
if (regexp.test("Senior Developer")) console.log("2 OK");
if (regexp.test("JS Coding")) console.log("3 OK");
if (regexp.test("JavaScript Coding")) console.log("4 OK");

const regexp2 = /senior|coding/gi;
console.log(regexp2.exec("Senior Developer")); // last index 이후로
console.log(regexp2.exec("JSxxxxxx Coding"));
// console.log(regexp2.exec("JSxxx Coding"));

const regexp3 = /senior|coding/gi;
if (regexp3.test("JS Coding")) console.log("11 OK");
if (regexp3.test("JS Coding")) console.log("22 OK");
if (regexp3.test("JS Coding")) console.log("22 OK");

console.log("-------------------------------------");

const str = "Senior Coding Learning JS";
const r = str.replace(/[A-Z]/g, (...args) => {
  console.log("🚀 ~ r ~ args:", args);
  return args[0].toLowerCase(); // 대문자 -> 소문자
});
console.log("🚀 ~ r:", r);

const r2 = str.replace(/[A-z]/g, (matchedStr, posiiton, orgString) => {
  return matchedStr.toUpperCase(); // 대문자 -> 소문자
});

console.log("🚀 ~ r2:", r2);
