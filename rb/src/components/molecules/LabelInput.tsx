import { ChangeEvent, InputHTMLAttributes, RefObject, useId } from 'react';

type Props = {
  label: string;
  type?: string;
  placehoder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref: RefObject<HTMLInputElement> | null;
  classNames?: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
};

export default function LabelInput({
  label,
  inputAttrs,
  type = 'text',
  placehoder = `${label}...`,
  onChange = () => {},
  classNames = '',
}: Props) {
  const id = useId();
  // console.log('🚀  id:', id);

  return (
    <div className='my-3 flex'>
      <label htmlFor={id} className='w-32'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placehoder}
        className={`inp ${classNames}`}
        onChange={onChange}
        {...inputAttrs}
      />
    </div>
  );
}
