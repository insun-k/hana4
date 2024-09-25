import { FormEvent, useRef, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import Button from './atoms/Button';
import { FaRedo, FaSave } from 'react-icons/fa';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-hook';
import { CartItem } from '../hooks/session-context';

type Props = {
  item: CartItem;
  toggleAdding?: () => void;
};

export default function Item({ item, toggleAdding }: Props) {
  const { id, name, price } = item;

  const { removeCartItem, addCartItem, editCartItem } = useSession();
  const { plusCount } = useCounter();

  const [isEditing, setIsEditing] = useState(!id);
  const [hasDirty, setDirty] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const toggleEditing = () => {
    if (toggleAdding) {
      toggleAdding();
    } else {
      setIsEditing((pre) => !pre);
    }
    plusCount();
  };

  const removeItem = (id: number) => {
    // 삭제 확인 여부
    if (confirm('Are u sure?')) {
      removeCartItem(id);
    }
  };

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

    if (id === 0) addCartItem(name, +price);
    else editCartItem({ id, name, price: +price });

    // save하고 input 초기화
    nameRef.current.value = '';
    priceRef.current.value = '';
    nameRef.current.focus();

    toggleEditing();
  };

  const checkDirty = () => {
    const currName = nameRef.current?.value;
    const currPrice = Number(priceRef.current?.value);
    setDirty(name !== currName || price !== currPrice);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={saveItem}>
          <div className='mt-3 flex gap-2'>
            <input
              type='text'
              ref={nameRef}
              //onChange={(e) => setDirty(name !== e.currentTarget.value)}
              onChange={checkDirty}
              defaultValue={name}
              placeholder='name...'
              className='inp'
            />
            <input
              type='number'
              ref={priceRef}
              defaultValue={price}
              //onChange={(e) => setDirty(price !== +e.currentTarget.value)}
              onChange={checkDirty}
              placeholder='price...'
              className='inp'
            />
            <Button type='reset' onClick={toggleEditing}>
              <FaRedo />
            </Button>
            {hasDirty && (
              <Button type='submit' classNames='btn-primary'>
                <FaSave />
              </Button>
            )}
          </div>
        </form>
      ) : (
        <a
          href='#'
          onClick={toggleEditing}
          className='group flex justify-between hover:bg-gray-200'
        >
          <strong className='group-hover:text-blue-500'>
            <small className='text-gray-200'>{id}</small> {name}
            <small className='ml-2 font-light text-gray-500 group-hover:text-gray-100'>
              {price.toLocaleString()}원
            </small>
          </strong>
          <button
            onClick={() => removeItem(id)}
            className='btn btn-danger px-1 py-0'
          >
            <FaTrashCan />
          </button>
        </a>
      )}
    </>
  );
}
