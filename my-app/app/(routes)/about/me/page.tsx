'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Me() {
  console.log('Me!!!!'); // console에 찍힘 -> 클라이언트 사용
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goBack = () => {
    router.back();
  };

  const goHello = () => router.push('/hello');

  const changeSearchParams = (x: string) => {
    // 자바로(new) 한번 더 처리 => useSearchParams로 하면 set 사용 x(searchParams.set 불가능)
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    urlSearchParams.set('xxx', x);
    console.log('urlSearchParams:', urlSearchParams.toString());
    // set만 하면 주소창 안바뀜 -> router.push로 처리
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <>
      <div className='flex justify-between text-sm'>
        <button onClick={goBack}>Back</button>
        <button onClick={goHello}>Hello</button>
        <button onClick={() => changeSearchParams('999')}>change-xxx</button>
      </div>
      Me Page: {pathname}?xxx={searchParams.get('xxx')}
    </>
  );
}
