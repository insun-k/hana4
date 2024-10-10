import { getTodos } from '@/lib/todos';

export const revalidate = 5;

// 미리 만들어놓기 -> 동일한 콘텐츠를 가져오는 경우 중복 제거
export async function generateStaticParams() {
  return (await getTodos(1)).map(({ id }) => ({
    id: id.toString(),
  }));
  //   return [{ id: '1' }, { id: '2' }];
}

export default async function AboutTodo({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log('id>>', id);
  const todos = await getTodos(1);
  const todo = todos.find((td) => td.id === +id);
  if (!todo) {
    return <h1 className='text-2xl text-red-500'>#{id} not found!</h1>;
  }

  const { title, completed } = todo;

  return (
    <>
      <h1>About Todo #{id}</h1>
      <strong className={`${completed ? 'line-through' : 'font-extrabold'}`}>
        {title}
      </strong>
    </>
  );
}
