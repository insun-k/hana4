import { FaRegTrashAlt } from 'react-icons/fa';
// import { Session } from '../App.tsx';
import Login, { LoginHandler } from './Login.tsx';
import Profile from './Profile.tsx';
import { FormEvent, ForwardedRef, forwardRef, useRef, useState } from 'react';
import Button from './atoms/Button.tsx';
import { useSession } from '../hooks/session-context.tsx';

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
  const { session, removeCartItem, addCartItem } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const toggleEditing = () => setIsEditing((pre) => !pre);

  const removeItem = (id: number) => {
    // 삭제 확인 여부
    if (confirm('Are u sure?')) {
      removeCartItem(id);
    }
  };

  // 수정과 추가
  const saveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    if (!name) {
      alert('상품명을 입력하세요');
      return nameRef.current?.focus();
    } else if (!price) {
      alert('가격을 입력하세요');
      return priceRef.current?.focus();
    }
    addCartItem(name, +price);

    // save하고 input 초기화
    nameRef.current.value = '';
    priceRef.current.value = '';
    nameRef.current.focus();
  };

  return (
    <>
      {session.loginUser ? (
        <>
          <Profile ref={logoutButtonRef} />
          <Button
            onClick={() => logoutButtonRef.current?.click()}
            text='My SignOut'
          />
        </>
      ) : (
        <Login ref={ref} />
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

        <li className='mt-3 text-center'>
          {isEditing ? (
            <form onSubmit={saveItem}>
              <div className='mt-3 flex gap-2'>
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
                <Button type='reset' text='Cancel' onClick={toggleEditing} />
                <Button type='submit' text='Save' classNames='btn-primary' />
              </div>
            </form>
          ) : (
            <Button
              onClick={toggleEditing}
              text='
              +Add Item'
            />
          )}
        </li>
      </ul>

      {/* <form onSubmit={addItem}>
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
      </form> */}
    </>
  );
});
