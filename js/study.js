import assert from "assert";

const hrTeam = { id: 1, dname: "인사팀" }; // 홍길동 (인사팀)
const devTeam = { id: 2, dname: "개발팀" };
const depts = [hrTeam, devTeam];
const hong = { id: 1, name: "Hong", dept: 1 }; // hong.dept.name ⇒ deptMap.get(hong.dept)?.name
const kim = { id: 2, name: "Kim", dept: 2 };
const emps = [
  hong,
  kim,
  { id: 3, name: "Park", dept: 2 },
  { id: 4, name: "Choi", dept: 2 },
];

const deptMap = new Map(depts.map((dept) => [dept.id, dept]));
const empMap = new Map(emps.map((emp) => [emp.id, emp]));

console.log(deptMap);
console.log(empMap);

const empDept = new Map(
  [...empMap.values()].map((emp) => {
    const { dept } = emp;
    delete emp.dept;
    return [emp, deptMap.get(dept)];
  })
);

console.log(empDept);

assert.deepStrictEqual(
  [...empDept.keys()],
  emps.map(({ id, name }) => ({ id, name }))
);

// console.log(empDept.get(kim)); // '개발팀'
assert.strictEqual(empDept.get(hong)?.dname, hrTeam.dname);
assert.strictEqual(empDept.get(kim)?.dname, devTeam.dname);

const r = [...empDept]
  .filter(([emp, dept]) => dept.id === devTeam.id)
  .map(([emp]) => emp.name);
console.log("🚀 ~ r:", r);

assert.deepStrictEqual(r, ["Kim", "Park", "Choi"]);

function getEmp(empId) {
  // {id:1, name: 'Hong', dept: {id:1, dname: 'Sale'}}
  const emp = empMap.get(empId);
  return { ...emp, dept: deptMap.get(empId) };
}

console.log(getEmp(1));
assert.deepStrictEqual(getEmp(1), {
  id: 1,
  name: "Hong",
  dept: { id: 1, dname: "인사팀" },
});
