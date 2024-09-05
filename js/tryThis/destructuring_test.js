console.log("-----1번-----");
function f1(user) {
  console.log(user.id, user.name);
}

function f2({ id, name }) {
  console.log(id, name);
}

const f3 = ({ id, name }) => {
  console.log(id, name);
};
const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };

f1(hong);
f2(lee);
f3(hong);

console.log("-----2번-----");
const user = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };
const { id, name, addr } = user;
console.log(id, name, addr);

console.log("-----3번-----");
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
console.log(id1, id2, id3);

console.log("-----4번-----");
const user3 = { name: "Hong", passwd: "xyz", addr: "Seoul" };
function getValueExceptInitial(k) {
  const { [k]: val } = user3;
  const [, ...ret] = [...val];
  return ret.join("");
}
console.log(getValueExceptInitial("name"));
console.log(getValueExceptInitial("passwd"));
console.log(getValueExceptInitial("addr"));
