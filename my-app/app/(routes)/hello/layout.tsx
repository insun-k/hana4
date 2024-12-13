import { PropsWithChildren } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <div className='border p-5'>
      <h1 className='text-2xl'>Hello Layout</h1>
      <div className='flex flex-row gap-3'>
        <a href='/hello/morning'>Morning</a>
        <a href='/hello/evening'>Evening</a>
        <a href='/hello/afternoon'>Afternoon</a>
      </div>

      <div className='bg-purple-200 text-center'>{children}</div>
    </div>
  );
}
