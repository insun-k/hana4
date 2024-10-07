import { Outlet, useNavigate } from 'react-router-dom';
import { CartItem, useSession } from '../hooks/session-context';
import { useState } from 'react';
import Button from './atoms/Button';

export default function ItemLayout() {
  const {
    session: { cart },
  } = useSession();

  const navigate = useNavigate();

  const [currItem, setCurrItem] = useState<CartItem>(cart[0]);
  const goItem = (id: number) => {
    setCurrItem(cart.find(({ id: itemId }) => id === itemId)!);
    navigate(`/items/${id}`);
  };

  return (
    <div className='flex justify-between'>
      <div className='w-full border text-center'>
        <h1 className='text-3xl'>장바구니</h1>
        <ul>
          {cart.map(({ id, name }) => (
            <li key={id}>
              {/* <Link to={`/items/${id}`}>{name}</Link> */}
              <Button onClick={() => goItem(id)}>{name}</Button>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full border'>
        <Outlet context={currItem} />
      </div>
    </div>
  );
}
