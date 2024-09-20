import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

const SampleSession = {
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type LoginUser = typeof SampleSession.loginUser;
type cartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: cartItem[] };

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(SampleSession);

  const plusCount = () => setCount((count) => count + 1);
  const minusCount = () => setCount(count - 1);

  const logout = () => setSession({ ...session, loginUser: null });

  const login = (id: number, name: string) =>
    setSession({ ...session, loginUser: { id, name } });

  return (
    <>
      {/* <h1>rbvite</h1> */}
      <Hello
        name='React!'
        age={33}
        plusCount={plusCount}
        minusCount={minusCount}
      />
      <hr />
      <pre>{JSON.stringify(session.loginUser)}</pre>
      <My session={session} logout={logout} login={login} />
      <div className='card'>
        <button
          onClick={() => {
            setCount((count) => count + 1);
            if (session.loginUser) session.loginUser.name = 'xxx' + count;
          }}
        >
          App.count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
