"use strict";
const introduce = (name, height = 0) => {
    console.log(`이름 : ${name}`);
    console.log(`키 : ${height}`);
};
introduce("xxxx");
introduce("xxxx", 12);
console.log("------------------------------");
// 나머지 매개변수
const getSum = (...rest) => {
    let sum = 0;
    rest.forEach((el) => (sum += el));
    return console.log(sum);
};
getSum(1);
getSum(1, 2, 3);
getSum();
// 나머지 매개변수 - tuple
const getSum2 = (a, ...rest) => {
    let sum = a;
    rest.forEach((el) => (sum += el));
    return console.log(sum);
};
getSum2(3, 2, 1);
// getSum2(3,4,2,3,4)
console.log("------------------------------");
// 명시적 반환 타입
