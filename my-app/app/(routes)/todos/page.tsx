import Link from 'next/link';
import { getTodos } from '@/lib/todos';

export default async function Todos() {
  const todos = await getTodos();

  return (
    <>
      <h1 className='text-2xl'>#Todos</h1>
      <ul className='border p-3'>
        {todos.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/todos/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
