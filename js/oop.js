const obj = { id: 1, name: "Hong" };
// cf. obj = {..., __proto__: { x: 11 }};

console.log("obj.toString>>", obj.toString);
((Object.getPrototypeOf(obj) === Object.prototype) ===
  obj.constructor.prototype) ===
  obj.__proto__;

class Animal {
  // instance(this) + prototpye 생성! (무엇보다 먼저 실행!)
  constructor(name) {
    // {name: …}
    this.name = name || super.constructor.name;
  }
}
const dog = new Animal("Dog");
console.log("obj.keys=", Object.keys(obj));
console.log("ak=", Object.keys(dog));
for (let k in dog) console.log("k=", k);
console.log("oh=", obj.hasOwnProperty("id"));
console.log("dh=", dog.hasOwnProperty("id"));

class Cat extends Animal {
  static ID = 2;
  kukuki() {
    console.log("Kookkkk");
  }
}

const cat = new Cat();
console.log("static>>", Cat.IDD);
Animal.ID = 5;
console.log("static>>", Cat.ID);

console.log("-------------------------");

class Emp {
  firstName;
  lastName;
  //   get fullName() {} => 사용 x
  //   set fullName(x) {} => 사용 x
}

const proxyObj = new Proxy(hong, {
  get(target, prop, receiver) {
    console.log("proxy.get >>", target, prop);
    if (prop === "fullName") {
      return `${target.firstName} ${target.lastName0}`;
    } else {
      return target[prop]?.toUpperCase();
    }
  },
});
// const proxyObj = new Proxy(hong, {
//   get(target, prop, receiver) {
//     // receiver: this binding object
//     console.log("proxy.get>>", target, prop);
//     if (prop === "fullName") {
//       return `${target.firstName} ${target.lastName}`;
//     } else {
//       return target[prop]?.toUpperCase();
//     } // return Reflect.get(target, prop, receiver);
//   },

//   set(target, prop, value, receiver) {
//     console.log("proxy.set>>", target, prop, value);
//     if (prop === "fullName") {
//       const [f, l] = value.split(" ");
//       target.firstName = f;
//       target.lastName = l;
//     } else {
//       target[prop] = value;
//     } // target[prop]이 함수라면??
//     // return Reflect.set(target, prop, value, receiver);
//     return target;
//   },
// });

proxyObj.fullName = "Nanda Kim";
console.log("proxy>>", proxyObj.fullName);
console.log("proxy>>", proxyObj);
console.log("instance>>", proxyObj instanceof Emp);

const hong = new Emp();
hong.fullName = "Kildong Hong";
assert.strictEqual(hong.fullName, "Kildong HONG");
hong.fullName = "Lee";
assert.strictEqual(hong.fullName, "Kildong LEE");
