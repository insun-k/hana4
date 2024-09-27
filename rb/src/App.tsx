import { useRef, useState } from 'react';
// import './App.css';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
// import { type LoginHandler } from './components/Login';
import { SessionProvider } from './hooks/session-context';

// const SampleSession = {
//   loginUser: { id: 1, name: 'Hong' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };

// type LoginUser = typeof SampleSession.loginUser;
// type cartItem = { id: number; name: string; price: number };
// export type Session = { loginUser: LoginUser | null; cart: cartItem[] };

function App() {
  // const [count, setCount] = useState(0);
  // *const [session, setSession] = useState<Session>(SampleSession);

  const myHandleRef = useRef<MyHandler>(null);
  const [friend, setFriend] = useState(10);

  // const plusCount = () => setCount((count) => count + 1);
  // // const plusCount = () => {setCount((pre) => pre + 1); setCount((count) => count + 1)} => 2씩 증가..?

  // const minusCount = () => setCount(count - 1);

  //*** session-context로 이동 */
  // const logout = () => setSession({ ...session, loginUser: null });

  // const loginRef = useRef<LoginHandler>(null);
  // const login = (id: number, name: string) => {
  //   if (!id) {
  //     alert('Id를 입력하세요');
  //     return loginRef.current?.focus('id');
  //   }
  //   if (!name) {
  //     alert('name을 입력하세요');
  //     return loginRef.current?.focus('name');
  //   }
  //   setSession({ ...session, loginUser: { id, name } });
  // };

  // const addCartItem = (name: string, price: number) => {
  //   const id = Math.max(...session.cart.map(({ id }) => id), 0) + 1;
  //   setSession({
  //     ...session,
  //     cart: [...session.cart, { id: id, name, price }],
  //   });
  // };

  // const removeCartItem = (id: number) => {
  //   setSession({
  //     ...session,
  //     cart: session.cart.filter((item) => item.id !== id),
  //   });
  // };

  return (
    <div className='mt-5 flex flex-col items-center'>
      {/* <h1>rbvite</h1> */}
      <hr />
      {/* <pre className='mt-5'>{JSON.stringify(session.loginUser)}</pre> */}

      <SessionProvider>
        <div className='mb-3 w-64'>
          <input
            type='number'
            defaultValue={friend}
            onChange={(e) => setFriend(+e.currentTarget.value)}
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
