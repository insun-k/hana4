'use client';

import { useFetch } from '@/hooks/fetch-hook';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Book } from '../api/books/bookdata';

export default function BooksLayout({ children }: { children: ReactNode }) {
  //   const [books, setBooks] = useState<Book[]>([]);

  const {
    data: books,
    isLoading,
    error,
  } = useFetch<Book[]>(`${process.env.NEXT_PUBLIC_URL}/api/books?q=11`);

  if (error) {
    return <div className='text-red-500'>{error.message}</div>;
  }

  //   useLayoutEffect(() => {
  //     (async function () {
  //       const data = (await fetch('http://localhost:3000/api/books').then((res) =>
  //         res.json()
  //       )) as Book[];
  //       setBooks(data);
  //     })();
  //   }, []);

  return (
    <>
      <h1 className='text-2xl'>My Book Case</h1>
      <div className='grid grid-cols-2 gap-3 w-full'>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <ul className='border p-3'>
            {books?.map(({ id, title }) => (
              <li key={id}>
                <Link href={`/books/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
        <div className='border w-full p-3'>{children}</div>
      </div>
    </>
  );
}
