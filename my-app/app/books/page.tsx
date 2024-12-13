'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Book } from '../api/books/bookdata';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchStr, setSearchStr] = useState('');

  const { data: session } = useSession();
  console.log('🚀 ~ Books ~ session:', session);
  // const { data } = useFetch<Book[]>(`${NEXT_PUBLIC_URL}/api/books`);

  useLayoutEffect(() => {
    (async function () {
      const books = (await fetch('http://localhost:3000/api/books').then(
        (res) => res.json()
      )) as Book[];
      setBooks(books);
    })();
  }, []);

  return (
    <>
      <h1 className='text-2xl'>{session?.user?.name} Books</h1>
      <Input
        onChange={(e) => setSearchStr(e.currentTarget.value)}
        placeholder='title or writer...'
      />

      <ul className='x'>
        {books
          .filter(
            ({ title, writer }) =>
              title.includes(searchStr) || writer.includes(searchStr)
          )
          .map(({ id, title }) => (
            <li key={id}>
              <Link href={`/books/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
