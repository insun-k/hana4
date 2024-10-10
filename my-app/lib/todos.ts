export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const BaseURL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async (userId: number = 1) => {
  const data = await fetch(`${BaseURL}/todos?userId=${userId}`, {
    cache: 'force-cache', // SSG
    // next: { revalidate: 10 },
  }).then((res) => res.json());

  // 방법1
  // const data = await res.json();
  // return data;

  // 방법2
  //return res.json(); // await 붙이면 안됨

  //방법3
  return data as Todo[];
};

export const getTodo = async (todoId: number = 1) => {
  const data = await fetch(`${BaseURL}/todos/${todoId}`, {
    next: { revalidate: 10 }, //ISR
  }).then((res) => res.json());
  return data as Todo;
};
