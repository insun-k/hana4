interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

// * 교집합, 합집합
// type TTT<T, U> = keyof T & keyof U   // 교집합
type TTT<T, U> = keyof (T & U); // 합집합
type TTTX = TTT<IUser, IDept>;

// type Combine<T, U> = {
//     [k in keyof (T & U)]: k extends (keyof T & keyof U)
// }
// type ICombined = Combine<IUser, IDept>;

// let x: ICombined = {
//     id: 0,
//     age: '33세',
//     name: 'aaa'
//     dname: 'bbb'
//     captain: 'ccc'
// }
