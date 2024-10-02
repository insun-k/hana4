import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
// import { type LoginHandler } from './components/Login';
import { SessionProvider } from './hooks/session-context';
import { useDebounce } from './hooks/timer-hooks';
import useToggle from './hooks/toggle';

// const ColorTitle = ({ color }: { color: string }) => {
//   console.log('@@@ ColorTitle!!', color);
//   return <h2 style={{ color }}>MEMO</h2>;
// };

function App() {
  const myHandleRef = useRef<MyHandler>(null);
  const [, toggleSearch] = useToggle();
  const [friend, setFriend] = useState(10);

  // const [color, changeColor] = useReducer(() => 'blue', 'red');

  const friendRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      console.log('useDebounce>>>', friendRef.current?.value);
      setFriend(+(friendRef.current?.value || 0)); // +undefined => NaN
    },
    1000,
    [friendRef.current?.value]
  );

  return (
    <div className='mt-5 flex flex-col items-center'>
      {/* <h1>rbvite</h1> */}
      <hr />
      {/* <pre className='mt-5'>{JSON.stringify(session.loginUser)}</pre> */}
      {/* <div className='m-3'>F: {friend}</div>
      <div className='mb-4 flex flex-row gap-5'>
        <button className='btn' onClick={reset}>
          Reset
        </button>
        <button className='btn' onClick={clear}>
          Clear
        </button>
      </div> */}

      {/* <ColorTitle color={color} /> */}
      <SessionProvider>
        <div className='mb-3 w-64'>
          <input
            type='number'
            defaultValue={friend}
            //onChange={(e) => setFriend(+e.currentTarget.value)}
            onChange={toggleSearch}
            ref={friendRef}
            placeholder='friend id...'
            className='inp'
          ></input>
        </div>
        <Hello
          name='React!'
          friend={friend}
          // plusCount={plusCount}
          // minusCount={minusCount}
          ref={myHandleRef}
        />

        <My />
      </SessionProvider>

      {/* <My
      // session={session}
      // logout={logout}
      // login={login}
      // removeCartItem={removeCartItem}
      // addCartItem={addCartItem}
      // ref={loginRef}
      /> */}
      {/* <div className='card'>
        <button
          className='btn mt-4'
          onClick={() => {
            setCount((count) => count + 1);
            if (session.loginUser) session.loginUser.name = 'xxx' + count;
            console.table(session.loginUser);
            myHandleRef.current?.jumpHelloState();
          }}
        >
          App.count is {count}
        </button>
      </div> */}
    </div>
  );
}

export default App;
