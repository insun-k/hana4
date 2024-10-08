import Link from 'next/link';
import { ReactNode } from 'react';

export default function ParallelLayout({
  children,
  login,
  profile,
}: {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
}) {
  const didLogin = false;
  return (
    <>
      <h1 className='text-2xl'>Parallel Layout</h1>
      {/* paralell/@login/aaa 이 아니라 @login 입력 x */}
      <Link href='/paralell/aaa'>Login/AAA</Link>
      <Link href='/paralell/bbb'>Profile/BBB</Link>
      {didLogin ? (
        <div className='flex justify-between border gap-3 p-5'>
          <div className='bg-purple-200'>{login}</div>
          <div className='bg-yellow-100'>{profile}</div>
        </div>
      ) : (
        <div className='bg-purple-200'>{login}</div>
      )}
      <hr />
      {children}
    </>
  );
}
