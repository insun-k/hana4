let xuser: { id: number; name: string };
xuser = { id: 1, name: "xx" }; // OK
//xuser = { id: 1 }; // Error (Property 'name' missing in type)
//xuser = { id: 1, name: "xx", age: 30 }; // Error ({id, name, age} is not assignable to type {id,name} )
const tmp = { id: 1, name: "xx", age: 30 };
xuser = tmp;

type Emp = { id: number; name: string };
//const arr: Emp[] = [{id:1, name:'Hong'},{id:2, name:'Kim',addr:'Seoul'}];
const lee: Emp = { id: 1, name: "Lee" };
const kim = { id: 2, name: "Kim", addr: "Seoul" }; // 변수할당 -> freshness 꺼짐
const arr1: Emp[] = [{ id: 1, name: "Hong" }, kim];
const arr2: Emp[] = [{ id: 2, name: "Kim", addr: "Seoul" }, kim];
//const arr3: Emp[] = [{ id: 2, name: "Kim", addr: "Seoul" }, lee]; // lee에 addr 없음
// 튜플 : [x,y] = [1,2] => x=1, y=2로 연결
//const arr4: [Emp, Emp] = [{ id: 2, name: "Kim", addr: "Seoul" }, kim];

type Emp2 = { id: number; name: string; addr: string };
type Emp3 = { id: number; name: string; road: string };
const xemp: Emp | Emp2 | Emp3 = {
  id: 2,
  name: "Kim",
  addr: "Seoul",
  road: "sss",
};

let xxuser: { id: number; name: string };
type TT = { id: number; name: string };

let hhh: TT;
hhh = { id: 1, name: "hong", age: 3 } as TT;

const kkim = { id: 1, name: "kim", age: 4 };
const hh: TT[] = [{ id: 1, name: "kim", age: 5 }, kkim];
