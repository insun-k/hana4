function thinkTogether() {
  globalThis.name = "Global Name";

  const obj = {
    name: "Obj Name",
    printName() {
      console.log(this.name);
    },
  };

  const printName = obj.printName;
  // obj.printName(); // printName.bind(obj)();
  printName();
}

function ex1() {
  const dog = {
    name: "Maxx",
    showMyName() {
      console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
      //setTimeout(this.showMyName, 1000);

      // 방법 1 (옛날 방식)
      // var self = this;
      // setTimeout(function(){
      //     self.showMyName();
      // }, 1000);

      // 방법 2
      //setTimeout(() => this.showMyName(), 1000);

      // 방법 3
      setTimeout(this.showMyName.bind(this), 1000);
    },
  };

  dog.whatsYourName();
}

// this 예제
globalThis.id = "Golobal_ID";
this.id = "Module_ID";

const obj = {
  id: 123,
  f: function () {
    console.log("obj > f =", this.id);
  },
  af: () => console.log("obj > af =", this.id),
  subObj: {
    id: 999,
    f: function () {
      console.log("obj > subObj > f =", this.id);
    },
    af: () => console.log("obj > subObj > af =", globalThisn.id),
  },
};

// obj.f();
// obj.af();
// console.log("------------");
// obj.subObj.f();
// obj.subObj.af();

// for (let i = 0; i < 5; i += 1) {
//   // ⇒ ⇒ ⇒
//   setTimeout(() => console.log(i), 100); // (나)
//   // ⇐⇒ setTimeout(() => console.log(i), 100);
// }

function ex2() {
  function once(fn) {
    let done = false;
    return function (...args) {
      if (done) return;
      done = true;
      return fn.apply(this, args);
    };
  }

  const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y} 입니다!`);

  console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
  console.log(fn(2, 7)); // undefined
  console.log(fn(3, 8)); // undefined
}

function ex3() {
  const before = () => console.log("before...");
  const after = () => console.log("after...");

  const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
  const someFn2 = (id, nickname, email, level) =>
    console.log(`${id}/${nickname}/${email}/${level}`);

  const template =
    (f) =>
    (...args) => {
      before();
      const ret = f(...args);
      after();
      return ret;
    };

  const temp = template(someFn); // before → someFn → after 실행
  const temp2 = template(someFn2); // before → someFn2 → after 실행

  temp("sico", "hello");
  temp2(1, "sico", "sico@gmail.com", 5);
  //console.log("square of 7 =", template((n) => n ** 2)(7));
}

function ex4() {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const getNextWeek = (() => {
    let widx = -1;
    return () => {
      // widx는 이 안에서만 사용 가능
      widx += 1; // side-effect!
      if (widx >= weeks.length) widx = 0;
      return `${weeks[widx]}요일`;
    };
  })();

  let cnt = 0;
  const intl = setInterval(() => {
    // widx += 2; // side-effect!
    console.log("call", cnt, getNextWeek());
    if ((cnt += 1) === 8) clearInterval(intl);
  }, 1000);
}

function getDiffMillis(dt1, dt2) {
  const d1 = new Date(dt1);
  const d2 = new Date(dt2);
  const { getTime: getTime1 } = d1;
  const { getTime: getTime2 } = d2;
  return Math.abs(getTime1.apply(d1) - getTime2.apply(d2));
}

// Date.prototype.getTime = function () {
//   return this.getMilliseconds();
// };

console.log(getDiffMillis("2021-01-01", "2021-01-02"));

class Dog {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name; // => this : 클래스의 인스턴스 메소드는 this를 undefined로?
  }

  fn() {
    return "FN";
  }

  static sfn() {
    return "SFN";
  }
}
const lucy = new Dog("Lucy");
console.log("🚀 ~ lucy:", lucy);
const { sfn } = Dog;
console.log("🚀 ~ sfn:", sfn);
const { name: aa, fn: fnnn, getName } = lucy;

console.log(aa, sfn(), fnnn(), getName); // ?
// getName(); // this 때문에 오류
console.log(getName.call(lucy));
