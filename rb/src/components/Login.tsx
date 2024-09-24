//import { ChangeEvent, FormEvent, useRef, useState } from 'react';
// import { FormEvent, useRef, useState } from 'react';
import { FormEvent, useRef } from 'react';
import Button from './atoms/Button';
import LabelInput from './molecules/LabelInput';

export default function Login({
  login,
}: {
  login: (id: number, name: string) => void;
}) {
  // const [id, setId] = useState(0);
  //const [name, setName] = useState('');
  // useState 대신 useRef 사용
  const nameRef = useRef<HTMLInputElement>(null); // <> 타입 안쓰면 아래 nameRef.current?.value에서 에러
  const idRef = useRef<HTMLInputElement>(null);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const id = nameRef.current?.value;
    if (!id || !name) {
      alert('Input the id & name!!');
      return;
    }
    login(+id, name);
  };

  // const changeName = (e: ChangeEvent<HTMLInputElement>) => {
  //   setName(e.currentTarget.value);
  // };

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
      <Button
        text='Sing In'
        variant='btn-success'
        classNames='float-end mt-3 '
      />
    </form>
  );
}
