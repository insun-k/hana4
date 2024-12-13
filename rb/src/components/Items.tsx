import { FaPlus, FaSearch } from 'react-icons/fa';
import Item from './Item';
import Button from './atoms/Button';
import { useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import useToggle from '../hooks/toggle';
import { useDebounce } from '../hooks/timer-hooks';
import { useSession } from '../hooks/session-context';

export default function Items() {
  const { session } = useSession();
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
  return (
    <>
      <div className='m-4 border p-4'>
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
      <div className='flex flex-col text-center'>
        <span>총액 : {totalPrice.toLocaleString()}원</span>
        <span>할인 : {dcPrice.toFixed(0).toLocaleString()}원</span>
      </div>
    </>
  );
}
