// function f() {
//   console.log("f>>", this.name);
//   // => this 는 global object
// }

// f();
// f.bind({ name: "Binding" })();
// f.call({ name: "Binding" }); // call 은 실행까지

// const boundF = f.bind({ name: "BoundF" });
// console.log(boundF == f); // bind 하는 순간 f.o 는 다름
// boundF();

// return;

// const f2 = f;
// console.log(f2 == f);

// const f3 = f;

// const obj = {
//   id: 1,
//   f1: function () {
//     // 일반 함수
//     console.log("f1>>", this.id);
//   },
//   f2: () => console.log("f2>>", this.id), // 화살표 함수 => ?????
// };

// obj.f1(); // f1.bind(obj)();
// obj.f2(); // f2();  => 화살표 함수에서는 this 사용 x

// const of1 = obj.f1;
// const of2 = obj.f2;
// console.log(of1 == obj.f1);
// console.log(of2 == obj.f2);

// of1();
// of2();

globalThis.name = "GlobalName";
this.name = "ModuleName";

const obj = {
  name: "ObjName",
  bark1: function () {
    console.log("1=", this.name);
    const self = this; // OLD version  // this = obj
    setTimeout(
      function () {
        console.log("11=", self.name);
        console.log("12=", this); // setTimeout에서 this = Timeout
      }.bind(this), // => this = obj
      1000
    ); // .bind(this)
    console.log("xxxx");
  },
  bark2() {
    // same as bark2: function() {
    console.log("2=", this.name);
    setTimeout(() => {
      // 화살표 함수는 this를 가질 수없어서 이 함수가 위치해 있는 공간(bark2)의 this를 향함.
      console.log("22=", this.name);
    }, 1000);
  },
  bark3() {
    // ⇐⇒ bark3: function() {
    function innerFn() {
      console.log("33=", this.name); // ?
    }
    innerFn();
  },
  bark4: () => {
    console.log(this.name); // 화살표 함수=> bark4가 담고 있는 obj의 this
  }, // bark4의 소유자(obj)의 Lexical Scope의 this
};

//sobj.bark1(); // bark1.bind(obj)()
// obj.bark2();
//obj.bark3();
// obj.bark4();

// const fff = obj.bark1;
// fff();



// ⇔ function declareFn(name) {
const expressFn = function(name) {
  // if, 'use strict' ?
  console.log('11>>',this, new.target, this.name, name);
  this.name = name;
  console.log('22>>',this, new.target, this.name, name);
}


const arrowFn = (name) => {
  console.log('11>>',this, new.target, this.name, name);
  this.name = name;
  console.log('22>>', this, new.target, this.name, name);
}

const hong = {id: 1, name: 'Hong'};
const kim = {id: 2, name: 'Kim'};

//expressFn.bind(hong)('expfn');
//arrowFn.apply(kim, ['afn']);
//arrowFn.call(kim, 'afn');
//const dfn = new expressFn('D');  // new로 불러서 new.target => 자기자신
// const afn = new arrowFn('A'); // error!   => 화살표 함수여서 new로 호출 불가


const Dog = function(name) {
  console.log(this, new.target, 
              this instanceof Dog);
  this.name = name;
  this.bark = function () {
    console.log('bark=', new.target, this.name, name);
  };
  this.bark2 = () =>
    console.log('bark2=', new.target, this.name, name);
}

//const dog = Dog('Doggy');
// const lucy = new Dog('Lucy');
// Dog.bark(); // ?
// lucy.bark(); // ?
// lucy.bark2(); // ?
// console.log('type of Dog=', typeof dog); // ?
// console.log('type of lucy=', typeof lucy); // ?


const Cat = (name) => {
  console.log('Cat>>', this, new.target);
  this.name = name;
  this.bark = function () {
    console.log('bark=', new.target, this.name, name);
  };
  this.bark2 = () =>
    console.log('bark2=', new.target, this.name, name);

  return this;
}

// const cat = Cat('Coco');
// // const cat = new Cat(''); // error!!
// cat.bark(); // ?
// cat.bark2(); // ?
// Cat.bark(); // ?
// console.log('type=', typeof cat); // ? 

const obj2 = {
  name: 'ObjName',
  bark(){
    console.log('bark=', this.name);
  },
  bark2: () =>
    console.log('bark2=', this.name),
};
obj2.bark();
obj2.bark2(); 