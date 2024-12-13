import Link from 'next/link';
import { getTodo } from '@/lib/todos';

export const revalidate = 5;

export default async function Todo({
  params: { todoId },
}: {
  params: { todoId: string };
}) {
  const { title, completed } = await getTodo(+todoId);
  if (!title) {
    return <h1 className='text-2xl text-red-500'>#{todoId} not found!</h1>;
    // return new Error('not Found');
  }

  console.log('todos/todoId>>', todoId);
  return (
    <>
      <div>id: {todoId}</div>
      <div>title: {title}</div>
      <div>completed: {completed ? 'Done' : 'Doing...'}</div>
      <Link href='/todos'>Go List</Link>
    </>
  );
}
