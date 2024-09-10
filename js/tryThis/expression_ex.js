//const assert = require("assert");
import assert from "assert"; // => esm으로 변경

function ex1() {
  function fmt([label, unit], price) {
    return `${label}${price.toLocaleString().padStart(9)}${unit}`;
  }

  const total = { price: 45000, vat: 4500 };
  console.log(fmt`주문합계: ${total.price}원`);
  console.log(fmt`세액합계: ${total.vat}원`);
}

// // 2-1)

// function isEndJaum(string) {
//   let result;
//   const last = string[string.length - 1];
//   const s = last.charCodeAt(0);

//   const engTest = /[A-Z]/g;
//   const numTest = /[0-1]/g;

//   if (s >= 44032 && s <= 55203) {
//     console.log("true");
//   }

//   //   for (let i = "가".charCodeAt(); i <= "힣".charCodeAt(); i++) {
//   //     if ((i - 44032) % 28 === 0)
//   //       console.log(i - 44032, (i - 44032) % 28, String.fromCharCode(i));
//   //   }

//   // LMNR

//   const engArr = "LMNRlmnr";
//   const numArr = "136780";

//   if (last.engTest) {
//     result = eng.includes(last) ? true : false;
//     console.log("🚀 ~ isEndJaum ~ result:", result);
//   }

//   return result;
//   //   //   const result = s >= 12593 && s <= 12622;
//   //   //   return result;
// }

// console.log(isEndJaum("A"));

// console.log("🚀 ~ arr:", arr);

// // 28개

//function searchByKoreanInitialSound(s, str) {}

function ex4() {
  // 4-1)
  const upperToLower = (str) => {
    // const r = str.replace(/([A-Z])/g, "*$1*-");
    str.replace(/([A-Z])/g, (matchedStr) => `*${matchedStr.toLowerCase()}*-`);
  };

  // 4-2)
  const swapCase = (str) =>
    str.replace(/([A-Z]*)([a-z]*)/g, (_matchedStr, upper, lower) => {
      //console.log(upper, lower);
      return `${upper.toLowerCase()}${lower.toUpperCase()}`;
    });

  //console.log(swapCase("Senior Coding Learning JS"));

  assert.equal(
    swapCase("Senior Coding Learning JS"),
    "sENIOR cODING lEARNING js"
  );

  assert.equal(swapCase("Hanaro 4 Class"), "hANARO 4 cLASS");
  assert.equal(swapCase("HeLLo WoRLd"), "hEllO wOrlD");

  // 4-3)
  const telfmt = (str) => {
    const len = str.length;
    if (len < 7) return str;
    if (len <= 8) return str.replace(/(\d{3,4})(\d{4})$/g, `$1-$2`);

    const g3 = 4;
    const g1 = str.startsWith("02") ? 2 : len == 12 ? 4 : 3;
    const g2 = len - g1 - g3;

    const regexp = new RegExp(`(\\d{${g1}})(\\d{${g2}})(\\d{${g3}})$`, "g");
    return str.replace(regexp, `$1-$2-$3`);

    //return str.replace(/(\d{g1})(\d{g2})(\d{g3})$/g, `$1-$2-$3`); => 변수 넣기 불가능
  };

  //console.log(telfmt("123456789"));

  assert.deepStrictEqual(telfmt("0101234567"), "010-123-4567");
  assert.deepStrictEqual(telfmt("01012345678"), "010-1234-5678");
  assert.deepStrictEqual(telfmt("0212345678"), "02-1234-5678");
  assert.deepStrictEqual(telfmt("021234567"), "02-123-4567");
  assert.deepStrictEqual(telfmt("0331234567"), "033-123-4567");
  assert.deepStrictEqual(telfmt("15771577"), "1577-1577");
  assert.deepStrictEqual(telfmt("07012341234"), "070-1234-1234");
  assert.deepStrictEqual(telfmt("050712345678"), "0507-1234-5678");
}

const s = ["강원도 고성군", "고성군 토성면", "토성면 북면", "북면", "김1수"];
// var strs = "ㄱㅅㄱ";
// var c = strs[0].charCodeAt(0);

// // for (str of strs) {
// //   console.log(str);
// //   console.log(s[0].match());
// // }

// console.log("🚀 ~ c:", c);
// console.log(s[0].match(/[ㄱ가-깋][ㅅ사-싷][ㄱ가-깋]/g));
// //console.log("🚀 ~ t:", t);2
const initial = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
function findInitials(strs) {
  const initialArr = [];
  for (const str of strs) {
    const code = str.charCodeAt(0);
    if (code >= "가".charCodeAt(0) && code <= "힣".charCodeAt(0)) {
      const initialIdx = Math.floor((code - "가".charCodeAt(0)) / (21 * 28));
      initialArr.push(initial[initialIdx]);
    } else {
      initialArr.push(str);
    }
  }
  console.log("initial>>", initialArr.join(""));
  return initialArr;
}

const HANGUL_START_CHARCODE = 44032; // 가

const CHARCODE_DIFF_INIT_CONSONANTS = 588; // 까 - 가
const CHARCODE_DIFF_FINAL_CONSONANTS = 28; // 개 - 가

const hangulRangeForReg = (chosung, jungsung, jongsung) => {
  return String.fromCharCode(
    HANGUL_START_CHARCODE +
      chosung * CHARCODE_DIFF_INIT_CONSONANTS +
      jungsung * CHARCODE_DIFF_FINAL_CONSONANTS +
      jongsung
  );
};

function searchByKoreanInitialSound(s, pattern) {
  // const regexp = new RegExp(`${pattern}`, "g");
  // let result = s.filter((text) => regexp.test(findInitials(text).join("")));
  // return result;
  const regexp = initial.reduce(
    (acc, cur, idx) =>
      acc.replace(
        new RegExp(cur),
        `[${hangulRangeForReg(idx, 0, 0)}-${hangulRangeForReg(idx + 1, 0, -1)}]`
      ),
    pattern
  );
  return new RegExp(regexp);
}

//console.log(searchByKoreanInitialSound(s, "ㄱㅅㄱ"));
// console.log(searchByKoreanInitialSound(s, "ㅌㅅㅁ"));
// console.log(searchByKoreanInitialSound(s, "ㅂㅁ"));
// console.log(searchByKoreanInitialSound(s, "ㅍㅁ"));
// console.log(searchByKoreanInitialSound(s, "ㄱ1ㅅ"));

const pattern = "ㄱㅅㄱ";
const regexp = new RegExp(`${pattern}`, "g");

// console.log("ㄱㅇㄷ ㄱㅅㄱ".match(regexp));
// console.log("ㄱㅅㄱ ㅌㅅㅁ".match(regexp));
console.log(regexp.exec("ㄱㅇㄷ ㄱㅅㄱ"));
console.log(regexp.exec("ㄱㅅㄱ ㅌㅅㅁ"));

console.log("ㄱㅅㄱ ㅌㅅㅁ".match(regexp));
