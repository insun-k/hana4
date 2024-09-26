//import { ChangeEvent, FormEvent, useRef, useState } from 'react';
// import { FormEvent, useRef, useState } from 'react';
import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import Button from './atoms/Button';
import LabelInput from './molecules/LabelInput';
import { useSession } from '../hooks/session-context';
import { PiSignInBold } from 'react-icons/pi';
import { useCounter } from '../hooks/counter-hook';
// import { useInterval, useTimeout } from '../hooks/timer-hooks';

export type LoginHandler = {
  focus: (prop: string) => void;
};

export default forwardRef(function Login(
  _: unknown,
  ref: ForwardedRef<LoginHandler>
) {
  const { login } = useSession();
  const { count, plusCount, minusCount } = useCounter();

  // const [id, setId] = useState(0);
  //const [name, setName] = useState('');
  // useState 대신 useRef 사용
  const nameRef = useRef<HTMLInputElement>(null); // <> 타입 안쓰면 아래 nameRef.current?.value에서 에러
  const idRef = useRef<HTMLInputElement>(null);

  const handler: LoginHandler = {
    focus(prop) {
      if (prop === 'id') idRef.current?.focus();
      if (prop === 'name') nameRef.current?.focus();
    },
  };
  useImperativeHandle(ref, () => handler);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = idRef.current?.value ?? 0;

    const name = nameRef.current?.value ?? '';
    // if (!id || !name) {    // App에서 처리
    //   alert('Input the id & name!!');
    //   return;
    // }
    login(+id, name);
  };

  // const changeName = (e: ChangeEvent<HTMLInputElement>) => {
  //   setName(e.currentTarget.value);
  // };

  // !! --- useEffect TryThis ---!!
  // before
  // useEffect(() => {
  //   const tmout = setTimeout(() => console.log('X'), 100);

  //   return () => clearTimeout(tmout);
  // }, []);

  //after
  // const f = (y: number) => {
  //   console.log('useTimeout!!', y);
  // };
  // useTimeout(f, 500, 555);

  // useTimeout((x: number, y: number) => console.log('xxxx', x, y), 1000, 1, 2);
  // useInterval(() => console.log('useInterval!!'), 2000);

  // !! useEffect 예시 !!
  useEffect(() => {
    // console.log('useeffffffff11', count);
    plusCount();

    return () => {
      // console.log('xxx');
      minusCount();
    };
  }, [count, plusCount, minusCount]);

  return (
    <form onSubmit={signIn} className='m-5 border p-3 text-center'>
      <LabelInput
        label='ID'
        type='number'
        // onChange={(e) => setId(+e.currentTarget.value)}
        ref={idRef}
      />
      {/* ID:{' '}
      <input
        id='id'
        type='number'
        placeholder='ID...'
        onChange={(e) => setId(+e.currentTarget.value)}
        className='inp'
      /> */}
      Name:{' '}
      <input
        id='name'
        type='text'
        ref={nameRef}
        placeholder='Name...'
        //onChange={changeName}
        className='inp'
      />
      <Button type='submit' variant='btn-success' classNames='float-end mt-3 '>
        <PiSignInBold />
      </Button>
    </form>
  );
});
