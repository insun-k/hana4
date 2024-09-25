import { FaPlus } from 'react-icons/fa';
// import { Session } from '../App.tsx';
import Login, { LoginHandler } from './Login.tsx';
import Profile from './Profile.tsx';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import Button from './atoms/Button.tsx';
import { useSession } from '../hooks/session-context.tsx';
import Item from './Item.tsx';

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
  const [isAdding, setIsAdding] = useState(false);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  // const nameRef = useRef<HTMLInputElement>(null);
  // const priceRef = useRef<HTMLInputElement>(null);

  const toggleAdding = () => setIsAdding((pre) => !pre);

  // const removeItem = (id: number) => {
  //   // 삭제 확인 여부
  //   if (confirm('Are u sure?')) {
  //     removeCartItem(id);
  //   }
  // };

  // // 수정과 추가
  // const saveItem = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const name = nameRef.current?.value;
  //   const price = priceRef.current?.value;
  //   if (!name) {
  //     alert('상품명을 입력하세요');
  //     return nameRef.current?.focus();
  //   } else if (!price) {
  //     alert('가격을 입력하세요');
  //     return priceRef.current?.focus();
  //   }
  //   addCartItem(name, +price);

  //   // save하고 input 초기화
  //   nameRef.current.value = '';
  //   priceRef.current.value = '';
  //   nameRef.current.focus();
  // };

  return (
    <>
      {session.loginUser ? (
        <div className='flex-col items-center'>
          <Profile ref={logoutButtonRef} />
          <Button onClick={() => logoutButtonRef.current?.click()}>
            My SignOut
          </Button>
        </div>
      ) : (
        <Login ref={ref} />
      )}

      <ul className='my-3 w-2/3 border p-5'>
        {session.cart?.length ? (
          session.cart.map((item) => (
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
              toggleAdding={toggleAdding}
            />
          ) : (
            <Button onClick={toggleAdding}>
              <FaPlus />
              {'Add Item'}
            </Button>
          )}
        </li>
      </ul>
    </>
  );
});
