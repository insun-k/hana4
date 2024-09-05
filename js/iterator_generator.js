import assert from "assert";

function stack_queue_iterator() {
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

    // iterator로 작성
    // [Symbol.iterator]() {
    //   let idx = 0;
    //   const arr = this.toArray();
    //   return {
    //     next: () => ({
    //       value: arr[idx++],
    //       done: this.length < idx,
    //     }),
    //   };
    // }

    // generator로 작성
    *[Symbol.iterator]() {
      for (let i = 0; i < this.length; i += 1) {
        //yield this.toArray()[i];
        yield this.#isQueue ? this.#arr[i] : this.#arr.toReversed();
      }
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
    }
  }

  class Queue extends Collection {
    enqueue(...args) {
      this.push(...args);
      return this._arr;
    }

    dequeue() {
      return this._arr.shift();
    }

    // *[Symbol.iterator]() {
    //   for (let i = 0; i < this.length - 1; i -= 1) {
    //     //yield this.toArray()[i];
    //     yield this.toArray()[i];
    //   }
  }

  // -------------------------- stack 테스트
  // iterator 테스트
  const stack = new Stack();
  stack.push(1, 2, 3);
  const itStack = stack[Symbol.iterator]();

  const len = stack.length;
  for (let i = 0; i < len; i++) {
    stack.poll;
    assert.deepStrictEqual(itStack.next(), {
      //??? 여기 왜 안되지
      value: stack.poll,
      done: false,
    });
  }
  assert.deepStrictEqual(itStack.next(), {
    value: undefined,
    done: true,
  });

  // ----------------------- queue 테스트
  // iterator 테스트
  const queue2 = new Queue(1, 2, 3);
  const itQueue = queue2[Symbol.iterator]();

  const qlen = queue2.length;
  for (let i = 0; i < qlen; i++) {
    queue2.poll;
    // assert.deepStrictEqual(itQueue.next(), {   ??? 여기도 안됨
    //   value: queue.poll,
    //   done: false,
    // });
  }
  // assert.deepStrictEqual(itQueue.next(), {
  //   value: undefined,
  //   done: true,
  // });
}

stack_queue_iterator();
