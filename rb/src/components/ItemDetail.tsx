import { useOutletContext, useParams } from 'react-router-dom';
import { CartItem, useSession } from '../hooks/session-context';
import clsx from 'clsx';

export default function ItemDetail() {
  const {
    session: { cart },
  } = useSession();
  const { id: itemId } = useParams();

  const item = useOutletContext<CartItem>();
  // const item = cart.find(({ id }) => id === Number(itemId));
  return (
    <>
      Item Detail: {itemId} :: {item?.name}
      <ul>
        {cart.map(({ id, name }) => (
          <li key={id} className={clsx(id === Number(itemId) && 'active')}>
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}
