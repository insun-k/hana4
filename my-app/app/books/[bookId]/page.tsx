import { getBook } from '@/actions/books';
import { notFound } from 'next/navigation';
import DelBook from '@/components/DelBook';
import { Button } from '@/components/ui/button';

export default async function Book({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  // const book = (await fetch(`http://localhost:3000/books/${bookId}`).then(
  //     (res) => res.json()
  // )) as Book; // Bad?

  // Good!
  const book = getBook(+bookId);
  if (!book) return notFound();

  // 서버컴포넌트여서 불가능 -> DelBook.tsx 생성(클라이언트)
  //   const remove = () => {
  //     if (confirm('Are u sure?')) {
  //       console.log('****');
  //     }
  //   };

  return (
    <div className='mx-3 space-y-3'>
      <div className='flex justify-between underline border-b border-slate-300'>
        bookId: <strong>{bookId}</strong>
      </div>
      <div className='flex justify-between underline border-b border-slate-300'>
        title: <strong>{book.title}</strong>
      </div>
      <div className='flex justify-between underline border-b border-slate-300'>
        writer: <strong>{book.writer}</strong>
      </div>
      <div className='text-right space-x-4'>
        {/* <Button onClick={remove} variant={'destructive'}>
          Del
        </Button> */}
        <DelBook id={+bookId} />

        <Button variant={'outline'}>Edit</Button>
      </div>
    </div>
  );
}
