const myName: string = "insun";
console.log(`Hello, ${myName}`);
const myAge: number = 25;
console.log(`${myAge} years old!`);

let x: number | string;
x = 1;
x = "abc";

const len = x.length;

// let y : number;
// console.log("🚀 ~ y:", y)  => 에러
let y: number | undefined;
console.log("🚀 ~ y:", y);

//-----------------------------
// type alias
type User = {
  // user -> type
  id: number;
  name: string;
  age: number;
  address: string;
};

let hong: User;

const something = ({ id, name, age, address }: User) => {
  // Do something...
  hong = {
    id,
    name,
    age,
    address,
  };
  console.log("🚀 ~ hong:", hong);
};

//-----------------------------
// 리터럴 타입
const sltr = "LITERAL";
let literal: "LITERAL";
let nltr = 100;
//literal = 'xxxxxxx';  => 불가능, 리터럴만 가능
literal = sltr;
let str: string;
str = "xxx"; // => 가능
str = sltr; // sltr은 스트링리터럴 타입이여서 가능
// str = nltr    => 불가능, nltr은 넘버리터럴 타입

//-----------------------------
// 유니언 타입
type Member = {
  id: string;
  name: string;
  addr: string;
  discountRate?: number;
};
type Guest = {
  id: number;
  name: string;
  age: number;
};

type Customer = Member | Guest;
//type MG = Member & Guest;     // 합치기

let customer: Customer;
let mem: Member;
let g: Guest;

const xx: Guest | Member = {
  id: 234,
  name: "홍길동",
  age: 26,
  addr: "용산구",
};

//g = xx; // xx => guest
//mem = xx;   // Member 객채에서 discountRate? 하면 통과

// 내로잉
if ("age" in xx) g = xx;
// if ("addr" in xx) mem = xx;  => addr만으로는 member x(discountRate 없어서)
else if ("addr" in xx && "discountRate" in xx) mem = xx; // else if -> age가 없음

let xxx = {
  id: 234,
  phone: "30333",
  name: "홍길동",
  age: 26,
  addr: "용산구",
  discountRate: 1, //=> 있고, id가 string이면 if ('addr' in xxx) mem = xxx; 가능
};

if ("age" in xxx) g = xxx;
else if ("addr" in xxx && "discountRate" in xxx) mem = xxx; // else이면 age가 xxx가 아니면 guest는 우선 아님 -> number 확신 x , member 확신 x
// else 빼면 -> 위에 if와 별개, member가 되려면 id가 스트링 /// g = xxx는 가능 (id가 number여서)

// strictNullChecks
let a: string;
//a = undefined;    // => tsconfig.json에서 strict:true이면 에러(끄면 통과)
