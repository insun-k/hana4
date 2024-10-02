import { FaPlus, FaSearch } from 'react-icons/fa';
// import { Session } from '../App.tsx';
import Login, { LoginHandler } from './Login.tsx';
import Profile from './Profile.tsx';
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import Button from './atoms/Button.tsx';
import { useSession } from '../hooks/session-context.tsx';
import Item from './Item.tsx';
import useToggle from '../hooks/toggle.ts';
import { useDebounce, useTimeout } from '../hooks/timer-hooks.ts';
import clsx from 'clsx';

// type Props = {
//   session: Session; // App에서 export한 type 사용
//   logout: () => void;
//   login: (id: number, name: string) => void;
//   removeCartItem: (itemId: number) => void;
//   addCartItem: (name: string, price: number) => void;
// };

export default forwardRef(function My(
  _: unknown,
  ref: ForwardedRef<LoginHandler>
) {
  const { session } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  // const [isAdding, toggleAdding] = useToggle(true);
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const [, toggleSearch] = useToggle();
  const [searchstr, setSearchstr] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      console.log('useDebounce.search>>', searchRef.current?.value);
      setSearchstr(searchRef.current?.value || '');
    },
    1000,
    [searchRef.current?.value]
  );

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart] // [session] 으로만 잡으면 loginUser와 연관 -> login,logout 때도 영향
  );
  const dcPrice = useMemo(
    () => totalPrice * 0.1,
    [totalPrice] // [session] 으로만 잡으면 loginUser와 연관 -> login,logout 때도 영향
  );

  useLayoutEffect(() => {
    // console.log('!!!!!!!!!!!!!', totalPrice);
  }, [totalPrice]);

  let xxx = 0;
  useTimeout(() => {
    xxx++;
  }, 1000);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const { signal } = abortController;
  //   fetch('/data/sample.json', { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('data>>', data);
  //     });
  //   return () => abortController.abort('Clean up in My!');
  // }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetch('/data/sample.json', { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log('data>>', data);
      });

    return () => abortController.abort('Clean up!');
  }, []); // 1번 실행

  return (
    <>
      <div
        className={clsx(
          !session.loginUser && 'mt-4 border-2 border-red-400 p-2'
        )}
      >
        {session.loginUser ? (
          <div className='flex-col items-center'>
            <Profile ref={logoutButtonRef} xxx={xxx} />
            <Button
              onClick={() => {
                logoutButtonRef.current?.click();
              }}
            >
              My SignOut
            </Button>
          </div>
        ) : (
          <Login ref={ref} />
        )}
      </div>
      <div className='m-4 w-2/3 border p-4'>
        <div className='flex gap-3'>
          <FaSearch />
          <input
            type='text'
            placeholder='상품명 검색...'
            // defaultValue={friend}
            // onChange={(e) => setSearchstr(e.currentTarget.value)}
            onChange={toggleSearch}
            ref={searchRef}
            className='inp'
          />
        </div>
        <ul className='mt-3 px-3'>
          {session.cart?.length ? (
            session.cart
              .filter(({ name }) => name.includes(searchstr))
              .map((item) => (
                <li key={item.id}>
                  <Item item={item} />
                </li>
              ))
          ) : (
            <li className='text-gray-400'>no items</li>
          )}

          <li className='mt-3 text-center'>
            {isAdding ? (
              <Item
                item={{ id: 0, name: '', price: 0 }}
                toggleAdding={() => toggleAdding()}
              />
            ) : (
              <Button onClick={toggleAdding}>
                <FaPlus />
                {'Add Item'}
              </Button>
            )}
          </li>
        </ul>
      </div>
      <div className='flex flex-col'>
        <span>총액 : {totalPrice.toLocaleString()}원</span>
        <span>할인 : {dcPrice.toFixed(0).toLocaleString()}원</span>
      </div>
    </>
  );
});
