import { FormEvent, useState } from 'react';

export default function Login({ login }: { login: () => void }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('$$$');
    login();
  };
  return (
    <form onSubmit={signIn}>
      ID:{' '}
      <input
        id='id'
        type='number'
        placeholder='Name...'
        onChange={(e) => setId(+e.currentTarget.value)}
      />
      Name:{' '}
      <input
        id='name'
        type='text'
        autoComplete='off'
        placeholder='Password...'
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button>Sign In</button>
    </form>
  );
}
