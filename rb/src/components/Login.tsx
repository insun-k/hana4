import { FormEvent, useState } from 'react';
import Button from './atoms/Button';

export default function Login({
  login,
}: {
  login: (id: number, name: string) => void;
}) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !name) {
      alert('Input the id & name!!');
      return;
    }
    login(id, name);
  };
  return (
    <form onSubmit={signIn} className='text-center'>
      ID:{' '}
      <input
        id='id'
        type='number'
        placeholder='Name...'
        onChange={(e) => setId(+e.currentTarget.value)}
        className='inp'
      />
      Name:{' '}
      <input
        id='name'
        type='text'
        autoComplete='off'
        placeholder='Password...'
        onChange={(e) => setName(e.currentTarget.value)}
        className='inp'
      />
      <Button
        text='Sing In'
        variant='btn-success'
        classNames='float-end mt-3'
      />
    </form>
  );
}
