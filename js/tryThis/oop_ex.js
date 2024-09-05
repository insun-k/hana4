import assert from "assert";

function ex_proxy() {
  class Emp {
    firstName;
    lastName;
    constructor() {
      return new Proxy(this, {
        set(_target, prop, value) {
          const tmp = value?.split(" ");
        },
      });
    }
  }

  const hong = new Emp();
  hong.fullName = "Kildong Hong"; // split하여 firstName, lastName 셋
  console.log(hong.fullName); // 'Kildong HONG' 출력하면 통과!
  assert.strictEqual(hong.fullName, "Kildong HONG");
  hong.fullName = "Lee";
  console.log(hong.firstName, hong.lastName); // 'Kildong LEE' 출력하면 통과!
  assert.strictEqual(hong.fullName, "Kildong LEE");
}

function ex_prototype() {
  // 2)
  Object.defineProperties(Array.prototype, {
    firstObject: {
      get() {
        return this[0];
      },
      set(value) {
        this[0] = value;
      },
    },
    lastObject: {
      get() {
        return this.at([-1]);
      },
      set(value) {
        this[this.length - 1] = value;
      },
    },
  });

  const arr = [1, 2, 3, 4, 5];
  assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
  arr.firstObject = 100;
  arr.lastObject = 500;
  assert.deepStrictEqual([arr.firstObject, arr.lastObject], [100, 500]);

  // 1)
  Array.prototype.mapBy = function (prop) {
    return this.map((a) => a[prop]);
  };

  Array.prototype.filterBy = function (prop, value, isIncludes = false) {
    if (isIncludes) {
      return this.filter((a) => a[prop]?.isIncludes(value));
    }
    return this.filter((a) => a[prop] === value);
  };

  Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
    const cb = isIncludes
      ? (a) => !a[prop]?.includes(value)
      : (a) => a[prop] !== value;

    return this.filter(cb);
  };

  Array.prototype.findBy = function (prop, value) {
    return this.find(prop);
  };

  Array.prototype.sortBy = function (prop, value) {
    const [key, direction = "asc"] = value?.split(":");
    const dir = direction.toLowerCase() === "desc" ? -1 : 1;
    return this.sort((a, b) => (a[prop] > b[prop] ? dir : -dir));
  };

  const hong = { id: 1, name: "Hong" };
  const kim = { id: 2, name: "Kim" };
  const lee = { id: 3, name: "Lee" };
  const users = [hong, lee, kim];

  // assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
  // assert.deepStrictEqual(users.mapBy("name"), ["Hong", "Lee", "Kim"]);
  // assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
  // //assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]);
  // //assert.deepStrictEqual(users.rejectBy("id", 2, true), [hong, lee]);
  // // assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
  // assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
  // // assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
  // // assert.deepStrictEqual(users.firstObject, hong);
  // // assert.deepStrictEqual(users.lastObject, kim);
  // // users.lastObject = lee;
  // // assert.deepStrictEqual(users.firstObject, lee);
  // // users.lastObject = hong;
  // // assert.deepStrictEqual(users.lastObject, hong);
}

function ex_stack_queue() {
  // Stack, Queue, ArrayList 에서 사용하는 공통 기능
  class Collection {
    #arr = []; //# => private -> side effect 막음
    constructor(...args) {
      this.#arr.push(...args);
    }

    get _arr() {
      return this.#arr;
    }

    push(...args) {
      // front-end
      this.#arr.push(...args);
      return this.#arr;
    }

    get peek() {
      return this.#isQueue() ? this.#arr[0] : this.#arr.at(-1);
    }

    get poll() {
      return this.#isQueue() ? this.#arr.shift() : this.#arr.pop();
    }

    remove() {
      return this.poll;
    }

    get length() {
      return this.#arr.length;
    }

    get isEmpty() {
      return !this.#arr.length;
    }

    clear() {
      this.#arr.length = 0;
    }

    toArray() {
      return this.#isQueue() ? this.#arr.toReversed() : this.#arr;
    }

    print() {
      console.log(`<${this.construcotr.name} : ${this.toArray()}>`);
    }

    #isQueue() {
      //console.log(">>", this.constructor.name); // 자식까지 정확히 구별 -> .name
      return this instanceof Queue;
    }
  }

  class Stack extends Collection {
    pop() {
      return this._arr.pop();
    }const stack = new Stack()
  }

  class Queue extends Collection {
    enqueue(...args) {
      this.push(...args);
      return this._arr;
    }

    dequeue() {
      return this._arr.shift();
    }
  }

  // stack 테스트
  ; // or new Stack([1,2]); // ⇐⇒ (1,2)
  assert.deepStrictEqual(stack.toArray(), []);
  stack.push(3); // 추가하기
  assert.deepStrictEqual(stack.toArray(), [3]);
  stack.pop(); // 마지막에 추가된 하나 꺼내기
  assert.deepStrictEqual(stack.toArray(), []);

  const stack2 = new Stack(...[1, 2]);
  assert.deepStrictEqual(stack2.toArray(), [1, 2]);
  stack2.push(2).push(3); // 추가하기
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 3]);
  stack2.pop(); // 마지막에 추가된 하나 꺼내기
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2]);
  stack2.push(4, 5);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4, 5]);

  assert.deepStrictEqual(stack2.peek, 5);
  assert.deepStrictEqual(stack2.poll, 5);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4]);

  assert.deepStrictEqual(stack2.remove(), 4);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2]);

  // side-effect 테스트
  stack2.arr = [1, 2, 3]; // => error   => arr에 # 붙이기
  assert.notDeepStrictEqual(stack2.toArray(), [1, 2, 3]);

  stack2.clear();
  assert.deepStrictEqual(stack2.toArray(), []);

  // -----------------------------------

  // queue 테스트
  const queue = new Queue();
  assert.deepStrictEqual(queue.toArray(), []);
  queue.enqueue(3); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [3]);
  queue.enqueue(2); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [2, 3]);
  queue.dequeue(); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
  assert.deepStrictEqual(queue.toArray(), [2]);
  queue.enqueue(5, 6); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [6, 5, 2]);

  assert.deepStrictEqual(queue.peek, 2);
  assert.deepStrictEqual(queue.poll, 2);
  assert.deepStrictEqual(queue.remove(), 5);
  assert.deepStrictEqual(queue.toArray(), [6]);

  //   console.log("stack.isQueue", stack.isQueue());
  //   console.log("queue.isQueue", queue.isQueue());
}

ex_stack_queue();
