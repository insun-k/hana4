"use strict";
let xuser;
xuser = { id: 1, name: "xx" }; // OK
//xuser = { id: 1 }; // Error (Property 'name' missing in type)
//xuser = { id: 1, name: "xx", age: 30 }; // Error ({id, name, age} is not assignable to type {id,name} )
const tmp = { id: 1, name: "xx", age: 30 };
xuser = tmp;
//const arr: Emp[] = [{id:1, name:'Hong'},{id:2, name:'Kim',addr:'Seoul'}];
const lee = { id: 1, name: "Lee" };
const kim = { id: 2, name: "Kim", addr: "Seoul" }; // 변수할당 -> freshness 꺼짐
const arr1 = [{ id: 1, name: "Hong" }, kim];
const arr2 = [{ id: 2, name: "Kim", addr: "Seoul" }, kim];
const xemp = {
    id: 2,
    name: "Kim",
    addr: "Seoul",
    road: "sss",
};
let xxuser;
let hhh;
hhh = { id: 1, name: "hong", age: 3 };
const kkim = { id: 1, name: "kim", age: 4 };
const hh = [{ id: 1, name: "kim", age: 5 }, kkim];
