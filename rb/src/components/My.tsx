import { FaRegTrashAlt } from 'react-icons/fa';
import { Session } from '../App.tsx';
import Login from './Login.tsx';
import Profile from './Profile.tsx';
import { FormEvent, useRef } from 'react';
import Button from './atoms/Button.tsx';

type Props = {
  session: Session; // App에서 export한 type 사용
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (itemId: number) => void;
  addCartItem: (name: string, price: number) => void;
};

export default function My({
  session,
  logout,
  login,
  removeCartItem,
  addCartItem,
}: Props) {
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const removeItem = (id: number) => {
    // 삭제 확인 여부
    if (confirm('Are u sure?')) {
      removeCartItem(id);
    }
  };

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    if (!price || !name) {
      alert('Input the name & price!!');
      return;
    }
    addCartItem(name, +price);
  };
  return (
    <>
      {session.loginUser ? (
        <>
          <Profile session={session} logout={logout} ref={logoutButtonRef} />
          <Button
            onClick={() => logoutButtonRef.current?.click()}
            text='My SignOut'
          />
        </>
      ) : (
        <Login login={login} />
      )}

      {/* <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            {item.name} <small>({item.price})</small>
          </li>
        ))}
      </ul> */}
      {/* 위 코드랑 다른점 : 디스트럭처링 사용 */}
      <ul className='m-3 border p-5 font-bold'>
        {session.cart?.length ? (
          session.cart.map(({ id, name, price }) => (
            <li key={id} className='mb-1 flex justify-between'>
              <strong>{name} </strong>
              <small className='ml-2 text-gray-500'>({price}원)</small>
              <button
                className='btn btn-danger ml-10 px-1 py-0'
                onClick={() => removeItem(id)}
              >
                <FaRegTrashAlt />
              </button>
            </li>
          ))
        ) : (
          <li className='text-gray-400'>no items</li>
        )}
      </ul>
      <form onSubmit={addItem}>
        <input
          id='name'
          type='text'
          ref={nameRef}
          placeholder='name...'
          className='inp'
        />
        <input
          id='price'
          type='number'
          ref={priceRef}
          placeholder='price...'
          className='inp'
        />
        <Button text='add' />
      </form>
    </>
  );
}
